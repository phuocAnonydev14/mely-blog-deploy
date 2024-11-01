'use client';

import { Card, Dropdown, MenuProps } from 'antd';
import { EllipsisOutlined, FlagOutlined, InfoCircleOutlined, SettingOutlined } from '@ant-design/icons';
import AdvertisementStyle from './Advertisement.style';
import Link from 'next/link';

const advertisementMenu: MenuProps['items'] = [
  {
    key: '1',
    label: <Link href=''>Why am I seeing this ad?</Link>,
    icon: <InfoCircleOutlined />,
  },
  {
    key: '2',
    label: <Link href=''>Ads preferences</Link>,
    icon: <SettingOutlined />,
  },
  {
    type: 'divider',
  },
  {
    // TODO: Setup a route for reporting advertisement
    key: '3',
    label: <Link href=''>Report advertisement</Link>,
    icon: <FlagOutlined />,
    danger: true,
  },
];

export default function Advertisement() {
  return (
    <AdvertisementStyle>
      <Card
        title='Advertisement'
        extra={
          <Dropdown placement='bottomRight' menu={{ items: advertisementMenu }}>
            <EllipsisOutlined />
          </Dropdown>
        }
        className='advertisement'
        // TODO: Add advertisement content
      ></Card>
    </AdvertisementStyle>
  );
}
