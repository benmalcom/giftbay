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
        <UpdateBioForm
          onSave={onSubmitUserDetails}
          loading={inUpdateUserFlight}
        />

        <ChangePasswordForm
          onSave={onSubmitPasswordChange}
          loading={inChangePasswordFlight}
        />
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
