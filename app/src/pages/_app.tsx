import "@/styles/globals.css";
import { Playfair_Display } from '@next/font/google';
import type { AppProps } from "next/app";

const playfairDisplay = Playfair_Display({
  weight: ['400'],
  style: ['italic'],
  subsets: ['latin'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html, body {
          font-family: ${playfairDisplay.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

