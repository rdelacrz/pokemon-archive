import { FC } from 'react';
import { TabMenu } from 'primereact/tabmenu';

export const Header: FC<{}> = () => {
  return (
    <header>
      <TabMenu
        model={[
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
        ]}
      />
    </header>
  );
}

export default Header;