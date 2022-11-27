import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Center, Heading, Container, InputGroup, Input, InputRightElement, CircularProgress, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import Bookcard from "./bookcard";

function Books() {
  const [books, setbooks] = useState([]);
  const [loading, setloading] = useState(true);
const toast = useToast();
  useEffect(() => {
    fetch(process.env.REACT_APP_BooksCard, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setbooks(json);
        setloading(false);
      });
  }, []);

  const [bookid, setbookid] = useState("")
const [searchloading, setsearchloading] = useState(false)
  function handlechange(e){
    setbookid(e.target.value)
  }

  function search(){
   
    if(bookid===""){
      toast({
        title: `Please Enter Book ID!`,
        status: "error",
        position: "top",
        isClosable: true,
      });
    }else{
      setsearchloading(true)
      const searchbyid = {bookid:bookid}
      fetch("https://api-server-lms.herokuapp.com/api/v1/searchbook", {
        method: "POST",
        body: JSON.stringify(searchbyid),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status === "fail") {
            toast({
              title: `Book Not Found!`,
              status: "error",
              position: "top",
              isClosable: true,
            });
            setsearchloading(false)
          } else {
            const result = [json]
            setbooks(result)
            setsearchloading(false)
          }
        });
    }
  }
  function handlekeypress(e) {
    if (e.key === "Enter") {
      search();
    } else {
    }
  }

  return (
    <div>
      <Center>
        <Heading m="5px">All Books</Heading>  
      </Center>
      <Container mt="20px">
        <InputGroup>
          <Input
            textAlign="center"
            onKeyPress={handlekeypress}
            w="100vw"
            onChange={handlechange}
            value={bookid}
            variant="outline"
            placeholder="Enter BookID of book you want to borrow..."
          />
          <InputRightElement onClick={search} children={<SearchIcon />} />
        </InputGroup>
      </Container>

      {searchloading ? (
        <Center>
          {" "}
          <CircularProgress mt="100px" isIndeterminate color="green.300" />{" "}
        </Center>
      ) : 


      loading ? (
        <Loading />
      ) : (
        <Flex
          mt="20px"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          {books.map((book) => (
            <Center key={book._id} w="400px">
              <Bookcard
                key={book._id}
                id={book._id}
                bookid={book.bookid}
                author={book.bookauthor}
                available={book.bookavailable}
                bookimg={book.bookimgurl}
                price={book.bookprice}
                title={book.booktitle}
                desc={book.bookdesc}
              />
            </Center>
          ))}
        </Flex>
      )}
    </div>
        
  );  
}

export default Books;
