import ReactDOM from 'react-dom/client';
import React from 'react';
import { getPage } from 'vite-plugin-ssr/client';
import { PageShell } from '~/components/layouts/PageShell';
import type { PageContext } from '~/types';
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client';

hydrate();

async function hydrate() {
  // We do Server Routing, but we can also do Client Routing by using `useClientRouter()`
  // instead of `getPage()`, see https://vite-plugin-ssr.com/useClientRouter
  const pageContext = await getPage<PageContextBuiltInClient & PageContext>()
  const { Page, pageProps } = pageContext

  const container = document.getElementById('page-view');
  if (container) {
    ReactDOM.hydrateRoot(
      container,
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>,
    );
  }
}
