import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import useRedirectIfNotLoggedIn from 'hooks/useRedirectIfNotLoggedIn';

const RefreshTokenHandler = () => {
  const { data: session } = useSession();
  const redirectToLogin = useRedirectIfNotLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (
      session?.error === 'RefreshAccessTokenError' &&
      router.asPath !== '/login'
    ) {
      redirectToLogin();
    }
  }, [redirectToLogin, router.asPath, session]);

  return null;
};

export default RefreshTokenHandler;
