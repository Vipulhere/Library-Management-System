import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import Borrowbooks from "./borrowbooks";
function Borrow() {
  const [borrowbooks, setborrowbooks] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_BorrowBooks, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setborrowbooks(json.filter((borrow)=>{return borrow.borrowbymemberid===localStorage.getItem('memberid')})));
  }, []);

  return (
    <div>
      <TableContainer mt="40px">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Book id</Th>
              <Th>Book Name</Th>
              <Th>Status</Th>
              <Th>Request Date</Th>
              <Th>Days</Th>
              <Th>Issue Date</Th>
              <Th>Return Date</Th>
              <Th> Fine</Th>
            </Tr>
          </Thead>
          <Tbody>
            {borrowbooks
              .filter((borrowbook) => {
                return (
                  borrowbook.borrowbymemberid ===
                  localStorage.getItem("memberid")
                );
              })
              .map((borrowbook) => (
                <Borrowbooks
                  fine={borrowbook.fine}
                  bookid={borrowbook.borrowbyid}
                  key={borrowbook._id}
                  title={borrowbook.borrowbybooktitle}
                  status={borrowbook.borrowbyissue}
                  requestdate={borrowbook.borrowbyrequestdate}
                  days={borrowbook.borrowbydays}
                  issuedate={borrowbook.borrowbyborrowdate}
                  returndate={borrowbook.borrowbyreturndate}
                />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Borrow;
