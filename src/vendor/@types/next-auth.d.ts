import { User } from 'types/user';

type Token = {
  accessToken: string;
  user: User;
};

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiry: number;
    user: User;
    expires: string;
    error: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user: User;
    token: Token;
    accessToken: string;
  }
}
