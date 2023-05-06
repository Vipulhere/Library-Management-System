import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Td, Tooltip, Tr } from "@chakra-ui/react";
import React from "react";
import { UpdateBook } from "./updatebooks";

function Book(props) {
  return (
    <Tr>
      <Td>{props.id}</Td>
      <Td>{props.title}</Td>
      <Td>{props.author}</Td>
      <Td>{props.price}</Td>
      <Td>{props.available}</Td>

      <Td>
        <UpdateBook uniqueid={props.uniqueid} bookid={props.id} />
        <Tooltip bg="gray.300" color="black" label="Delete">
          <IconButton
            onClick={() => props.ondelete(props.uniqueid)}
            aria-label="Delete"
            icon={<DeleteIcon />}
          />
        </Tooltip>
      </Td>
    </Tr>
  );
}

export default Book;
