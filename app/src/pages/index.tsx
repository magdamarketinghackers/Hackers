import { builder, BuilderComponent } from '@builder.io/react';
import { GetStaticProps } from 'next';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export const getStaticProps: GetStaticProps = async () => {
  // Pobierz treść strony głównej z Builder.io
  const content = await builder.get('nutta').toPromise();

  return {
    props: {
      content: content || null,
    },
    revalidate: 5,
  };
};

interface HomePageProps {
  content: any; // 
}

const HomePage: React.FC<HomePageProps> = ({ content }) => {
  const title = page?.data?.title || "Default Meta Title";
  const description = page?.data?.description || "Default Meta Description";
  const keywords = page?.data?.keywords || "Default Meta Keywords";
  const image = page?.data?.image;
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
      <BuilderComponent model="page" content={content} />
    </>
   
  );
};

export default HomePage;

