import { Button, Flex } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { MeetingRoomContext } from "../context/MeetingRoomContext";
import { Loader } from "./Loader";

import { useNavigate } from "react-router-dom";

const NewMeeting: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(MeetingRoomContext);
  const [loaderForCreation, setLoaderForCreation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!context) {
    throw new Error("Component must be used within a context provider");
  }

  const { ws } = context;

  const createRoom = () => {
    if (ws) {
      setLoaderForCreation(true);
      ws.emit("create-room");

      // receive the event
      ws.on("room-created", (payload) => {
        console.log(
          `room created at the server and received the roomID: ${payload.roomID}`
        );
        navigate(`/room/${payload.roomID}`);
      });
    } else {
      throw new Error(
        "Socket connection must be initialized before trying to connect."
      );
    }
  };

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
          {loaderForCreation ? <Loader /> : ""}
        </Button>
      </Flex>
    </>
  );
};

export default NewMeeting;
