import { useQuery } from "@tanstack/react-query";
import type { GetRoomsQuestionResponse } from "./types/get-rooms-questions";

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ["get-questions", roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/room/${roomId}/questions`
      );
      const result =
        (await response.json()) as GetRoomsQuestionResponse satisfies GetRoomsQuestionResponse;
      return result;
    },
  });
}
