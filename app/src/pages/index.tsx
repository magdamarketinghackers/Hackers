import { builder, BuilderComponent } from '@builder.io/react';
import { GetStaticProps } from 'next';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

export const getStaticProps: GetStaticProps = async () => {
  // Pobierz treść strony głównej z Builder.io
  const content = await builder.get('homepage').toPromise();

  return {
    props: {
      content: content || null,
    },
  };
};

interface HomePageProps {
  content: any; // Możesz zdefiniować typ tutaj, jeśli znasz strukturę danych z Builder.io
}

const HomePage: React.FC<HomePageProps> = ({ content }) => {
  return (
    <div>
      {/* Renderuj BuilderComponent z treścią strony głównej */}
      <BuilderComponent content={content} model="homepage" />
    </div>
  );
};

export default HomePage;