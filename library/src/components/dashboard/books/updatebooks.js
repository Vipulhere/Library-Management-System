import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
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
import React, { useEffect, useState } from "react";
export function UpdateBook(props) {
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
    fetch(`${process.env.REACT_APP_UpdateBook}${props.uniqueid}`, {
      method: "PATCH",
      body: JSON.stringify(books),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "success") {
          toast({
            title: `Book Updated Successfully.`,
            status: "success",
            position: "top",
            isClosable: true,
          });
        } else {
          toast({
            title: `Book Update Failed. Please try again after sometime.`,
            status: "success",
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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_UpdateBookbyid}${props.bookid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setbooks(json);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Tooltip bg="gray.300" color="black" label="Update">
        <IconButton
          onClick={onOpen}
          mr="10px"
          aria-label="Update"
          icon={<EditIcon />}
        />
      </Tooltip>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Update a Book</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel>Book ID</FormLabel>
                <Input
                  value={books.bookid}
                  onChange={handlechange}
                  name="bookid"
                  placeholder="Please Enter book ID."
                />
              </Box>
              <Box>
                <FormLabel>Book Title</FormLabel>
                <Input
                  value={books.booktitle}
                  onChange={handlechange}
                  name="booktitle"
                  placeholder="Please Enter Book Title"
                />
              </Box>
              <Box>
                <FormLabel>Book Description</FormLabel>
                <Input
                  value={books.bookdesc}
                  onChange={handlechange}
                  name="bookdesc"
                  placeholder="Please Enter Book Description"
                />
              </Box>
              <Box>
                <FormLabel>Book Author</FormLabel>
                <Input
                  value={books.bookauthor}
                  onChange={handlechange}
                  name="bookauthor"
                  placeholder="Please Enter Book Author"
                />
              </Box>
              <Box>
                <FormLabel>Book Price</FormLabel>
                <Input
                  value={books.bookprice}
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
                    value={books.bookimgurl}
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
              Update
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
