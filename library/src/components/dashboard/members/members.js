import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import RegisterMember from "./registermember";
import Allmembers from "./allmembers";
export function Members() {
  return (
    <div>
      <Tabs isFitted>
        <TabList>
          <Tab>All Members</Tab>
          <Tab>Register New Member</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Allmembers />
          </TabPanel>
          <TabPanel>
            <RegisterMember />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Members;
