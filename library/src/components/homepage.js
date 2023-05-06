import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Ebooks from "./books/ebooks";
import Books from "./books/books";
import Borrow from "./books/borrow";

function Homepage() {
  return (
    <div>
      <Tabs mt="10px" isFitted>
        <TabList>
          <Tab>Books</Tab>
          <Tab>Borrow Details</Tab>
          <Tab>E-Books (Free)</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Books />
          </TabPanel>
          <TabPanel>
            <Borrow />
          </TabPanel>
          <TabPanel>
            <Ebooks />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Homepage;
