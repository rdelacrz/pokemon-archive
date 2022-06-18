import { FC } from 'react';
import { MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';

interface HeaderProps {
  urlPathname: string;
}

export const Header: FC<HeaderProps> = ({ urlPathname }) => {
  const tabMenuModel: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      url: '/',
    },
    {
      label: 'Search',
      icon: 'pi pi-search',
      url: '/search',
    },
  ];
  const activeIndex = tabMenuModel.findIndex(item =>
    item.url === '/'
      ? urlPathname === '/'
      : item.url?.startsWith(urlPathname)
  );
  return (
    <header>
      <TabMenu model={tabMenuModel} activeIndex={activeIndex} />
    </header>
  );
}

export default Header;