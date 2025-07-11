import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetRoomsApiResponse = Array<{
  id: string;
  name: string;
}>;

const CreateRoom = () => {
  const { data: rooms, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      const result =
        (await response.json()) as GetRoomsApiResponse satisfies GetRoomsApiResponse;
      return result;
    },
  });

  return (
    <>
      {isLoading && <div>Is loading...</div>}
      <div>rooms available:</div>
      <div>
        {rooms?.map(({ id, name }) => {
          return (
            <Link key={id} to={`/room/${id}`}>
              {name}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default CreateRoom;
