'use client';
import React from 'react';
import FormLoginRegister from '@/components/page/auth/FormLoginRegister/FormLoginRegister';
import { LOGIN } from '@/common/constants/path.constant';

const LoginPage = () => {
  return <FormLoginRegister url={LOGIN} />;
};

export default LoginPage;
