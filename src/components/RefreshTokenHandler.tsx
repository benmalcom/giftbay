import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { APP_BASE_URL } from 'utils/constants';

const RefreshTokenHandler = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    let queryString;
    const currentPath = router.pathname;
    if (currentPath !== '/login') queryString = `?dest=${currentPath}`;
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({
        callbackUrl: `${APP_BASE_URL}/login${queryString ?? ''}`.trim(),
      });
    }
  }, [router.pathname, session]);

  return null;
};

export default RefreshTokenHandler;
