'use client';

import React from 'react';
import Button, { EButtonTheme } from '@/components/common/Button/Button';
import { PlusOutlined } from '@ant-design/icons';
import SignUpButton from '@/components/common/Button/SignUpButton';
import LoginButton from '@/components/common/Button/LoginButton';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';
import { breakpoints } from '@/common/constants/constants';
import { BtnActionGroupStyle } from '@/components/layout/Header/BtnActionGroup/btn-action-group.style';
import { Notification } from '@/components/layout/Header';
import Dropdown from '@/components/layout/Header/Dropdown';
import useUser from '@/hooks/useUser';

export default function BtnActionGroup() {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md})`);

  if (isLoading) {
    return <></>;
  }

  if (!isLoggedIn) {
    return (
      <BtnActionGroupStyle gap={10} justify='end' align='center'>
        <SignUpButton />
        <LoginButton />
      </BtnActionGroupStyle>
    );
  }

  return (
    <BtnActionGroupStyle gap={20} justify='end' align='center'>
      <Button
        color={EButtonTheme.SECONDARY}
        type='default'
        icon={<PlusOutlined />}
        onClick={() => router.push('/blog/create')}
      >
        {!isMobile && 'Create post'}
      </Button>
      <Notification />
      <Dropdown />
    </BtnActionGroupStyle>
  );
}
