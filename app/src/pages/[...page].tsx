import React from "react";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { BuilderContent } from "@builder.io/sdk";
import { GetServerSideProps } from "next";
import "../builder-registry";
import '@builder.io/widgets';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const urlPath = params?.page ? "/" + (params.page as string[]).join("/") : "/";
  const host = req.headers.host;

  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath,
        domain: host,
      },
    })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
  };
};

export default function Page({ page }: { page: BuilderContent | null }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();
  const title = page?.data?.title || "Default Meta Title";
  const description = page?.data?.description || "Default Meta Description";
  const keywords = page?.data?.keywords || "Default Meta Keywords";
  const image = page?.data?.image;

  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <link rel="icon" href={page?.data?.favicon} type="image/x-icon" />
      </Head>
      <BuilderComponent model="page" content={page || undefined} />
    </>
  );
}
