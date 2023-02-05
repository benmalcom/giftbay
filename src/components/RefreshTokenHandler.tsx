import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { APP_BASE_URL } from 'utils/constants';

const RefreshTokenHandler = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: `${APP_BASE_URL}/login` });
    }
  }, [session]);

  return null;
};

export default RefreshTokenHandler;
