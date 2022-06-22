import ReactDOMServer from 'react-dom/server';
import { PageShell } from '~/components/layouts/page-shell';
import { escapeInject, pipeNodeStream } from 'vite-plugin-ssr';
import { PageContext } from '~/utils/contexts/page-context';
import type { PageContextBuiltIn } from 'vite-plugin-ssr';

export { render };
  
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'documentProps'];

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const { Page, pageProps } = pageContext;

  const streamPipe = pipeNodeStream(writable => {
    // `writable` is a Node.js writable
    const stream = ReactDOMServer.renderToPipeableStream(
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>,
      {
        onShellReady() {
          stream.pipe(writable);
        },
      }
    );
  });

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext;
  const title = documentProps?.title || 'Pokemon Archive';
  const desc = documentProps?.description || 'Pokemon Data Archiving Application';

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${streamPipe}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  }
}

