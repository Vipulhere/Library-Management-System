import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
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

export function GetStarted(props) {
  const a = useContext(signinContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credentials, setCredentials] = useState({
    memberid: "",
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
      fetch(process.env.REACT_APP_MemberLogin, {
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
            localStorage.setItem("islibrarianlogin", "false");
            localStorage.setItem("ismemberlogin", "true");
            localStorage.setItem("memberid", credentials.memberid);
            props.ongettingstarted();
            a.updatememberlogin();
            toast({
              title: `Login successfully.`,
              status: "success",
              position: "top",
              isClosable: true,
            });
            setloading(false);
          } else if (response.status === "fail") {
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
      <Button
        onClick={onOpen}
        colorScheme={"green"}
        bg={"green.400"}
        rounded={"full"}
        px={6}
        _hover={{
          bg: "green.500",
        }}
      >
        Get Started
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log in</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={2}>
            <FormControl>
              <FormLabel>Member ID</FormLabel>
              <Input
                onChange={handlechange}
                name="memberid"
                placeholder="Member ID"
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
              <FormHelperText>
                Note: If you are a new student then contact librarian to get
                yourself registered.
              </FormHelperText>
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
              Member Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
