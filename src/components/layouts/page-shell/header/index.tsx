import { FC, useEffect, useRef } from 'react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';
import { useAppDataContext, useWindowSize } from '~/utils';

import imageSrc from '~/assets/logos/poke-archive-logo.png';

import './styles.scss';

interface HeaderProps {
  urlPathname: string;
  onHeightUpdate: (height: number) => void;
  onLoginClick: VoidFunction;
}

export const Header: FC<HeaderProps> = ({ urlPathname, onHeightUpdate, onLoginClick }) => {
  const { isLoggedIn } = useAppDataContext();
  const headerRef = useRef<HTMLElement>(null);

  // Sends updated header height to parent component every time window width is updated
  const { width } = useWindowSize();
  useEffect(() => {
    if (headerRef.current) {
      const newHeaderHeight = headerRef.current.getBoundingClientRect().height;
      onHeightUpdate(newHeaderHeight);
    }
  }, [width]);

  /* Functions */

  const handleLogin = () => {
    if (!isLoggedIn) {
      onLoginClick();
    }
  }

  /* Regular variables */

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
    <header className='header-wrapper' ref={headerRef}>
      <div className='navbar-wrapper container'>
        <Image className='site-logo' src={imageSrc} alt='Pokemon Archive Logo' width='200px' />
        <div className='tab-wrapper'>
          <TabMenu model={tabMenuModel} activeIndex={activeIndex} />
          <div className='button-container'>
            <Button
              icon='pi pi-user'
              className='p-button-rounded p-button-primary'
              aria-label='Login'
              onClick={handleLogin}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;