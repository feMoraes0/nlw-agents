import RoomList from "@/components/room-list";

const CreateRoom = () => {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 grid-cols-2 items-start">
          <div>form</div>
          <RoomList />
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
