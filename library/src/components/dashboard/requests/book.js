import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Badge, IconButton, Td, Tooltip, Tr, useToast } from "@chakra-ui/react";
import React from "react";

function Book(props) {
  const toast = useToast();

  function handleapprove() {
    var someDate = new Date();
    someDate.setTime(someDate.getTime() + props.days * 24 * 60 * 60 * 1000);
    fetch(process.env.REACT_APP_ApproveRequest, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        id: props.id,
        issuedate: new Date().toDateString(),
        returndate: someDate.toDateString(),
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        if (response.status === "success") {
          fetch(process.env.REACT_APP_HandleAvailable, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "PATCH",
            body: JSON.stringify({
              id: props.bookid,
            }),
          });
          props.onapprove(props.bookid)
          toast({
            title: `Approved successfully.`,
            status: "success",
            position: "top",
            isClosable: true,
          });
        } else if (response.status === "fail") {
          toast({
            title: `Approve Failed. Please try again after sometime.`,
            status: "error",
            position: "top",
            isClosable: true,
          });
        }
      });
  }

  function handledisapprove() {
    fetch(
      process.env.REACT_APP_DisapproveRequest,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          id: props.id,
        }),
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        if (response.status === "success") {
          toast({
            title: `Disapproved successfully.`,
            status: "success",
            position: "top",
            isClosable: true,
          });
        } else if (response.status === "fail") {
          toast({
            title: `Dispprove Failed. Please try again after sometime.`,
            status: "error",
            position: "top",
            isClosable: true,
          });
        }
      });
  }
  return (
    <Tr>
      <Td>{props.title}</Td>
      <Td>{props.bookid}</Td>
      <Td>
        <Badge
          colorScheme={
            props.status === "pending"
              ? "yellow"
              : props.status === "approved"
              ? "green"
              : "red"
          }
        >
          {props.status}
        </Badge>
      </Td>
      <Td>{props.memberid}</Td>
      <Td>{props.requestdate}</Td>
      <Td>{props.days}</Td>
      <Td>
        <Tooltip bg="gray.300" color="black" label="Approve">
          <IconButton
            onClick={handleapprove}
            variant="outline"
            colorScheme="teal"
            fontSize="20px"
            icon={<CheckIcon />}
          />
        </Tooltip>{" "}
        <Tooltip bg="gray.300" color="black" label="Disapprove">
          <IconButton
            onClick={handledisapprove}
            variant="outline"
            colorScheme="teal"
            fontSize="20px"
            icon={<CloseIcon />}
          />
        </Tooltip>
      </Td>
    </Tr>
  );
}

export default Book;
