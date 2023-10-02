import { Flex } from "@chakra-ui/react";
import '../App.css';

export const Loader = () => {
  return (
    <>
      <Flex
        width={"full"}
        height={"full"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <div className="loader"></div>
      </Flex>
    </>
  );
};
