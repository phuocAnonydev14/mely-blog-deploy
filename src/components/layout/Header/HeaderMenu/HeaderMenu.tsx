'use client';

import { MenuOutlined } from '@ant-design/icons';
import { Dropdown, Flex, MenuProps } from 'antd';
import HeaderMenuStyle from '@/components/layout/Header/HeaderMenu/HeaderMenu.style';

// TODO: Create a wrapper component for Ant Design's Dropdown component
const items: MenuProps['items'] = [
  {
    label: (
      <Flex align='center' gap={10}>
        <p className='header-menu-username'>Username</p>
      </Flex>
    ),
    key: 'profile',
  },
  {
    type: 'divider',
  },
  {
    label: 'Settings',
    key: 'settings',
  },
  {
    label: 'Help',
    key: 'help',
  },
  {
    type: 'divider',
  },
  {
    label: 'Log out',
    key: 'logout',
  },
];

export default function HeaderMenu() {
  return (
    <HeaderMenuStyle>
      <Dropdown menu={{ items }} trigger={['click']} placement='bottomRight' arrow>
        <MenuOutlined size={20} />
      </Dropdown>
    </HeaderMenuStyle>
  );
}
