import { BuilderComponent, builder } from '@builder.io/react';

require('dotenv').config();

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

function Home({ page }) {
  return (
    <>
      {page ? (
        <BuilderComponent model="page" content={page} />
      ) : null}
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
