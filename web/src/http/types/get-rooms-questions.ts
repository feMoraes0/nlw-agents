export type GetRoomsQuestionResponse = Array<{
  id: string;
  question: string;
  answer: string | null;
  createdAt: string;
}>;
