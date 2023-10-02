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
  const { ws } = context;

  useEffect(() => {
    if (!ws) {
      throw Error("Socket connection is not initialized.");
    }

    ws.emit("joined-room", { roomId: roomId });

    ws.on("joined-room", (payload: { roomId: any }) => {
      console.log(`User joined the room with roomId ${payload.roomId}`);
    });

    // Clean up listener to prevent memory leaks and multiple listeners on re-renders
    return () => {
      ws.off("joined-room");
    };
  }, [roomId, ws]);

  return <div>RoomID: {roomId}</div>;
};

export default Room;
