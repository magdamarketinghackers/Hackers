import React from 'react';
import { BuilderComponent, builder } from '@builder.io/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import DefaultErrorPage from 'next/error';

// Initialize Builder.io with your public API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export const getStaticProps: GetStaticProps = async () => {
  // Fetch the homepage content from Builder.io
  const page = await builder.get('page', {
    userAttributes: { urlPath: '/' },
  }).toPromise();

  return {
    props: {
      page: page || null,
    },
    // Revalidate the homepage content every 5 seconds
    revalidate: 5,
  };
};

// Define the type for props
interface HomePageProps {
  page: any;
}

const HomePage: React.FC<HomePageProps> = ({ page }) => {
  // Display a 404 page if no homepage content is availablee
  if (!page) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{page?.data?.title || 'Home'}</title>
      </Head>
      <BuilderComponent model="page" content={page} />
    </>
  );
};

export default HomePage;
