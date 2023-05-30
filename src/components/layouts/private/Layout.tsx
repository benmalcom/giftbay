/*eslint-disable react/no-children-prop */
import { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react';
import { PageSpinner } from 'components/common';
import { AppConfigContext } from 'contexts/AppConfigProvider';
import { DispatchUserContext } from 'contexts/UserProvider';
import { getLoggedInUser } from 'services/user';
import { User } from 'types/user';
import HorizontalLayout from './HorizontalLayout';
import VerticalLayout from './VerticalLayout';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children, ...props }: LayoutProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatchUser = useContext(DispatchUserContext);
  const { layoutOrientation } = useContext(AppConfigContext);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated' || !session?.user) return;
    const controller = new AbortController();
    const signal = controller.signal;
    getLoggedInUser(signal)
      .then((response: AxiosResponse<{ user: User }>) =>
        dispatchUser({ type: 'set', payload: response.data.user })
      )
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [dispatchUser, session?.user, status]);

  if (loading || error) return <PageSpinner />;

  return layoutOrientation === 'vertical' ? (
    <VerticalLayout {...props}>{children}</VerticalLayout>
  ) : (
    <HorizontalLayout {...props}>{children}</HorizontalLayout>
  );
};

export default Layout;
