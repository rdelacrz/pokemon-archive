import React, { FC, PropsWithChildren, useState } from 'react';
import type { PageContext } from '~/types';
import { PageContextProvider } from '~/utils/contexts/usePageContext';
import Header from './header';

import './styles.scss';

interface PageShellProps {
  pageContext: PageContext;
}

export const PageShell: FC<PropsWithChildren<PageShellProps>> = ({ children, pageContext }) => {
  const [paddingTop, setPaddingTop] = useState(65);
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Header urlPathname={pageContext.urlPathname} onHeightUpdate={setPaddingTop} />
        <div className='container' style={{ paddingTop }}>
          {children}
        </div>
      </PageContextProvider>
    </React.StrictMode>
  );
}
