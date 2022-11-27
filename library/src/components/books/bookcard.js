import {
  Box,
  Flex,
  Image,
  chakra,
  Button,
  Badge,
  useToast,
  Tooltip,
  Text,
  useDisclosure,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

// import {

//   Heading,
// Center,
//   Link,
//   Stack,

//   useColorModeValue,
// } from '@chakra-ui/react';

export default function Bookcard(props) {
  const [sliderValue, setSliderValue] = useState(7);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  // eslint-disable-next-line

  const [showTooltip, setShowTooltip] = useState(false);
  const toast = useToast();

  async function handleclick() {

    if (props.available === "true")  {
      const found = await fetch(
        process.env.REACT_APP_BorrowBooks,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((json) =>
          json.filter((book) => {
            return book.borrowbymemberid === localStorage.getItem("memberid");
          })
        );

      if(found.filter((book)=>{return book.borrowbyid===props.bookid}).length===0) {
        const data = {
          borrowbyid: props.bookid,
          borrowbybooktitle: props.title,
          borrowbymemberid: localStorage.getItem("memberid"),
          borrowbydays: sliderValue,
          borrowbyissue: "pending",
          borrowbyrequestdate: new Date().toDateString(),
          borrowbyborrowdate: "",
          borrowbyreturndate: "",
          fine: "",
        };
        fetch(process.env.REACT_APP_Borrow, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.status === "success") {
              toast({
                title: `Requested successfully.`,
                status: "success",
                position: "top",
                isClosable: true,
              });
              onClose();
            } else if (response.status === "fail") {
              toast({
                title: `Request Failed. Please try again after sometime.`,
                status: "error",
                position: "top",
                isClosable: true,
              });
            }
          });
      } else {
        toast({
          title: `You have already requested this book.`,
          status: "error",
          isClosable: true,
          position: "top",
        });
      }
    } else {
      
      toast({
        title: `Book Not Available!`,
        status: "error",
        isClosable: true,
        position: "top",
      });
      onClose();
    }
  }
  return (
    <>
    <Flex
      //   bg="#edf3f8"
      // _dark={{ bg: "gray.400" }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="md"
        mx="auto"
        py={4}
        px={8}
        bg="white"
        _dark={{ bg: "gray.800" }}
        shadow="lg"
        rounded="lg"
      >
        <Flex justifyContent={"center"}>
          <Image
          id="bookimage"
          boxSize="100%"
            w={100}
            h={100}
            borderRadius="12px"
            objectFit="cover"
            borderStyle="solid"
            borderWidth={2}
            color="brand.500"
            _dark={{ color: "brand.400" }}
            alt="Book Image"
            src={props.bookimg}
          />

        </Flex>
        <chakra.h2
          color="gray.800"
          _dark={{ color: "white" }}
          fontSize={{ base: "md", md: "md" }}
          mt={{ base: 2, md: 0 }}
          fontWeight="bold"
        >
          {props.title.charAt(0).toUpperCase() + props.title.slice(1)} <br />{" "}
          {props.available === "true" ? (
            <Badge colorScheme="green">Available</Badge>
          ) : (
            <Badge colorScheme="red">Not Available</Badge>
          )}
        </chakra.h2>
        <chakra.p
          mb="10px"
          mt={2}
          color="gray.600"
          _dark={{ color: "gray.200" }}
        >
          {/* {props.desc} */}
          <Box
            _dark={{ color: "white" }}
            color="black"
            fontSize="17px"
            mt="10px"
            mb="5px"
          >
            <Text as="b">Price: </Text> {props.price}
            <Box as="span" color="gray.600" fontSize="sm">
              $
            </Box>
          </Box>
        </chakra.p>
        <Text color="teal" as="em">
          {" "}
          For how many days would you like to borrow?
        </Text>
        <Slider
          mt="10px"
          step={7}
          mb="25px"
          pl="5px"
          id="slider"
          defaultValue={7}
          min={7}
          max={28}
          colorScheme="teal"
          onChange={(v) => setSliderValue(v)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderMark value={7} mt="1" ml="-2.5" fontSize="sm">
            7
          </SliderMark>
          <SliderMark value={14} mt="1" ml="-2.5" fontSize="sm">
            14
          </SliderMark>
          <SliderMark value={21} mt="1" ml="-2.5" fontSize="sm">
            21
          </SliderMark>
          <SliderMark value={28} mt="1" ml="-2.5" fontSize="sm">
            28
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="teal.500"
            color="white"
            placement="top"
            isOpen={showTooltip}
            label={`${sliderValue} Days`}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
        <Button
          onClick={onOpen}
          rightIcon={<ArrowForwardIcon />}
          colorScheme="teal"
          variant="outline"
        >
          Request Now
        </Button>
        <Flex justifyContent="end" mt={4}>
          <div fontSize="2xl" color="brand.500" _dark={{ color: "brand.300" }}>
            <Text as="b">Author: </Text>{" "}
            {props.author.charAt(0).toUpperCase() + props.author.slice(1)}
          </div>
        </Flex>
      </Box>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Request Book</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Would you like to request this book for {sliderValue} days?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button onClick={handleclick} colorScheme="blue" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>

{/* <Flex
      //   bg="#edf3f8"
      // _dark={{ bg: "gray.400" }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
<Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: '100%', md: '540px' }}
        height={{ sm: '476px', md: '20rem' }}
        direction={{ base: 'column', md: 'row' }}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        padding={4}>
        <Flex flex={1} bg="blue.200" borderRadius="12px">
          <Image
           borderRadius="12px"
            objectFit="cover"
            boxSize="100%"
            src={
              props.bookimg }
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}>
         <Flex justifyContent={{ base: "center"}} >
        </Flex>
        <chakra.h2
          color="gray.800"
          _dark={{ color: "white" }}
          fontSize={{ base: "md", md: "md" }}
          mt={{ base: 2, md: 0 }}
          fontWeight="bold"
        >
          {props.title.charAt(0).toUpperCase() + props.title.slice(1)} <br />{" "}
          {props.available === "true" ? (
            <Badge colorScheme="green">Available</Badge>
          ) : (
            <Badge colorScheme="red">Not Available</Badge>
          )}
        </chakra.h2>
        <chakra.p
          mb="10px"
          mt={2}
          color="gray.600"
          _dark={{ color: "gray.200" }}
        >
          {props.desc}
          <Box
            _dark={{ color: "white" }}
            color="black"
            fontSize="17px"
            mt="10px"
            mb="5px"
          >
            <Text as="b">Price: </Text> {props.price}
            <Box as="span" color="gray.600" fontSize="sm">
              $
            </Box>
          </Box>
        </chakra.p>
        {props.desc}
        <Text mt="10px" color="teal" as="em">
          {" "}
          For how many days would you like to borrow?
        </Text>
        <Slider
          mt="30px"
          step={7}
          mb="55px"
          pl="5px"
          id="slider"
          defaultValue={7}
          min={7}
          max={28}
          colorScheme="teal"
          onChange={(v) => setSliderValue(v)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderMark value={7} mt="1" ml="-2.5" fontSize="sm">
            7
          </SliderMark>
          <SliderMark value={14} mt="1" ml="-2.5" fontSize="sm">
            14
          </SliderMark>
          <SliderMark value={21} mt="1" ml="-2.5" fontSize="sm">
            21
          </SliderMark>
          <SliderMark value={28} mt="1" ml="-2.5" fontSize="sm">
            28
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg="teal.500"
            color="white"
            placement="top"
            isOpen={showTooltip}
            label={`${sliderValue} Days`}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
        <Button
       id="requestnow"
          onClick={onOpen}
          rightIcon={<ArrowForwardIcon />}
          colorScheme="teal"
          variant="outline"
        >
          Request Now
        </Button>
        <Flex justifyContent="end" mt={4}>
          <div fontSize="2xl" color="brand.500" _dark={{ color: "brand.300" }}>
            <Text as="b">Author: </Text>{" "}
            {props.author.charAt(0).toUpperCase() + props.author.slice(1)}
          </div>
        </Flex>
        <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Request Book</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Would you like to request this book for {sliderValue} days?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button onClick={handleclick} colorScheme="blue" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </Stack>
      </Stack>
    </Center>
    </Flex> */}
    </>
  );
}
