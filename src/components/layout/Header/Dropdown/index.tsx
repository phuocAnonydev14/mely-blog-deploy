import React from 'react';
import Link from '@/components/common/Link/Link';
import Icon from '@mdi/react';
import { mdiBadgeAccount, mdiCog, mdiLogout } from '@mdi/js';
import { ABOUT_ME } from '@/common/constants/path.constant';
import { MenuProps } from 'antd';
import DropDownCommon from '@/components/common/Dropdown';
import { authService } from '@/services/auth.service';
import { useMediaQuery } from 'usehooks-ts';
import { breakpoints } from '@/common/constants/constants';
import { EToken } from '@/common/enums/app.enum';
import { UserAvatar } from '@/components/layout/Header';
import { getCookie } from 'cookies-next';

const Dropdown = () => {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md})`);
  const userId = getCookie(EToken.USER_ID);
  const menuDropdown: MenuProps = {
    items: [
      {
        key: '1',
        label: <Link href={userId || ''}>My Profile</Link>,
        icon: <Icon path={mdiBadgeAccount} size={1} />,
      },
      {
        key: '2',
        label: <Link href={ABOUT_ME}>Setting</Link>,
        icon: <Icon path={mdiCog} size={1} />,
      },
      {
        key: '3',
        label: (
          <Link
            onClick={async () => {
              await authService.signOut();
            }}
            href={'/'}
          >
            Logout
          </Link>
        ),
        icon: <Icon path={mdiLogout} size={1} />,
      },
    ],
  };

  return (
    <DropDownCommon
      placement={'bottomRight'}
      overlayStyle={isMobile ? { width: '100vw', right: 0, zIndex: 10000 } : { zIndex: 10000 }}
      trigger={['click']}
      menu={menuDropdown}
    >
      <UserAvatar />
    </DropDownCommon>
  );
};
export default Dropdown;
