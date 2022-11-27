import React from "react";
import { Box, Flex, Image, chakra } from "@chakra-ui/react";

export default function Ebook(props) {
  function handleclick(id) {
    fetch(`https://www.dbooks.org/api/book/${props.id}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.download);
        window.location.href = `${json.download}`;
      });
  }
  return (
    <Box
      margin="20px"
      minWidth="300px"
      // minHeight="300px"
      maxW="xs"
      // mx="auto"
      bg="white"
      _dark={{ bg: "gray.800" }}
      shadow="lg"
      rounded="lg"
    >
      <Box px={4} py={2}>
        <chakra.h1
          color="gray.800"
          _dark={{ color: "white" }}
          fontWeight="bold"
          fontSize="xl"
          textTransform="uppercase"
        >
          {props.title}
        </chakra.h1>
        <chakra.p
          mt={1}
          fontSize="sm"
          color="gray.600"
          _dark={{ color: "gray.400" }}
        >
          {props.subtitle}
        </chakra.p>
      </Box>

      <Image
        h={48}
        w="full"
        fit="cover"
        mt={2}
        src={props.image}
        alt="NIKE AIR"
      />

      <Flex
        alignItems="center"
        justifyContent="space-between"
        px={4}
        py={2}
        bg="gray.900"
        roundedBottom="lg"
      >
        <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
          Free
        </chakra.h1>
        <chakra.button
          onClick={handleclick}
          px={2}
          py={1}
          bg="white"
          fontSize="xs"
          color="gray.900"
          fontWeight="bold"
          rounded="lg"
          textTransform="uppercase"
          _hover={{
            bg: "gray.200",
          }}
          _focus={{
            bg: "gray.400",
          }}
        >
          Download
        </chakra.button>
      </Flex>
    </Box>
  );
}
