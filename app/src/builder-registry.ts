import { builder, Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(
  dynamic(() => import("./components/Counter/Counter")),
  {
    name: "Counter",
    inputs: [
      {
        name: "initialCount",
        type: "number",
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/HeaderScriptLoader")),
  {
    name: "CustomScriptLoader",
    inputs: [
      {
        name: "scripts",
        type: "object",
        hideFromUI: true,
        meta: {
          ts: "ScriptType[]",
        },
        required: true,
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./pages/_app")),
  {
    name: "App",
    inputs: [
      {
        name: "__N_SSG",
        type: "boolean",
      },
      {
        name: "__N_SSP",
        type: "boolean",
      },
      {
        name: "Component",
        type: "string",
        meta: {
          ts: "NextComponentType<NextPageContext, any, any>",
        },
        required: true,
      },
      {
        name: "pageProps",
        type: "string",
        meta: {
          ts: "PageProps",
        },
        required: true,
      },
      {
        name: "router",
        type: "string",
        meta: {
          ts: "Router",
        },
        required: true,
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./pages/_document")),
  {
    name: "Document",
  }
);

Builder.registerComponent(
  dynamic(() => import("./pages")),
  {
    name: "HomePage",
    inputs: [
      {
        name: "page",
        type: "string",
        meta: {
          ts: "any",
        },
        required: true,
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./pages/[...page]")),
  {
    name: "Page",
    inputs: [
      {
        name: "page",
        type: "object",
        hideFromUI: true,
        meta: {
          ts: "BuilderContent",
        },
        required: true,
      },
    ],
  }
);
