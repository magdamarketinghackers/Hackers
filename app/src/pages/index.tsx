import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/saltic'); // Przekierowanie na stronę /saltic
  }, []); // Efekt wykona się tylko raz po pierwszym renderowaniu komponentu

  return null; // Możesz zwrócić null lub inny komponent, strona będzie przekierowana zanim cokolwiek zostanie wyrenderowane
};

export default Home;