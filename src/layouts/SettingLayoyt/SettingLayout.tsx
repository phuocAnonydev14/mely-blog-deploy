'use client';
import { ReactNode } from 'react';
import Setting from '@/components/layout/Setting/Setting';
import { Col } from 'antd';
import { SettingLayoutStyle } from '@/layouts/SettingLayoyt/setting-layout.style';

export default function SettingLayout({ children }: { children: ReactNode }) {
  return (
    <SettingLayoutStyle justify={'center'} align={'start'}>
      <Col span={6}>
        <Setting />
      </Col>
      <Col span={18}>{children}</Col>
    </SettingLayoutStyle>
  );
}
