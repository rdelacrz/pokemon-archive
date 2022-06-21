// `usePageContext` allows us to access `pageContext` in any React component.
// More infos: https://vite-plugin-ssr.com/pageContext-anywhere

import { createContext, ReactNode, useContext } from 'react';
import type { PageContext } from '~/types';

const Context = createContext<PageContext>(undefined as any);

function PageContextProvider({ pageContext, children }: { pageContext: PageContext; children: ReactNode }) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

function usePageContext() {
  const pageContext = useContext(Context);
  return pageContext;
}

export { PageContextProvider, usePageContext };