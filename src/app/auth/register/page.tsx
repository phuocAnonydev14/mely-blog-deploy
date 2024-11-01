'use client';
import React from 'react';
import FormLoginRegister from '@/components/page/auth/FormLoginRegister/FormLoginRegister';
import { REGISTER } from '@/common/constants/path.constant';

const RegisterPage = () => {
  return <FormLoginRegister url={REGISTER} />;
};

export default RegisterPage;
