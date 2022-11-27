import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Bookrequests from "./bookrequests";
import Borrowers from "./borrowers";
function Requests() {
  return (
    <div>
      <Tabs isFitted>
        <TabList>
          <Tab>Book Issue Requests</Tab>
          <Tab>Borrowers</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Bookrequests />
          </TabPanel>
          <TabPanel>
            <Borrowers />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Requests;
