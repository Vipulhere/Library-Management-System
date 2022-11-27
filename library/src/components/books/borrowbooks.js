import { Badge, Td, Tr } from "@chakra-ui/react";
import React from "react";

function Borrowbooks(props) {
  return (
    <Tr>
      <Td>{props.bookid}</Td>
      <Td>{props.title}</Td>
      <Td>
        {" "}
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
      <Td>{props.requestdate}</Td>
      <Td>{props.days}</Td>
      <Td>{props.issuedate === "" ? "-" : props.issuedate}</Td>
      <Td>{props.returndate === "" ? "-" : props.returndate}</Td>
      <Td>{props.fine === "" ? "-" : props.fine}</Td>
    </Tr>
  );
}

export default Borrowbooks;
