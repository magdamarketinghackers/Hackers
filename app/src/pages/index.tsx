import React from "react";
import { BuilderComponent, builder } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { GetStaticProps } from "next";

// Initialize the Builder.io SDK
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Define the getStaticProps function to fetch content for the homepage
export const getStaticProps: GetStaticProps = async () => {
  const page = await builder.get("page", { url: '/saltic' }).promise();

  return {
    props: {
      page: page || null,
    },
    // Revalidate the content every 10 seconds
    revalidate: 10,
  };
};

// Define the Page component to render the homepage
export default function Home({ page }) {
  // If there is no page content, show a 404 error
  if (!page) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{page?.data?.title || 'Home'}</title>
      </Head>
      {/* Render the Builder page content */}
      <BuilderComponent model="page" content={page} />
    </>
  );
}
