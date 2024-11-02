'use client';

import { PropsWithChildren, useEffect } from 'react';
import { LOGIN } from '@/common/constants/path.constant';
import { ENotification } from '@/common/utils/notification.util';
import { notification } from 'antd';
import Header from '@/components/layout/Header';
import useUser from '@/hooks/useUser';

export default function PrivateLayout({ children }: PropsWithChildren) {
  const { isLoggedIn, isLoading } = useUser();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      api.open({ type: ENotification.WARNING, message: 'You must login to use this service' });
      window.location.href = LOGIN;
      return;
    }
  }, [api, isLoading, isLoggedIn]);

  return (
    <div>
      {contextHolder}
      <Header />
      {children}
    </div>
  );
}
