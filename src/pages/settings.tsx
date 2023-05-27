/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex, Alert, Stack } from '@chakra-ui/react';
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
    <Flex w="full" justify="center">
      <Flex
        mt={{ base: '50px', md: '70px', xl: '100px' }}
        mx="auto"
        w="full"
        columnGap={6}
        flexDir={{ base: 'column', md: 'row' }}
        rowGap={8}
        h="fit-content"
        justify="center"
      >
        <PayoutSettingsForm onSave={onSubmitPayout} loading={inPayoutFlight} />
        <NotificationsForm
          onSave={onSubmitNotifications}
          loading={inNotificationsFlight}
        />
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
