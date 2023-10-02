import React, { useContext, useEffect, useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { MeetingRoomContext } from "../context/MeetingRoomContext";

const NewMeeting: React.FC = () => {
  const context = useContext(MeetingRoomContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!context) {
    throw new Error("Component must be used within a context provider");
  }

  const { ws, initializeSocket, closeSocket } = context;

  const createRoom = () => {
    if (ws) {
      ws.emit("create-room");
    } else {
      throw new Error(
        "Socket connection must be initialized before trying to connect."
      );
      return;
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const socket = await initializeSocket();

        socket.on("room-created", (payload) => {
          console.log(
            `data from server after creating a room, payload`,
            payload
          );
        });
      } catch (error) {
        console.error("Error initializing socket:", error);
        setError("Failed to connect. Please try agian.");
      } finally {
        setLoading(false);
      }
    };

    init();

    // get events here
    ws?.on("room-created", (payload) => {
      console.log("data from server after creating a room", payload);
    });

    // emit events here
    return () => {
      closeSocket();
    };
  }, []);

  return (
    <>
      <Flex
        width={"full"}
        height={"100vh"}
        margin={"auto"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Button
          color={"white"}
          outline={"none"}
          _focus={{ outline: "none" }}
          _hover={{ outline: "none", bg: "green.600", border: "0px" }}
          size={"md"}
          variant={"outline"}
          bg={"green.500"}
          onClick={() => createRoom()}
        >
          Join a new meeting
        </Button>
      </Flex>
    </>
  );
};

export default NewMeeting;
