const SITE_BANNER =
  'https://cdn.jsdelivr.net/gh/wakaplug/wakaplug-assets@latest/meta-preview.png';

const SITE_URL =
  process.env.VERCEL_URL ||
  process.env.NEXT_PUBLIC_APP_BASE_URL ||
  'https://wakaplug.com';

const title =
  'Wakaplug - Fastest way to host events, sell attendees & manage attendees';
const description =
  'Experience the ease, simplicity, and earning potential of events with wakaplug. Be up and running in minutes with a few basic details.';

export const defaultPageHeader = {
  title,
  metas: [
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content: 'Wakaplug, events, attendees',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: SITE_URL,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: SITE_BANNER,
    },
    {
      property: 'twitter:card',
      content: SITE_BANNER,
    },
    {
      property: 'twitter:url',
      content: SITE_URL,
    },
    {
      property: 'twitter:title',
      content: title,
    },
    {
      property: 'twitter:description',
      content: description,
    },
    {
      property: 'twitter:image',
      content: SITE_BANNER,
    },
    {
      rel: 'canonical',
      href: SITE_URL,
    },
  ],
};

export const getDefaultMetaTags = () => defaultPageHeader.metas;
export const getDefaultPageHeader = () => defaultPageHeader;
/*

export const updateAndGetPageHeader = (pageHeader: { title: string; metas: any[]; }) => {
  const result = { ...defaultPageHeader };
  if (pageHeader?.title) result.title = pageHeader.title;
  if (pageHeader?.metas?.length) {
    pageHeader.metas.forEach(meta => {
      const index = result?.metas.findIndex(
        item =>
          item?.name === meta?.name ||
          item?.property === meta?.property ||
          item?.canonical === meta?.canonical
      );
      if (index > -1)
        result.metas[index] = {
          ...result.metas[index],
          ...meta,
        };
    });
  }
  return result;
};
*/
