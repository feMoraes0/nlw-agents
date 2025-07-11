import { Navigate, useParams } from "react-router-dom";

const Room = () => {
  const { roomId } = useParams();

  if (!roomId) {
    return <Navigate replace to="/" />;
  }

  return <div> Id: {roomId}</div>;
};

export default Room;
