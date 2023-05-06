import {
  Button,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useContext } from "react";
import signinContext from "./context/signincontext";

export function Librarianlogin(props) {
  const a = useContext(signinContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credentials, setCredentials] = useState({
    librarianid: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const toast = useToast();
  function handlechange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  function handleclick() {
    if (credentials.username === "" || credentials.password === "") {
      toast({
        title: `Please fill username and password.`,
        status: "error",
        position: "top",
        isClosable: true,
      });
    } else {
      setloading(true);
      fetch(process.env.REACT_APP_LibrarianLogin, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status === "success") {
            localStorage.setItem("ismemberlogin", "false");
            localStorage.setItem("librarianid", credentials.librarianid);
            localStorage.setItem("islibrarianlogin", "true");
            props.onlibrarianlogin();
            a.updatelibrarianlogin();

            toast({
              title: `Login successfully.`,
              status: "success",
              position: "top",
              isClosable: true,
            });
            setloading(false);
          } else if (response.status === "fail") {
            // console.log("notfound");
            toast({
              title: `Invalid Credentials`,
              status: "error",
              position: "top",
              isClosable: true,
            });
            setloading(false);
          }
        });
    }
  }
  function handlekeypress(e) {
    if (e.key === "Enter") {
      handleclick();
    } else {
    }
  }

  return (
    <>
      <MenuItem onClick={onOpen}>Librarian Login</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log in</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>
            <FormControl>
              <FormLabel>Librarian ID</FormLabel>
              <Input
             
                onChange={handlechange}
                name="librarianid"
                placeholder="Librarian ID"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
               onKeyPress={handlekeypress}
               type="password"
                onChange={handlechange}
                name="password"
                placeholder="Password"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleclick}
              isLoading={loading ? "true" : ""}
              loadingText="Logging in..."
              colorScheme="blue"
              mr={3}
            >
              Librarian Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
