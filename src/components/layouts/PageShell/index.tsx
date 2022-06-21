import React, { FC, PropsWithChildren } from 'react';
import { PageContextProvider } from '~/contexts/usePageContext';
import type { PageContext } from '~/types';
import Header from './Header';

import './styles.scss';

interface PageShellProps {
  pageContext: PageContext;
}

export const PageShell: FC<PropsWithChildren<PageShellProps>> = ({ children, pageContext }) => {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Header urlPathname={pageContext.urlPathname} />
        <div>
          {children}
        </div>
      </PageContextProvider>
    </React.StrictMode>
  )
}
