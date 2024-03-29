import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { User } from 'types/user';

export function withAuthServerSideProps(
  getServerSidePropsFn: (
    context: GetServerSidePropsContext,
    user: User
  ) => Record<string, unknown>
) {
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);
    const { resolvedUrl } = context;

    const redirect: { [key: string]: string | boolean } = {
      permanent: false,
    };

    if (resolvedUrl !== '/login')
      redirect.destination = `/login?dest=${resolvedUrl}`;

    if (
      !session ||
      !session.user ||
      (session.accessTokenExpiry && Date.now() > session.accessTokenExpiry)
    ) {
      return {
        redirect,
        props: {
          authMessage: 'You need to be logged in to access this page.',
        },
      };
    }

    const { user } = session;

    if (getServerSidePropsFn) {
      const componentSSFnResponse = await getServerSidePropsFn(context, user);

      return {
        props: { session, ...(componentSSFnResponse.props as object) },
      };
    }

    return { props: { session } };
  };
}
