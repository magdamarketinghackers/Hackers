import React, { useEffect } from "react";
import Script from 'next/script';

interface ScriptType {
  scriptContent?: string;
  scriptURL?: string;
}

interface CustomScriptLoaderProps {
  scripts: ScriptType[];
}

const CustomScriptLoader: React.FC<CustomScriptLoaderProps> = ({ scripts }) => {
  useEffect(() => {
    scripts.forEach(script => {
      if (script.scriptContent) {
        const scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.innerHTML = script.scriptContent;
        document.body.appendChild(scriptTag);
      }
      if (script.scriptURL) {
        // Załadowanie skryptu z URL
        const scriptTag = document.createElement('script');
        scriptTag.src = script.scriptURL;
        document.body.appendChild(scriptTag);
      }
    });
  }, [scripts]);

  return (
    <>
      {scripts.map((script, index) =>
        script.scriptURL ? (
          <Script key={index} src={script.scriptURL} strategy="afterInteractive" />
        ) : null
      )}
    </>
  );
};

export default CustomScriptLoader;
