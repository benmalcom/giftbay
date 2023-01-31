import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

type RefreshTokenHandlerProps = {
  setInterval(time: number): void;
};
const RefreshTokenHandler: React.FC<RefreshTokenHandlerProps> = props => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // We did set the token to be ready to refresh after 23 hours, here we set interval of 23 hours 30 minutes.
      const timeRemaining = Math.round(
        (new Date(session.accessTokenExpiry).getTime() -
          30 * 60 * 1000 -
          Date.now()) /
          1000
      );
      props.setInterval(timeRemaining > 0 ? timeRemaining : 0);
    }
  }, [props, session]);

  return null;
};

export default RefreshTokenHandler;
