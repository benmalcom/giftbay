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
import {
  UpdateBioFormValues,
  UpdateBioForm,
  ChangePasswordForm,
  ChangePasswordFormValues,
} from 'components/forms/profile';

import useCurrentUser from 'hooks/useCurrentUser';
import { updateUser } from '../services/user';

const Profile = () => {
  const [inUpdateUserFlight, setInUpdateUserFlight] = useState(false);
  const [inChangePasswordFlight /*setInChangePasswordFlight*/] =
    useState(false);
  // const { loading: inGetUserFlight, user, error } = useCurrentUser();

  const onSubmitUserDetails = (values: UpdateBioFormValues) => {
    setInUpdateUserFlight(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    updateUser(user!.id, values)
      .then(() => {
        toast.success('Success!');
      })
      .catch(error => {
        toast.error(error.message);
      })
      .finally(() => setInUpdateUserFlight(false));
  };

  const onSubmitPasswordChange = (values: ChangePasswordFormValues) => {
    console.log('values ', values);
  };

  // if (inGetUserFlight || error) return <PageSpinner />;

  return (
    <Flex w="full" justify="center" mt="100px">
      <Flex w={{ base: '95%', sm: '550px' }} h="fit-content" flexDir="column">
        <Alert variant="left-accent" colorScheme="purple">
          Update your bio details and change your password here.
        </Alert>
        <Tabs
          mt="50px"
          bg="white"
          py={8}
          mx="auto"
          boxShadow="base"
          borderRadius="lg"
          w="full"
          colorScheme="purple"
        >
          <TabList>
            <Tab>Update Bio</Tab>
            <Tab>Change Password</Tab>
          </TabList>

          <TabPanels pt={5} px={5}>
            <TabPanel>
              <UpdateBioForm
                onSave={onSubmitUserDetails}
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
  );
};
export default Profile;
/*export const getServerSideProps = withAuthServerSideProps(() => {
  return {
    props: {
      pageTitle: 'Settings',
    },
  };
});*/
