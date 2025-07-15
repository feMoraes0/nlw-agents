import { useMutation } from "@tanstack/react-query";
import type { CreateRoomRquest } from "./types/create-room-request";
import type { CreateRoomResponse } from "./types/create-room-response";

export function useCreateRoom() {
  return useMutation({
    mutationFn: async (data: CreateRoomRquest) => {
      const response = await fetch("http://localhost:3333/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result =
        (await response.json()) as CreateRoomResponse satisfies CreateRoomResponse;
      return result;
    },
  });
}
