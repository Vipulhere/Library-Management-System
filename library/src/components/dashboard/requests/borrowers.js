import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Select,
} from "@chakra-ui/react";
import Borrower from "./borrower";
function Borrowers() {
  const [borrowers, setborrowers] = useState([]);
  const [filter, setfilter] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_BorrowBooks, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setborrowers(json);
        setfilter(json);
      });
  }, []);

  function handlechange(e) {
    // console.log(e.target.value)
    if (e.target.value === "pending") {
      console.log(e.target.value);
      setfilter(
        borrowers.filter((borrower) => {
          return borrower.borrowbyissue === "pending";
        })
      );
    } else if (e.target.value === "approved") {
      console.log(e.target.value);
      setfilter(
        borrowers.filter((borrower) => {
          return borrower.borrowbyissue === "approved";
        })
      );
    } else if (e.target.value === "disapproved") {
      console.log(e.target.value);
      setfilter(
        borrowers.filter((borrower) => {
          return borrower.borrowbyissue === "disapproved";
        })
      );
    } else {
      setfilter(borrowers);
    }
  }
  return (
    <div>
      <Select
        onChange={handlechange}
        mt="10px"
        mb="40px"
        placeholder="Filter by book status..."
      >
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="disapproved">Disapproved</option>
      </Select>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Member id</Th>
              <Th>book id</Th>
              <Th>book title</Th>
              <Th>Days</Th>
              <Th>book status</Th>
              <Th>issue date</Th>
              <Th>return date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filter.map((borrower) => (
              <Borrower
                key={borrower._id}
                memberid={borrower.borrowbymemberid}
                bookid={borrower.borrowbyid}
                title={borrower.borrowbybooktitle}
                days={borrower.borrowbydays}
                status={borrower.borrowbyissue}
                issuedate={borrower.borrowbyborrowdate}
                returndate={borrower.borrowbyreturndate}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Borrowers;
