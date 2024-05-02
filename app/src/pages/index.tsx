import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Home = () => {
  const router = useRouter();
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Pobieramy zawartość tylko wtedy, gdy ścieżka URL jest równa '/'
        if (router.pathname === '/') {
          const response = await axios.get('/api/saltic');
          setContent(response.data.content);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        // Obsługa błędu
      }
    };

    fetchContent();
  }, [router.pathname]); // Wywołujemy fetchContent() tylko wtedy, gdy zmienia się ścieżka URL

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default Home;
