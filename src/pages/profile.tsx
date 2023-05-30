/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import {
  UpdateBioFormValues,
  UpdateBioForm,
  ChangePasswordForm,
  ChangePasswordFormValues,
} from 'components/forms/profile';

import { PrivateLayout } from 'components/layouts';
import { DispatchUserContext, UserContext } from 'contexts/UserProvider';
import { updateLoggedInUser, changeLoggedInUserPassword } from 'services/user';
import { User } from 'types/user';
import { withAuthServerSideProps } from 'utils/serverSideProps';

const Profile = () => {
  const [inUpdateUserFlight, setInUpdateUserFlight] = useState(false);
  const [inChangePasswordFlight, setInChangePasswordFlight] = useState(false);
  const user = useContext(UserContext);
  const dispatchUser = useContext(DispatchUserContext);

  const onSubmitUserBio = (values: UpdateBioFormValues) => {
    setInUpdateUserFlight(true);
    updateLoggedInUser(values)
      .then((response: AxiosResponse<{ user: User }>) => {
        dispatchUser({ type: 'update', payload: response.data.user });
        toast.success('Success!');
      })
      .catch(error => {
        toast.error(error.message);
      })
      .finally(() => setInUpdateUserFlight(false));
  };

  const onSubmitPasswordChange = (values: ChangePasswordFormValues) => {
    setInChangePasswordFlight(true);
    changeLoggedInUserPassword(values)
      .then(() => toast.success('Success!'))
      .catch(error => {
        toast.error(error.message);
      })
      .finally(() => setInChangePasswordFlight(false));
  };

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
          onSave={onSubmitUserBio}
          loading={inUpdateUserFlight}
          initialValues={user ?? undefined}
        />

        <ChangePasswordForm
          onSave={onSubmitPasswordChange}
          loading={inChangePasswordFlight}
        />
      </Flex>
    </Flex>
  );
};
Profile.Layout = PrivateLayout;
export default Profile;
export const getServerSideProps = withAuthServerSideProps(() => {
  return {
    props: {
      pageTitle: 'Profile',
    },
  };
});
