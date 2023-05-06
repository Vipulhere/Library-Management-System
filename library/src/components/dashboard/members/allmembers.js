import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import Member from "./member";
function Allmembers() {
  const [members, setmembers] = useState([]);
  const toast = useToast();
  function handledelete(id) {
    fetch(`${process.env.REACT_APP_DeleteMember}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          toast({
            title: `Deleted successfully`,
            status: "success",
            position: "top",
            isClosable: true,
          });
          setmembers(
            members.filter((member) => {
              return member._id !== id;
            })
          );
        } else if (response.status === "fail") {
          toast({
            title: `Failed to delete`,
            status: "error",
            position: "top",
            isClosable: true,
          });
        }
      });
  }

  useEffect(() => {
    fetch(process.env.REACT_APP_AllMembers, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setmembers(json));
  }, []);
  return (
    <div>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Member ID</Th>
              <Th>Member Name</Th>
              <Th>Member Profession</Th>
              <Th>Member Join Date</Th>
              <Th>Member Expire Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {members.map((member) => (
              <Member
                ondelete={handledelete}
                uniqueid={member._id}
                key={member._id}
                id={member.memberid}
                name={member.membername}
                profession={member.memberprofession}
                joindate={member.memberjoindate}
                expiredate={member.memberexpiredate}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Allmembers;
