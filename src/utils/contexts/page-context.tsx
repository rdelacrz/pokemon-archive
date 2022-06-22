// `usePageContext` allows us to access `pageContext` in any React component.
// More infos: https://vite-plugin-ssr.com/pageContext-anywhere

import { createContext, ReactNode, useContext } from 'react';

type PageProps = {};

// The `pageContext` that are available in both on the server-side and browser-side
type PageContext = {
  Page: (pageProps: PageProps) => React.ReactElement;
  pageExports: { documentProps?: { title: string } };
  pageProps: PageProps;
  urlPathname: string;
  documentProps?: {
    title?: string;
    description?: string;
  }
}

const Context = createContext<PageContext>(undefined as any);

function PageContextProvider({ pageContext, children }: { pageContext: PageContext; children: ReactNode }) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

function usePageContext() {
  const pageContext = useContext(Context);
  return pageContext;
}

export { PageProps, PageContext, PageContextProvider, usePageContext };