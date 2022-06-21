import ReactDOM from 'react-dom/client';
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client';
import { useClientRouter } from 'vite-plugin-ssr/client/router';
import { PageShell } from '~/components/layouts/page-shell';
import type { PageContext } from '~/types';
import { getPageTitle } from './getPageTitle';

let root: ReactDOM.Root;
const { hydrationPromise } = useClientRouter({
  render(pageContext: PageContextBuiltInClient & PageContext) {
    const { Page, pageProps } = pageContext;
    const page = (
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>
    )
    const container = document.getElementById('page-view')!;
    if (pageContext.isHydration) {
      root = ReactDOM.hydrateRoot(container, page);
    } else {
      if (!root) {
        root = ReactDOM.createRoot(container);
      }
      root.render(page);
    }
    document.title = getPageTitle(pageContext);
  },
  prefetchLinks: true,
});
