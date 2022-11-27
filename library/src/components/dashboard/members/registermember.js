import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  useColorModeValue,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import TextField from "@material-ui/core/TextField";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function RegisterMember() {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const [userdata, setuserdata] = useState({
    membername: "",
    memberid: "",
    memberaddress: "",
    memberprofession: "",
    memberjoindate: "",
    memberexpiredate: "",
    memberpassword: "",
    time: new Date().toLocaleString(),
  });

  function handlechange(e) {
    setuserdata({
      ...userdata,
      [e.target.name]: e.target.value,
      registrationtime: new Date().toLocaleString(),
    });
  }

  function handleclick() {
    fetch(process.env.REACT_APP_RegisterMembers, {
      method: "POST",
      body: JSON.stringify(userdata),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          // console.log("data saved success");
          toast({
            title: `Registered successfully.`,
            status: "success",
            position: "top",
            isClosable: true,
          });
          setuserdata({
            membername: "",
            memberid: "",
            memberaddress: "",
            memberprofession: "",
            memberjoindate: "",
            memberexpiredate: "",
            memberpassword: "",
            time: new Date().toLocaleString(),
          })
        } else if (response.status === "fail") {
          toast({
            title: `Not registered. Please try again after sometime.`,
            status: "error",
            position: "top",
            isClosable: true,
          });
        }
      });
  }

  return (
    <Flex
      // minH={'100vh'}
_dark={{bg:"gray.800"}}
      align={"center"}
      justify={"center"}
      bg={"gray.200"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={5} px={6}>
        {/* <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
             Register Member
            </Heading>
          
          </Stack> */}
        <Box
        _dark={{bg:"gray.700"}}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Member Name</FormLabel>
                  <Input
                    onChange={handlechange}
                    name="membername"
                    type="text"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Member ID</FormLabel>
                  <Input onChange={handlechange} name="memberid" type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Member Address</FormLabel>
              <Input onChange={handlechange} name="memberaddress" type="text" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Member Profession </FormLabel>
              <Select
                onChange={handlechange}
                name="memberprofession"
                placeholder="Select Member Profession"
              >
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
            <HStack>
              <Box>
              <FormLabel>Join Date </FormLabel>
                <FormControl isRequired>
                  <TextField
                  _dark={{color:"white"}}
                    onChange={handlechange}
                    name="memberjoindate"
                    // label="Join Date"
                    type="date"
                    // defaultValue="2017-05-24"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Box>
              <Box>
              <FormLabel>Expire Date</FormLabel>
                <FormControl ml="30px" isRequired>
                  <TextField
                    onChange={handlechange}
                    name="memberexpiredate"
                    // label="Expire Date"
                    type="date"
                    // defaultValue="2017-05-24"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </Box>
            </HStack>

            <FormControl id="password" isRequired>
              <FormLabel>Member Password</FormLabel>
              <InputGroup>
                <Input
                  onChange={handlechange}
                  name="memberpassword"
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleclick}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
