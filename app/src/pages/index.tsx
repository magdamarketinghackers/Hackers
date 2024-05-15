import { builder, BuilderComponent } from '@builder.io/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export const getStaticProps: GetStaticProps = async () => {
  // Pobierz treść strony o nazwie "nutta" z Builder.io
  const content = await builder.get('page', { url: '/nutta' }).toPromise();

  return {
    props: {
      content: content || null,
    },
    // Revalidate the content every 5 seconds
    revalidate: 5,
  };
};

interface HomePageProps {
  content: any; // Typ może być bardziej szczegółowy, zależnie od struktury treści
}

const HomePage: React.FC<HomePageProps> = ({ content }) => {
  const title = content?.data?.title || 'Strona Główna';
  const description = content?.data?.description || 'Opis strony głównej';
  const image = content?.data?.image || '/default-image.png'; // domyślny obraz, jeśli nie ma w treści

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={content?.data?.keywords || 'strona, główna, nutta'} />
        
        {/* Open Graph meta tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        
        {/* Ładowanie favicony z CMS jeśli dostępna, inaczej domyślna */}
        <link rel="icon" href={content?.data?.favicon || '/default-favicon.ico'} type="image/x-icon" />
      </Head>
      {/* Renderuj BuilderComponent z treścią strony "nutta" */}
      <BuilderComponent content={content} model="page" />
    </div>
  );
};

export default HomePage;
