'use client';
import React from 'react';
import Form, { EFormType } from '@/components/common/Form/Form';
import { Form as AntForm, Input, Typography } from 'antd';
import { REGEX_EMAIL } from '@/common/utils/string';
import Button, { EButtonTheme } from '@/components/common/Button/Button';
import { ForgotPasswordStyle } from '@/app/auth/forgot-password/forgot-password.style';
import { authService } from '@/services/auth.service';
import { LOGIN } from '@/common/constants/path.constant';
import Link, { ELinkType } from '@/components/common/Link/Link';

const { Item } = AntForm;

export interface IForgotPassword {
  email: string;
}

const ForgotPasswordPage = () => {
  const onFinish = async (data: any) => {
    await authService.forgotPassword(data.email);
  };
  return (
    <ForgotPasswordStyle>
      <Form
        className={'form-forgot-password'}
        type={EFormType.PRIMARY}
        layout={'vertical'}
        onFinish={onFinish}
      >
        <Item>
          <Typography.Title level={3}>Reset your password</Typography.Title>
          <Typography.Text>
            Enter the email you signed up with. We&apos;ll send you a link to log in and reset your password.{' '}
          </Typography.Text>
        </Item>
        <Item<IForgotPassword>
          label={'Email'}
          required={true}
          name={'email'}
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
            },
            {
              pattern: REGEX_EMAIL,
              message: 'Username must be in email format',
            },
          ]}
        >
          <Input />
        </Item>
        <div className={'flex flex-row gap-8'}>
          <Item>
            <Button type={'primary'} htmlType={'submit'} color={EButtonTheme.PRIMARY}>
              Submit
            </Button>
          </Item>
          <Item>
            <Link hasUnderline={false} type={ELinkType.SECONDARY} href={LOGIN}>
              <Button type={'primary'} color={EButtonTheme.SECONDARY}>
                Back to login
              </Button>
            </Link>
          </Item>
        </div>
      </Form>
    </ForgotPasswordStyle>
  );
};

export default ForgotPasswordPage;
