import { PageContext } from '~/utils/contexts/page-context';

export function getPageTitle(pageContext: PageContext): string {
  const title =
    // For static titles (defined in the `export { documentProps }` of the page's `.page.js`)
    (pageContext.pageExports.documentProps || {}).title ||
    // For dynamic titles (defined in the `export addContextProps()` of the page's `.page.server.js`)
    (pageContext.documentProps || {}).title ||
    'Pokemon Archive'
  return title
}
