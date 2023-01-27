import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { BasicUser } from 'types/user';

export function withAuthServerSideProps(
  getServerSidePropsFn: (
    context: GetServerSidePropsContext,
    user: BasicUser
  ) => Record<string, unknown>
) {
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);
    const { resolvedUrl, res } = context;
    if (resolvedUrl?.startsWith('/resume/builder?generatePDF=true')) {
      res.setHeader('Cache-Control', 'no-store');
      return { props: {} };
    }

    if (!session?.user) {
      return {
        redirect: {
          permanent: false,
          destination: `/login?dest=${resolvedUrl}`,
        },
        props: {},
      };
    }

    const { user } = session;

    if (getServerSidePropsFn) {
      const componentSSFnResponse = await getServerSidePropsFn(context, user);

      return {
        props: { user, ...(componentSSFnResponse.props as object) },
      };
    }

    return { props: { user } };
  };
}
