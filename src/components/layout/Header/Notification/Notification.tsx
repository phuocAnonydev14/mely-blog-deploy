'use client';

import { Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import NotificationStyle from '@/components/layout/Header/Notification/Notification.style';
import Button, { EButtonTheme } from '@/components/common/Button/Button';

export default function Notification() {
  return (
    <NotificationStyle>
      <Badge count={5} size='small'>
        <Button
          color={EButtonTheme.DEFAULT}
          icon={<BellOutlined style={{ fontSize: '2rem' }} />}
          shape='circle'
          type='text'
        />
      </Badge>
    </NotificationStyle>
  );
}
