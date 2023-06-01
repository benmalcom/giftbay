import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { APP_BASE_URL } from 'utils/constants';

const useRedirectIfNotLoggedIn = () => {
  const router = useRouter();
  const currentPath = router.asPath;
  return () => {
    if (currentPath === '/login') return;

    const queryString = `?dest=${currentPath}`;
    signOut({
      callbackUrl: `${APP_BASE_URL}/login${queryString ?? ''}`.trim(),
    });
  };
};

export default useRedirectIfNotLoggedIn;
