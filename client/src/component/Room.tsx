import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MeetingRoomContext } from "../context/MeetingRoomContext";

interface IRoomProps {}

const Room: React.FC<IRoomProps> = () => {
  const { roomId } = useParams();

  // First, get the context value
  const context = useContext(MeetingRoomContext);

  // Check if the context is present
  if (!context) {
    throw new Error("Room component must be used within a MeetingRoomProvider");
  }

  // Destructure the ws from the context now that we know it's present
  const { ws, me, isPeerReady, isWsReady } = context;

  useEffect(() => {
    if (!ws || !isWsReady) {
      return; // Exit early if the socket isn't ready
    }

    if (!me) {
      throw Error("Peer initialization Error.");
    }

    ws.emit("joined-room", { roomID: roomId, peerID: me._id });

    const handleJoinedRoomFromServer = (payload: { roomId: string }) => {
      console.log(`User joined the room with roomId ${payload.roomId}`);
    };

    ws.on("joined-room", handleJoinedRoomFromServer);

    return () => {
      console.log('cleanup ran');
      ws.off("joined-room", handleJoinedRoomFromServer);
    };
  }, [roomId, ws, me, isWsReady]);


  if (!isWsReady) {
    return <div>loading...</div>;
  }

  return <div>RoomID: {roomId}</div>;
};

export default Room;
