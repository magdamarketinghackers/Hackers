
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useEffect, useState } from 'react';
import { builder, BuilderComponent } from '@builder.io/react';

// Konfiguruj klucz API Builder.io
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

const Home = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    // Pobierz zawartość dla '/saltic' z Builder.io
    builder.get('page', { url: '/saltic' })
      .promise()
      .then((page) => {
        setContent(page);
      });
  }, []);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <BuilderComponent model="page" content={content} />
  );
};

export default Home;
