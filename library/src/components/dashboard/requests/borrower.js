import { Badge, Td, Tr } from "@chakra-ui/react";
import React from "react";

function Borrower(props) {
  return (
    <Tr>
      <Td>{props.memberid}</Td>
      <Td>{props.bookid}</Td>
      <Td>{props.title}</Td>
      <Td>{props.days}</Td>
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
      <Td>{props.issuedate === "" ? "-" : props.issuedate}</Td>
      <Td>{props.returndate === "" ? "-" : props.returndate}</Td>
    </Tr>
  );
}

export default Borrower;
