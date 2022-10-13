import { AxiosResponse } from 'axios';
import { pick } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { composeRequestConfig, createRequest } from 'services/http';
import { ApiResponse } from 'types/api';

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    id: 'credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {},
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async authorize(credentials) {
      const isRegister = !!credentials && 'isRegister' in credentials;
      const inputFields = ['email', 'password', 'verifyRedirectUrl'];
      if (isRegister) inputFields.push('username', 'displayName');
      const payload = pick(credentials, inputFields);
      const config = composeRequestConfig({
        url: isRegister ? '/signUp' : '/signIn',
        payload,
        method: 'post',
      });
      try {
        const response = await createRequest(config);
        const {
          // flatten data object
          data: { user: profileData, ...userData },
          meta: { token },
        } = response as AxiosResponse & ApiResponse;

        const user = pick({ ...userData, ...profileData }, [
          'email',
          'accountVerified',
          'id',
        ]);

        return Object.assign({}, { data: user, token });
        // eslint-disable-next-line
        // @ts-ignore
      } catch (e) {
        throw new Error(
          (e as ApiResponse)?.meta?.error?.message ||
            `Unable to ${isRegister ? 'register' : 'login'}`
        );
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
      token.accessToken = user.token;
      token.user = user.data;
    }
    return token;
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async session({ session, token }) {
    session.accessToken = token.accessToken;
    session.user = token.user;
    return session;
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
