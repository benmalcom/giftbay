/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Head from 'next/head';
import React from 'react';

type HeaderTagsProps = {
  title?: string;
  pageUrl?: string;
  imageUrl?: string;
  description?: string;
  keywords?: string;
};
const HeaderTags: React.FC<HeaderTagsProps> = ({
  imageUrl,
  pageUrl,
  keywords = 'Resume, edit, generate, pdf, build, customize',
  description = 'Build, edit or generate your resume in PDF format.',
  title,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      {description ? <meta name="description" content={description} /> : null}
      {keywords ? (
        <meta name="keywords" content={`ResumeChef, ${keywords}`} />
      ) : null}
      {/*Open Graph / Facebook*/}
      {pageUrl ? <meta property="og:url" content={pageUrl} /> : null}
      <meta property="og:title" content={title} />
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}

      {/*Twitter*/}
      {imageUrl ? <meta property="twitter:card" content={imageUrl} /> : null}
      {pageUrl ? <meta property="twitter:url" content={pageUrl} /> : null}
      <meta property="twitter:title" content={title} />
      {description ? (
        <meta property="twitter:description" content={description} />
      ) : null}
      {imageUrl ? <meta property="twitter:image" content={imageUrl} /> : null}
      {pageUrl ? <link rel="canonical" href={pageUrl} /> : null}
    </Head>
  );
};

export default HeaderTags;
