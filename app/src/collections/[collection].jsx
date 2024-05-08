// pages/collections/[collection].jsx
import { BuilderComponent, builder } from '@builder.io/react';

// Replace with your Public API Key.
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export async function getStaticProps({ params }) {
  const homepage = await builder.get('homepage').toPromise();

  return {
    props: {
      homepage: homepage || null,
    },
  };
}

export default function Page({ homepage }) {
  return (
    <>
      {/* Put your header here. */}
      <YourHeader />
      <BuilderComponent model="homepage" content={homepage} />
      {/* Put your footer here. */}
      <YourFooter />
    </>
  );
}