import React from "react";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { BuilderContent } from "@builder.io/sdk";
import { GetStaticProps, GetStaticPaths } from "next";
import "../builder-registry";
import '@builder.io/widgets';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Define a function that fetches the Builder content for a given page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch the builder content for the given page
  const pagePath = "/" + ((params?.page as string[])?.join("/") || "");
  const page = await builder
    .get("macerat", {
      userAttributes: {
        urlPath: pagePath,
      },
    })
    .toPromise();

  // Return the page content as props
  return {
    props: {
      page: page || null,
    },
    // Revalidate the content every 5 seconds
    revalidate: 5,
  };
};

// Define a function that generates the static paths for all pages in Builder
export const getStaticPaths: GetStaticPaths = async () => {
  // Get a list of all pages in Builder
  const pages = await builder.getAll("macerat", {
    // We only need the URL field
    fields: "data.url",
    options: { noTargeting: true },
  });

  // Generate the static paths for all pages in Builder
  return {
    paths: pages
      .map((page) => String(page.data?.url))
      .filter((url) => url !== "/"),
    fallback: "blocking",
  };
};

// Define the Page component
export default function Page({ page }: { page: BuilderContent | null }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();
  const title = page?.data?.title;
  const description = page?.data?.description;
  const keywords = page?.data?.keywords;

  // If the page content is not available and not in preview mode, show a 404 error page
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  // If the page content is available, render the BuilderComponent with the page content
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Social Sharing Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        {/* Ładowanie favicony z CMS jeśli dostępna, inaczej domyślna */}
        <link rel="icon" href={page?.data?.favicon} type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
      </Head>
      <BuilderComponent model="macerat" content={page || undefined} /> 
    </>
  );
}
