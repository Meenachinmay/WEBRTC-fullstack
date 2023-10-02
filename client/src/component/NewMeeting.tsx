import React, { useContext, useEffect, useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { MeetingRoomContext } from "../context/MeetingRoomContext";
import { Loader } from "./Loader";

const NewMeeting: React.FC = () => {
  const context = useContext(MeetingRoomContext);
  const [loading, setLoading] = useState(false);
  const [loaderForCreation, setLoaderForCreation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!context) {
    throw new Error("Component must be used within a context provider");
  }

  const { ws, initializeSocket, closeSocket } = context;

  const createRoom = () => {
    if (ws) {
      setLoaderForCreation(true);
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

        // above socket initialization is done so handle socket events here
        socket.on("room-created", (payload) => {
          console.log(
            `data from server after creating a room, payload`,
            payload
          );
          setLoaderForCreation(false);
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

  if (loading) {
    return (
      <>
        <Flex
          width={"full"}
          height={"100vh"}
          margin={"auto"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Loader />
        </Flex>
      </>
    );
  }

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
          { loaderForCreation ? <Loader /> : ''}
        </Button>
      </Flex>
    </>
  );
};

export default NewMeeting;
