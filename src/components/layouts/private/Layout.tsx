/*eslint-disable react/no-children-prop */
import { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react';
import { PageSpinner } from 'components/common';
import { AppConfigContext } from 'contexts/AppConfigProvider';
import { DispatchUserContext, UserContext } from 'contexts/UserProvider';
import useRedirectIfNotLoggedIn from 'hooks/useRedirectIfNotLoggedIn';
import { getLoggedInUser } from 'services/user';
import { User } from 'types/user';
import HorizontalLayout from './HorizontalLayout';
import VerticalLayout from './VerticalLayout';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children, ...props }: LayoutProps) => {
  const [loading, setLoading] = useState(true);
  const dispatchUser = useContext(DispatchUserContext);
  const currentUser = useContext(UserContext);
  const { layoutOrientation } = useContext(AppConfigContext);
  const { status: authStatus } = useSession();
  const redirectToLogin = useRedirectIfNotLoggedIn();

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      redirectToLogin();
      return;
    }
    if (currentUser) return;
    const controller = new AbortController();
    const signal = controller.signal;
    getLoggedInUser(signal)
      .then((response: AxiosResponse<{ user: User }>) =>
        dispatchUser({ type: 'set', payload: response.data.user })
      )
      .catch(error => {
        if (error.code !== 'ERR_CANCELED') {
          dispatchUser({ type: 'set', payload: null });
          console.log('User fetch error ', error);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [currentUser, dispatchUser, redirectToLogin, authStatus]);

  if (loading || !currentUser) return <PageSpinner />;

  return layoutOrientation === 'vertical' ? (
    <VerticalLayout {...props}>{children}</VerticalLayout>
  ) : (
    <HorizontalLayout {...props}>{children}</HorizontalLayout>
  );
};

export default Layout;
