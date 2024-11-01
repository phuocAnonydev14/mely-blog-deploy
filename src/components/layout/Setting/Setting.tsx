'use client';
import { SettingStyle } from '@/components/layout/Setting/setting.style';
import { useRouter } from 'next/navigation';
import Icon from '@mdi/react';
import { mdiAccountBox, mdiBellOutline, mdiCog, mdiSecurity } from '@mdi/js';

const getTabList = () => {
  return [
    {
      key: 'profile',
      label: (
        <div className={'item-tab flex items-center'}>
          <Icon path={mdiAccountBox} size={1.3} />
          My profile
        </div>
      ),
      access: true,
    },
    {
      key: 'customization',
      label: (
        <div className={'item-tab flex items-center'}>
          <Icon path={mdiCog} size={1.3} />
          Customization
        </div>
      ),
      access: true,
    },
    {
      key: 'security',
      label: (
        <div className={'item-tab flex items-center'}>
          <Icon path={mdiSecurity} size={1.3} />
          Security
        </div>
      ),
      access: true,
    },
    {
      key: 'notification',
      label: (
        <div className={'item-tab flex items-center'}>
          <Icon path={mdiBellOutline} size={1.3} />
          Notification
        </div>
      ),
      access: true,
    },
  ].filter((item) => item.access);
};
export default function Setting() {
  const route = useRouter();
  const onChange = (value: any) => {
    route.push(`/setting/${value}`);
  };
  return (
    <SettingStyle style={{ width: '100%' }} onChange={onChange} tabPosition={'left'} items={getTabList()} />
  );
}
