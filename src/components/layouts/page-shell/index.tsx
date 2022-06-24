import React, { FC, PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppDataContextProvider, PageContext, PageContextProvider } from '~/utils/contexts';
import Header from './header';
import LoginModal from './login-modal';

import './styles.scss';

const queryClient = new QueryClient();

interface PageShellProps {
  pageContext: PageContext;
}

export const PageShell: FC<PropsWithChildren<PageShellProps>> = ({ children, pageContext }) => {
  const [paddingTop, setPaddingTop] = useState(65);
  const [loginPanelVisible, setLoginPanelVisible] = useState(false);
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <QueryClientProvider client={queryClient}>
          <AppDataContextProvider>
            <Header
              urlPathname={pageContext.urlPathname}
              onHeightUpdate={setPaddingTop}
              onLoginClick={() => setLoginPanelVisible(true)}
            />
            <div className='container' style={{ paddingTop }}>
              {children}
            </div>
            <LoginModal visible={loginPanelVisible} setVisible={setLoginPanelVisible} />
          </AppDataContextProvider>
        </QueryClientProvider>
      </PageContextProvider>
    </React.StrictMode>
  );
}
