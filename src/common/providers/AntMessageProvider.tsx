'use client';

import AntMessageContext from '@/common/contexts/AntMessageContext';
import { message } from 'antd';
import { PropsWithChildren } from 'react';

export default function AntMessageProvider({ children }: PropsWithChildren) {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <AntMessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </AntMessageContext.Provider>
  );
}
