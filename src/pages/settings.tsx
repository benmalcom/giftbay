/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  PayoutFormValues,
  NotificationsForm,
  PayoutSettingsForm,
} from 'components/forms/settings';
import { PrivateLayout } from 'components/layouts';
import { updateUserSettings } from 'services/user';
import { withAuthServerSideProps } from 'utils/serverSideProps';

const Settings = () => {
  const [inPayoutFlight /*, setPayoutFlight*/] = useState(false);
  const [inNotificationsFlight /*, setNotificationsFlight*/] = useState(false);

  const onSubmitPayout = (values: PayoutFormValues) =>
    updateUserSettings(values);

  const onSubmitNotifications = (values: Record<string, boolean>) =>
    updateUserSettings(values);

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
Settings.Layout = PrivateLayout;
export default Settings;
export const getServerSideProps = withAuthServerSideProps(() => {
  return {
    props: {
      pageTitle: 'Settings',
    },
  };
});
