import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest } from "./types/create-question-request";
import type { CreateQuestionResponse } from "./types/create-question-response";
import type { GetRoomsQuestionResponse } from "./types/get-rooms-questions";

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/room/${roomId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result =
        (await response.json()) as CreateQuestionResponse satisfies CreateQuestionResponse;
      return result;
    },
    // triggers when the API is called
    onMutate: ({ question }) => {
      const questions = queryClient.getQueryData<GetRoomsQuestionResponse>([
        "get-questions",
        roomId,
      ]);

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      };
      // allow update another query with a new value
      queryClient.setQueryData<GetRoomsQuestionResponse>(
        ["get-questions", roomId],
        [newQuestion, ...(questions ?? [])]
      );

      return {
        newQuestion,
        questions,
      };
    },
    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData<GetRoomsQuestionResponse>(
        ["get-questions", roomId],
        (questions) => {
          if (!questions || !context.newQuestion) return questions;
          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.questionId,
                answer: data.answer,
                isGeneratingAnswer: false,
              };
            }
            return question;
          });
        }
      );
    },

    onError: (_error, _variables, context) => {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomsQuestionResponse>(
          ["get-questions", roomId],
          context.questions
        );
      }
    },
  });
}
