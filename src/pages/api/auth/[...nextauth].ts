import jwtDecode from 'jwt-decode';
import { pick } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginOrRegister, refreshAccessToken } from 'services/auth';
import { ApiResponseError } from 'types/api';

const providers = [
  CredentialsProvider({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async authorize(credentials) {
      try {
        const { data } = await loginOrRegister(credentials);
        const {
          user: { email, id, isVerified, name },
          refreshToken,
          accessToken, // eslint-disable-next-line
        } = data as Record<string, any>;

        const { exp } = jwtDecode(accessToken) as {
          exp: number;
        };

        const accessTokenExpiry = exp * 1000;
        const user = {
          data: { email, id, isVerified, name },
          accessToken,
          refreshToken,
          accessTokenExpiry,
        };

        if (user) return user;
        return null;
      } catch (e) {
        throw new Error((e as ApiResponseError)?.message || 'Operation failed');
      }
    },
  }),
];

const callbacks = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async jwt({ token, user }) {
    /* Use an if branch to check for the existence of parameters (apart from token).
    If they exist, this means that the callback is being invoked for the first time (i.e. the user is being signed in).
    This is a good place to persist additional data like an access_token in the JWT.
    Subsequent invocations will only contain the token parameter. */
    if (user) {
      return {
        ...pick(user, ['accessToken', 'refreshToken', 'accessTokenExpiry']),
        user: user.data,
      };
    }

    // Return previous token if the access token has not expired yet
    if (Date.now() < token.accessTokenExpiry) {
      return Promise.resolve(token);
    }

    // Access token has expired, try to update it
    return await refreshAccessToken(token);
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async session({ session, token }) {
    // Here we pass accessToken to the client to be used in authentication with your API
    Object.assign(
      session,
      pick(token, [
        'accessToken',
        'refreshToken',
        'user',
        'accessTokenExpiry',
        'error',
      ])
    );
    return Promise.resolve(session);
  },
};

const options: NextAuthOptions = {
  providers,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callbacks,
  // If NEXTAUTH_SECRET is set, no need to define the secret option
  // secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 24 * 60 * 60, //  days
  },
  jwt: {},
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
