import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Td, Tr } from "@chakra-ui/react";
import React from "react";

function Member(props) {
  return (
    <Tr>
      <Td>{props.id}</Td>
      <Td>{props.name}</Td>
      <Td>{props.profession}</Td>
      <Td>{props.joindate}</Td>
      <Td>{props.expiredate}</Td>
      <Td>
        {" "}
        <IconButton
          onClick={() => props.ondelete(props.uniqueid)}
          aria-label="Delete"
          icon={<DeleteIcon />}
        />
      </Td>
    </Tr>
  );
}

export default Member;
