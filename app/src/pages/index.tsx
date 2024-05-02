import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Sprawdzamy, czy użytkownik jest na stronie głównej
    if (router.pathname === '/') {
      // Jeśli tak, przekierowujemy go na /saltic
      router.push('/saltic');
    }
  }, [router.pathname]); // Efekt zostanie wykonany za każdym razem, gdy zmieni się ścieżka URL

  return null; // Możesz zwrócić null lub inny komponent, strona będzie przekierowana zanim cokolwiek zostanie wyrenderowane
};

export default Home;