import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
function ReturnBook() {
  const [search, setsearch] = useState({ bookid: "" });
  const [result, setresult] = useState({});
  const [showresult, setshowresult] = useState(false);
  const toast = useToast();
  const [notfound, setnotfound] = useState(false);
  function handlekeypress(e) {
    if (e.key === "Enter") {
      handleclick();
    } else {
    }
  }
  function handlechange(e) {
    setsearch({ [e.target.name]: e.target.value });
  }

  function handleclick() {
    if (search.bookid === "") {
      toast({
        title: `Please Enter Something!`,
        status: "error",
        position: "top",
        isClosable: true,
      });
    } else {
      fetch(process.env.REACT_APP_ReturnBook, {
        method: "POST",
        body: JSON.stringify(search),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status === "fail") {
            setnotfound(true);
            setshowresult(false);
          } else {
            setshowresult(true);
            setnotfound(false);
            setresult(json);
          }
        });
    }
  }

  function returnbook() {
    if (result.borrowbyborrowdate === "" || result.borrowbyborrowdate === "-") {
      toast({
        title: `This book is not issued...`,
        status: "info",
        position: "top",
        isClosable: true,
      });
    } else {
      fetch(process.env.REACT_APP_ReturnBookbyid, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          id: result.borrowbyid,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then((response) => {
          if (response.status === "success") {
            toast({
              title: `Returned successfully.`,
              status: "success",
              position: "top",
              isClosable: true,
            });
          } else if (response.status === "fail") {
            toast({
              title: `Return Failed. Please try again after sometime.`,
              status: "error",
              position: "top",
              isClosable: true,
            });
          }
        });
    }
  }

  return (
    <div>
      <Container mt="20px">
        <InputGroup>
          <Input
            textAlign="center"
            onKeyPress={handlekeypress}
            w="100vw"
            onChange={handlechange}
            variant="outline"
            placeholder="Enter Book ID To Return..."
            name="bookid"
          />
          <InputRightElement onClick={handleclick} children={<SearchIcon />} />
        </InputGroup>
      </Container>
      {notfound && (
        <Center>
          <Heading mt="100px">Book Not Found!</Heading>
        </Center>
      )}

      {showresult && (
        <TableContainer mt="50px">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Book ID</Th>
                <Th>Book Title</Th>
                <Th>Member id</Th>
                <Th>DAYS</Th>
                <Th>Issue date</Th>
                <Th>Return date</Th>
                <Th>Fine</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{result.borrowbyid}</Td>
                <Td>{result.borrowbybooktitle}</Td>
                <Td>{result.borrowbymemberid}</Td>
                <Td>{result.borrowbydays}</Td>
                <Td>
                  {result.borrowbyborrowdate === ""
                    ? "-"
                    : result.borrowbyborrowdate}
                </Td>
                <Td>
                  {result.borrowbyreturndate === ""
                    ? "-"
                    : result.borrowbyreturndate}
                </Td>
                <Td>{result.fine === "" ? "-" : result.fine}</Td>
                <Td>
                  {" "}
                  <Button onClick={returnbook} colorScheme="blue">
                    Return
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default ReturnBook;
