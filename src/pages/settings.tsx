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
import toast from 'react-hot-toast';
import { PageSpinner } from 'components/common';
import ChangePasswordForm, {
  ChangePasswordFormData,
} from 'components/settings/ChangePasswordForm';
import UserDetailsForm, {
  UserDetailsFormData,
} from 'components/settings/UserDetailsForm';
import useCurrentUser from 'hooks/useCurrentUser';
import { withAuthServerSideProps } from 'utils/serverSideProps';
import { updateUserDetails } from '../services/user';

const Settings = () => {
  const [inUpdateUserFlight, setInUpdateUserFlight] = useState(false);
  const [inChangePasswordFlight /*setInChangePasswordFlight*/] =
    useState(false);
  const { loading: inGetUserFlight, user, error } = useCurrentUser();

  const onSubmitUserDetails = (values: UserDetailsFormData) => {
    setInUpdateUserFlight(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    updateUserDetails(user!.id, values)
      .then(() => {
        toast.success('Success!');
      })
      .catch(error => {
        toast.error(error.message);
      })
      .finally(() => setInUpdateUserFlight(false));
  };

  const onSubmitPasswordChange = (values: ChangePasswordFormData) => {
    console.log('values ', values);
  };

  if (inGetUserFlight || error) return <PageSpinner />;

  return (
    <>
      <Flex w="full" justify="center" mt="50px">
        <Flex width="600px" flexDir="column">
          <Alert status="warning" variant="subtle">
            Update your bio details and change your password here.
          </Alert>
          <Tabs mt="50px">
            <TabList>
              <Tab>User Profile</Tab>
              <Tab isDisabled>Change Password</Tab>
            </TabList>

            <TabPanels>
              <TabPanel pt={10}>
                <UserDetailsForm
                  onSave={onSubmitUserDetails}
                  initialValues={user!}
                  loading={inUpdateUserFlight}
                />
              </TabPanel>
              <TabPanel>
                <ChangePasswordForm
                  onSave={onSubmitPasswordChange}
                  loading={inChangePasswordFlight}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </>
  );
};
export default Settings;
export const getServerSideProps = withAuthServerSideProps(() => {
  return {
    props: {
      pageTitle: 'Settings',
    },
  };
});
