import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ManageBooks from "./managebooks";
import ReturnBook from "./returnbook";

export function Books() {
  return (
    <div>
      <Tabs isFitted>
        <TabList>
          <Tab>Manage Books</Tab>
          <Tab>Return Books</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ManageBooks />
          </TabPanel>
          <TabPanel>
            <ReturnBook />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
