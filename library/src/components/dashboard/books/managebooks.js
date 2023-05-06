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

import { AddBook } from "./addbook";
import Book from "./book";
import Loading from "../../Loading";
function ManageBooks(props) {
  const [books, setbooks] = useState([]);
  const toast = useToast();
  function handleadd(book) {
    fetch(process.env.REACT_APP_ManageBook, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => setbooks(json));
  }

  function handledelete(id) {
    fetch(`${process.env.REACT_APP_DeleteBook}${id}`, {
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
          setbooks(
            books.filter((book) => {
              return book._id !== id;
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
  const [loading, setloading] = useState(true);
  useEffect(() => {
    fetch(process.env.REACT_APP_ManageBook, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setbooks(json);
        setloading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Book ID</Th>
                <Th>Book Title</Th>
                <Th> Book Author</Th>
                <Th> Book Price</Th>
                <Th> Book Available</Th>
                <Th> Action</Th>
                <AddBook onAdd={handleadd} />
              </Tr>
            </Thead>

            <Tbody>
              {books.map((book) => (
                <Book
                  ondelete={handledelete}
                  key={book._id}
                  uniqueid={book._id}
                  id={book.bookid}
                  title={book.booktitle}
                  author={book.bookauthor}
                  price={book.bookprice}
                  available={book.bookavailable}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default ManageBooks;
