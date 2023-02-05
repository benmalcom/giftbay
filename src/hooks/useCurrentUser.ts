import { AxiosResponse } from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getUser } from 'services/user';
import { User } from 'types/user';

const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated' || !session?.user) return;
    const controller = new AbortController();
    const signal = controller.signal;
    getUser(session.user.id, signal)
      .then((response: AxiosResponse<User>) => setUser(response.data))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [session?.user, status]);

  return { user, loading, error };
};

export default useCurrentUser;
