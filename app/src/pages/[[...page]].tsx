import React, { useEffect } from "react";
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
    .get("nutta", {
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
  const pages = await builder.getAll("nutta", {
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
  const title = page?.data?.title || "Default Meta Title";
  const description = page?.data?.description || "Default Meta Description";
  const keywords = page?.data?.keywords || "Default Meta Keywords";
  const image = page?.data?.image;

  useEffect(() => {
    // Funkcja śledzenia kliknięcia w link
    function trackLinkClick(event: Event) {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' && target.classList.contains('track-click')) {
        builder.track('Link Click');
      }
    }

    // Funkcja śledzenia przesyłania formularza
    function trackFormSubmit(event: Event) {
      const target = event.target as HTMLElement;
      if (target.tagName === 'FORM' && target.classList.contains('track-submit')) {
        builder.track('Form Submission');
      }
    }

    // Dodaj słuchaczy zdarzeń do całego dokumentu
    document.addEventListener('click', trackLinkClick);
    document.addEventListener('submit', trackFormSubmit);

    // Usuń słuchaczy zdarzeń przy odmontowaniu komponentu
    return () => {
      document.removeEventListener('click', trackLinkClick);
      document.removeEventListener('submit', trackFormSubmit);
    };
  }, []);

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

        {/* Social Sharing Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        {/* Ładowanie favicony z CMS jeśli dostępna, inaczej domyślna */}
        <link rel="icon" href={page?.data?.favicon} type="image/x-icon" />
      </Head>
      <BuilderComponent model="nutta" content={page || undefined} />
    </>
  );
}
