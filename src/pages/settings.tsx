/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Flex,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
  Alert,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { PageSpinner } from 'components/common';
import {
  PayoutFormValues,
  NotificationsForm,
  PayoutSettingsForm,
} from 'components/forms/settings';
import { withAuthServerSideProps } from 'utils/serverSideProps';

const Settings = () => {
  const [inPayoutFlight, setPayoutFlight] = useState(false);
  const [inNotificationsFlight, setNotificationsFlight] = useState(false);
  // const { loading: inGetUserFlight, user, error } = useCurrentUser();

  const onSubmitPayout = (values: PayoutFormValues) => {
    console.log('values ', values);
  };

  const onSubmitNotifications = (values: Record<string, boolean>) => {
    console.log('values ', values);
  };

  // if (inGetUserFlight || error) return <PageSpinner />;

  return (
    <Flex w="full" justify="center" mt="100px">
      <Flex width="550px" h="fit-content" flexDir="column">
        <Alert status="warning" variant="subtle">
          Update your payout and notifications here.
        </Alert>
        <Tabs
          mt="50px"
          bg="white"
          py={8}
          mx="auto"
          boxShadow="base"
          borderRadius="xl"
          w="full"
          colorScheme="purple"
        >
          <TabList>
            <Tab>Payout Settings</Tab>
            <Tab>Notifications</Tab>
          </TabList>

          <TabPanels px={5}>
            <TabPanel>
              <PayoutSettingsForm
                onSave={onSubmitPayout}
                loading={inPayoutFlight}
              />
            </TabPanel>
            <TabPanel>
              <NotificationsForm
                onSave={onSubmitNotifications}
                loading={inNotificationsFlight}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};
export default Settings;
/*export const getServerSideProps = withAuthServerSideProps(() => {
  return {
    props: {
      pageTitle: 'Settings',
    },
  };
});*/
