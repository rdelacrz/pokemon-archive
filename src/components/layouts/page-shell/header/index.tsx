import { FC, MouseEvent, useEffect, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';
import { userService } from '~/services';
import { useAppDataContext, useWindowSize } from '~/utils';

import imageSrc from '~/assets/logos/poke-archive-logo.png';

import './styles.scss';

interface HeaderProps {
  urlPathname: string;
  onHeightUpdate: (height: number) => void;
  onLoginClick: VoidFunction;
}

export const Header: FC<HeaderProps> = ({ urlPathname, onHeightUpdate, onLoginClick }) => {
  const { isLoggedIn, username, clearLoginData, setUsername } = useAppDataContext();

  // Removes JWT token from cookies via logout and clears login data from storage
  const { mutateAsync: logout, isLoading: isLoggingOut } = useMutation(
    'logout',
    userService.logout,
    {
      onSuccess: clearLoginData,
    }
  );

  // Syncs displayed username with username in database
  const { data: user } = useQuery(
    'getUserData',
    userService.getUserData,
    {
      enabled: isLoggedIn && !isLoggingOut,
      onSuccess: (user) => {
        // Ensures that username isn't set while user is already logging out
        if (!isLoggingOut) {
          setUsername(user.username);
        }
      },
    }
  );


  /* Reference variables */
  const menuRef = useRef<Menu>(null);
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

  const handleEditUser = (event: MouseEvent<HTMLButtonElement>) => {
    menuRef.current?.toggle(event);
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

  // Fallbacks on username in local storage if updated one from server doesn't load
  const displayedUsername = user?.username || username;

  return (
    <header className='header-wrapper' ref={headerRef}>
      <div className='navbar-wrapper container'>
        <Image className='site-logo' src={imageSrc} alt='Pokemon Archive Logo' width='200px' />
        <div className='tab-wrapper'>
          <TabMenu model={tabMenuModel} activeIndex={activeIndex} />
          <div className='user-actions-wrapper'>
            {isLoggedIn ? (
              <>
                <div className='user-avatar-container'>
                  <Avatar icon='pi pi-user' shape='circle' />
                </div>
                <div className='username-menu-trigger-wrapper'>
                  <div className='username'>{displayedUsername}</div>
                  <Button
                    id='editUserMenuTrigger'
                    className='p-button-text'
                    icon='pi pi-caret-down'
                    label='Edit User'
                    aria-controls='editUserMenu'
                    onClick={handleEditUser}
                  />
                </div>
                <Menu
                  id='editUserMenu'
                  model={[
                    {
                      label: 'Edit Profile',
                    },
                    {
                      label: 'Log Out',
                      command: () => logout(),
                    },
                  ]}
                  popup
                  ref={menuRef}
                />
              </>
            ) : (
              <Button
                id='loginModalTrigger'
                icon='pi pi-sign-in'
                className='p-button-outlined'
                label='Log In'
                onClick={onLoginClick}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;