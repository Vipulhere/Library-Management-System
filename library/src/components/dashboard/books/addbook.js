import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  Radio,
  RadioGroup,
  Stack,
  Th,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
export function AddBook(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [books, setbooks] = useState({
    bookid: "",
    booktitle: "",
    bookdesc: "",
    bookauthor: "",
    bookprice: "",
    bookavailable: "true",
    bookimgurl: "",
    bookaddedtime: new Date().toLocaleString(),
  });
  function handleclick() {
    fetch(process.env.REACT_APP_AddBook, {
      method: "POST",
      body: JSON.stringify(books),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          toast({
            title: `Book Added successfully.`,
            status: "success",
            position: "top",
            isClosable: true,
          });
          props.onAdd();
        } else if (response.status === "fail") {
          toast({
            title: `Book Not Added. Please try again after sometime.`,
            status: "error",
            position: "top",
            isClosable: true,
          });
        }
      });
  }
  function handlechange(e) {
    setbooks({
      ...books,
      [e.target.name]: e.target.value,
      bookaddedtime: new Date().toLocaleString(),
    });
  }

  return (
    <>
      <Th>
        {" "}
        <Center>
          {" "}
          <IconButton onClick={onOpen} icon={<AddIcon />} />
        </Center>
      </Th>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add a Book</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel>Book ID</FormLabel>
                <Input
                  onChange={handlechange}
                  name="bookid"
                  placeholder="Please Enter book ID."
                />
              </Box>
              <Box>
                <FormLabel>Book Title</FormLabel>
                <Input
                  onChange={handlechange}
                  name="booktitle"
                  placeholder="Please Enter Book Title"
                />
              </Box>
              <Box>
                <FormLabel>Book Description</FormLabel>
                <Input
                  onChange={handlechange}
                  name="bookdesc"
                  placeholder="Please Enter Book Description"
                />
              </Box>
              <Box>
                <FormLabel>Book Author</FormLabel>
                <Input
                  onChange={handlechange}
                  name="bookauthor"
                  placeholder="Please Enter Book Author"
                />
              </Box>
              <Box>
                <FormLabel>Book Price</FormLabel>
                <Input
                  onChange={handlechange}
                  name="bookprice"
                  placeholder="Please Enter Book Price"
                />
              </Box>
              <Box>
                <FormLabel>Book Available</FormLabel>
                <RadioGroup name="bookavailable" defaultValue="true">
                  <Stack spacing={5} direction="row">
                    <Radio
                      onChange={handlechange}
                      colorScheme="green"
                      value="true"
                    >
                      True
                    </Radio>
                    <Radio
                      isDisabled
                      onChange={handlechange}
                      colorScheme="red"
                      value="false"
                    >
                      False
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>

              <Box>
                <FormLabel>Book Image Url</FormLabel>
                <InputGroup>
                  <Input
                    onChange={handlechange}
                    type="url"
                    name="bookimgurl"
                    placeholder="Please Enter Book Image URL"
                  />
                </InputGroup>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleclick} colorScheme="blue">
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
