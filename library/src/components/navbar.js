import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  useColorMode,
  Image,
  Text,
  Show,
  MenuItem,
  MenuDivider,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import { Memberlogin } from "./memberlogin";
import { useContext } from "react";
import signinContext from "./context/signincontext";
import { Librarianlogin } from "./librarianlogin";

export default function Nav(props: ButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [librarian, setlibrarian] = useState([
    { librarianid: "", librarianname: "", librarianaddress: "" },
  ]);
  const a = useContext(signinContext);
  const toast = useToast();
  const [user, setuser] = useState([
    {
      memberid: "",
      membername: "",
      memberaddress: "",
      memberprofession: "",
      memberjoindate: "",
      memberexpiredate: "",
    },
  ]);
  function handlelogin() {
    fetch(process.env.REACT_APP_Members, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setuser(
          json.filter((user) => {
            return user.memberid === localStorage.getItem("memberid");
          })
        );
      });
  }

  useEffect(() => {
    if(a.user.length!==0){
setuser(a.user)
    }
    if (localStorage.getItem("ismemberlogin") === "true") {
      fetch(process.env.REACT_APP_Members, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setuser(
            json.filter((user) => {
              return user.memberid === localStorage.getItem("memberid");
            })
          );
          a.updatememberlogin();
        });
    } else if (localStorage.getItem("islibrarianlogin") === "true") {
      fetch(process.env.REACT_APP_Librarians, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setlibrarian(
            json.filter((librarian) => {
              return (
                librarian.librarianid === localStorage.getItem("librarianid")
              );
            })
          );
          a.updatelibrarianlogin();
        });
    } else {
    }
    // eslint-disable-next-line
  }, []);

  function handlelibrarianlogin(librarian) {
    fetch(process.env.REACT_APP_Librarians, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setlibrarian(json);
        librarian.filter((librarian) => {
          return librarian.librarianid === localStorage.getItem("librarianid");
        });
        setlibrarian(librarian);
      });
  }
  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {colorMode === "light" ? (
            <Image h="30px" src={require("../assets/book.ico")} alt="Logo" />
          ) : (
            <Image
              h="30px"
              src={require("../assets/book-dark.ico")}
              alt="Logo"
            />
          )}

          <Show breakpoint="(min-width: 600px)">
            <Text as="b" fontSize="md">
             {a.islibrarianlogin?"Library Management System":"Library"}
            </Text>
          </Show>
          <Show breakpoint="(max-width: 600px)">
            <Text as="b" fontSize="sm">
            {a.islibrarianlogin?"Library Management System":"Library"}
            </Text>
          </Show>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button
                aria-label="Toggle Color Mode"
                onClick={toggleColorMode}
                _focus={{ boxShadow: "none" }}
                w="fit-content"
                {...props}
              >
                {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} src={""} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  {!a.ismemberlogin && a.islibrarianlogin ? (
                    <>
                      <br />
                      <Center>
                        <Avatar size={"2xl"} src={""} />
                      </Center>
                      <br />
                      <Center>
                        <p> @{librarian[0].librarianid}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <Center>
                        <Text as="b"> Name: </Text> &nbsp;{" "}
                        {librarian[0].librarianname}
                      </Center>
                      <Center>
                        <Text as="b"> Address: </Text> &nbsp;{" "}
                        {librarian[0].librarianaddress}
                      </Center>
                      <MenuDivider />
                      <MenuItem
                        onClick={() => {
                          localStorage.setItem("islibrarianlogin", "false");
                          a.librarianlogout();
                          toast({
                            title: `Logout successfully.`,
                            status: "success",
                            position: "top",
                            isClosable: true,
                          });
                        }}
                      >
                        Logout
                      </MenuItem>
                    </>
                  ) : (
                    !a.ismemberlogin && (
                      <Librarianlogin onlibrarianlogin={handlelibrarianlogin} />
                    )
                  )}

                  {!a.islibrarianlogin && a.ismemberlogin ? (
                    <>
                      <br />
                      <Center>
                        <Avatar size={"2xl"} src={""} />
                      </Center>
                      <br />
                      <Center>
                        <p> @{user[0].memberid}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <Center>
                        <Text as="b"> Name: </Text> &nbsp; {user[0].membername}
                      </Center>
                      <Center>
                        <Text as="b"> Profession: </Text> &nbsp;{" "}
                        {user[0].memberprofession}
                      </Center>
                      <Center>
                        <Text as="b"> Address: </Text> &nbsp;{" "}
                        {user[0].memberaddress}
                      </Center>
                      <Center>
                        <Text as="b"> Join Date: </Text> &nbsp;{" "}
                        {user[0].memberjoindate}
                      </Center>
                      <Center>
                        <Text as="b"> Expire Date: </Text> &nbsp;{" "}
                        {user[0].memberexpiredate}
                      </Center>
                      <MenuDivider />
                      <MenuItem
                        onClick={() => {
                          localStorage.setItem("ismemberlogin", "false");
                          a.memberlogout();
                          toast({
                            title: `Logout successfully.`,
                            status: "success",
                            position: "top",
                            isClosable: true,
                          });
                        }}
                      >
                        Logout
                      </MenuItem>
                    </>
                  ) : (
                    !a.islibrarianlogin && <Memberlogin onlogin={handlelogin} />
                  )}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
