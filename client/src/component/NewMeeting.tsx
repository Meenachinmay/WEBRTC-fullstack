import React, { useContext, useEffect } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { MeetingRoomContext } from "../context/MeetingRoomContext";

const NewMeeting: React.FC = () => {
  const context = useContext(MeetingRoomContext);

  if (!context) {
    throw new Error("Component must be used within a context provider");
  }

  const { ws, initializeSocket, closeSocket } = context;

  useEffect(() => {
    initializeSocket();


    return () => {
        closeSocket();
    }
  }, [initializeSocket, closeSocket])

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
        >
          Join a new meeting
        </Button>
      </Flex>
    </>
  );
};

export default NewMeeting;
