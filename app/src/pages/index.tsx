// pages/index.tsx
import React from "react";
import { BuilderComponent, builder } from '@builder.io/react';
import { BuilderContent } from '@builder.io/sdk';
import { GetStaticProps } from "next";

// Inicjalizacja klucza API Builder.io
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Funkcja getStaticProps do pobrania zawartości strony głównej
export const getStaticProps: GetStaticProps = async () => {
  const homepage = await builder.get('homepage').toPromise();

  return {
    props: {
      homepage: homepage || null,
    },
  };
};

// Komponent strony głównej
export default function HomePage({ homepage }: { homepage: BuilderContent | null }) {
  return (
    <>
      <BuilderComponent model="homepage" content={homepage} />
    </>
  );
}
