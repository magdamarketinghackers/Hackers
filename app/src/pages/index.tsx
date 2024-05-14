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
 
  return (
    <div>
      <BuilderComponent model="page" content={content} />
    <div/>
   
  );
};

export default HomePage;
