import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { User } from 'types/User';

type GetServerSidePropsFn = (
  context: GetServerSidePropsContext,
  user: User
) => Promise<{ props: object }>;

export function withAuthServerSideProps(
  getServerSidePropsFn: GetServerSidePropsFn
) {
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);
    const { resolvedUrl } = context;
    if (!session || !session.user) {
      return {
        redirect: {
          permanent: false,
          destination: `/login?dest=${resolvedUrl}`,
        },
        props: {},
      };
    }

    if (!session.user.accountVerified) {
      if (resolvedUrl !== '/verify') {
        return {
          redirect: {
            permanent: false,
            destination: '/verify',
          },
          props: {},
        };
      }
    }

    const {
      user: { user: profile, ...rest },
    } = session;

    const user = {
      ...profile,
      ...rest,
    } as User;

    if (getServerSidePropsFn) {
      const componentSSFnResponse = await getServerSidePropsFn(context, user);

      return {
        props: { user, ...componentSSFnResponse.props },
      };
    }

    return { props: { user } };
  };
}