import { SearchIcon } from "@chakra-ui/icons";
import {
  Center,
  CircularProgress,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import React, { useState } from "react";
import Ebook from "./ebook";

function Ebooks() {
  const toast = useToast();
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState("");
  const [notfound, setnotfound] = useState(false);
  const [items, setitems] = useState([]);
  function handlekeypress(e) {
    if (e.key === "Enter") {
      handleclick();
    } else {
    }
  }
  function handlechange(e) {
    setsearch(e.target.value);
  }
  function handleclick() {
    if (search === "") {
      toast({
        title: `Please enter something!`,
        status: "error",
        isClosable: true,
        position: "top",
      });
    } else {
      setloading(true);
      fetch(`https://www.dbooks.org/api/search/${search}`)
        .then((res) => res.json())
        .then((json) => {
          // console.log(json.books)
          if (json.status === "not found") {
            setnotfound(true);
            setloading(false);
          } else {
            setnotfound(false);
            setitems(json.books);
          }
          setloading(false);
          setsearch("");
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
            value={search}
            variant="outline"
            placeholder="Search for book you want to read..."
          />
          <InputRightElement onClick={handleclick} children={<SearchIcon />} />
        </InputGroup>
      </Container>

      {loading ? (
        <Center>
          {" "}
          <CircularProgress mt="100px" isIndeterminate color="green.300" />{" "}
        </Center>
      ) : (
        <>
          {notfound && (
            <Center mt="80px">
              <Heading>Book Not Found!</Heading>
            </Center>
          )}

          {!notfound && (
            <Flex
              mt="20px"
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
            >
              {items.map((item) => (
                <Center key={item.id} w="400px">
                  <Ebook
                    id={item.id}
                    title={item.title}
                    author={item.authors}
                    subtitle={item.subtitle}
                    image={item.image}
                  />
                </Center>
              ))}
            </Flex>
          )}
        </>
      )}
    </div>
  );
}

export default Ebooks;
