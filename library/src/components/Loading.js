import { Center, Spinner } from "@chakra-ui/react";
import React from "react";
function Loading() {
  return (
    <div>
      <Center mt="100px">
        {" "}
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    </div>
  );
}

export default Loading;
