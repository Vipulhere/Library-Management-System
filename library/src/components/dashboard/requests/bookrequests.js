import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import Book from "./book";
function Bookrequests() {
  const [bookrequests, setbookrequests] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_BorrowBooks, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setbookrequests(json));
  }, []);
function handleapprove(bookid){
  // console.log(bookid)
  // console.log(bookrequests)
  setbookrequests(bookrequests.filter((bookrequest)=>{return bookrequest.bookid!==bookid}))
}
  return (
    <div>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Book Name</Th>
              <Th>Book ID</Th>
              <Th>Book status</Th>
              <Th>Member ID</Th>
              <Th>Request Date</Th>
              <Th>Days requested</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookrequests
              .filter((bookrequest) => bookrequest.borrowbyissue === "pending")
              .map((bookrequest) => (
                <Book
                onapprove={handleapprove}
                  key={bookrequest._id}
                  id={bookrequest._id}
                  status={bookrequest.borrowbyissue}
                  title={bookrequest.borrowbybooktitle}
                  bookid={bookrequest.borrowbyid}
                  memberid={bookrequest.borrowbymemberid}
                  days={bookrequest.borrowbydays}
                  requestdate={bookrequest.borrowbyrequestdate}
                />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Bookrequests;
