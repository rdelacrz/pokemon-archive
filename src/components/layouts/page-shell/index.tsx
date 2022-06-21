import React, { FC, PropsWithChildren, useState } from 'react';
import type { PageContext } from '~/types';
import { PageContextProvider } from '~/utils/contexts/usePageContext';
import Header from './header';
import LoginSidePanel from './login-side-panel';

import './styles.scss';

interface PageShellProps {
  pageContext: PageContext;
}

export const PageShell: FC<PropsWithChildren<PageShellProps>> = ({ children, pageContext }) => {
  const [paddingTop, setPaddingTop] = useState(65);
  const [loginPanelVisible, setLoginPanelVisible] = useState(false);
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Header
          urlPathname={pageContext.urlPathname}
          onHeightUpdate={setPaddingTop}
          onLoginClick={() => setLoginPanelVisible(true)}
        />
        <div className='container' style={{ paddingTop }}>
          {children}
        </div>
        <LoginSidePanel visible={loginPanelVisible} setVisible={setLoginPanelVisible} />
      </PageContextProvider>
    </React.StrictMode>
  );
}
