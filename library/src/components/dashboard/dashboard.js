import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Members from "./members/members";
import { Books } from "./books/books";
import Requests from "./requests/requests";

function Dashboard() {
  return (
    <div>
      <Tabs isFitted>
        <TabList>
          <Tab>Books</Tab>
          <Tab>Members</Tab>
          <Tab>Requests</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Books />
          </TabPanel>
          <TabPanel>
            <Members />
          </TabPanel>
          <TabPanel>
            <Requests />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Dashboard;
