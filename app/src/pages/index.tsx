import React from 'react';
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';
import { useRouter } from "next/router";
import { BuilderContent } from "@builder.io/sdk";
import { GetStaticProps } from 'next';
import Head from 'next/head';
import DefaultErrorPage from 'next/error';
import '@builder.io/widgets';
import { Montserrat } from "next/font/google";

// Initialize Builder.io with your public API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

const montserrat = Montserrat({ subsets: ['latin'] })


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


// Define the Page component
export default function Home({ page }: { page: BuilderContent | null }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  // If the page content is not available
  // and not in preview mode, show a 404 error page
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  // If the page content is available, render
  // the BuilderComponent with the page content
  return (
    <>
      <Head>
        <title>{page?.data?.title}</title>
        {/* Ładowanie favicony z CMS jeśli dostępna, inaczej domyślna */}
        <link rel="icon" href={page?.data?.favicon} type="image/x-icon" />
        <style jsx global>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>
      </Head>
      <BuilderComponent model="page" content={page || undefined} />
    </>
  );
}
