import React from "react";
import { BuilderComponent, builder } from "@builder.io/react";
import { BuilderContent } from "@builder.io/sdk";
// Define the Home component with proper TypeScript typing
function Home({ page }: { page: BuilderContent | null }) {
  return (
    <>
      {page ? (
        <BuilderComponent model="page" content={page} />
      ) : (
        <div>Page is loading or does not exist...</div>
      )}
    </>
  );
}


export async function getStaticProps() {
  const page = await builder.get('page', { url: '/' }).promise();

  return {
    props: { page: page || null },
    revalidate: 5,
    fallback: 'blocking'
  };
}

export default Home;
