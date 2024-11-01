'use client';
import React, { useEffect, useState } from 'react';
import { Form as AntForm, Input, Typography } from 'antd';
import Form, { EFormType } from '@/components/common/Form/Form';
import Button, { EButtonTheme } from '@/components/common/Button/Button';
import Divider from '@/components/common/Divider/Divider';
import { ButtonGroup } from '@/components/page/auth/ButtonGroup/ButtonGroup';
import Link, { ELinkType } from '@/components/common/Link/Link';
import { FormLoginRegisterStyle } from '@/components/page/auth/FormLoginRegister/form-login-register.style';
import { LOGIN, REGISTER } from '@/common/constants/path.constant';
import { REGEX_EMAIL } from '@/common/utils/string';
import { authService } from '@/services/auth.service';
import { EAuthProvider } from '@/common/enums/app.enum';
import { LoadingOutlined } from '@ant-design/icons';

const { Item } = AntForm;

export interface IFormLoginRegister {
  username: string;
  password: string;
  retypePassword?: string;
}

const FormLoginRegister = ({
  url,
  currentUrl,
  isModal,
}: {
  url: string;
  currentUrl?: string;
  isModal?: boolean;
}) => {
  const [isLogin, setIsLogin] = useState(url === LOGIN);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState({
    title: 'Login to Mely Blog',
    btn: 'Login',
    text: "Don't have an account?",
    navigateText: 'Register',
    navigateUrl: REGISTER,
  });

  useEffect(() => {
    switch (url) {
      case REGISTER:
        setContent({
          title: 'Register an account',
          btn: 'Register',
          text: 'Already have an account?',
          navigateText: 'Login',
          navigateUrl: LOGIN,
        });
        setIsLogin(false);
        break;
      case LOGIN:
        setContent(content);
        setIsLogin(true);
        break;
    }
  }, [url]);

  const onFinish = async (form: any) => {
    setIsLoading(true);
    if (url === LOGIN) {
      await authService.signIn(
        {
          provider: EAuthProvider.DEFAULT,
          form: {
            username: form.username,
            password: form.password,
          },
        },
        currentUrl,
      );
    } else {
      await authService.signUpWithUsernamePassword({
        provider: EAuthProvider.DEFAULT,
        form: {
          username: form.username,
          password: form.password,
        },
      });
    }
    setIsLoading(false);
  };

  return (
    <FormLoginRegisterStyle $height={isModal ? 'auto' : '100dvh'}>
      <Form layout={'vertical'} className={'form-login'} type={EFormType.PRIMARY} onFinish={onFinish}>
        <Typography.Title level={3} className={'flex justify-center'}>
          {content.title}
        </Typography.Title>
        <Item>
          <ButtonGroup />
        </Item>
        <Divider lineColor={'#ffffff'} textColor={'#ffffff'}>
          or
        </Divider>
        <Item<IFormLoginRegister>
          name={'username'}
          label={'Username'}
          required={true}
          rules={[
            {
              required: true,
              message: 'Please enter your username!',
            },
            {
              pattern: REGEX_EMAIL,
              message: 'Username must be in email format',
            },
          ]}
        >
          <Input></Input>
        </Item>
        <Item<IFormLoginRegister>
          name={'password'}
          label={'Password'}
          required={true}
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
            {
              min: 8,
              message: 'Password must be greater than 8 characters',
            },
          ]}
        >
          <Input.Password></Input.Password>
        </Item>
        {!isLogin && (
          <Item<IFormLoginRegister>
            name={'retypePassword'}
            label={'Retype Password'}
            required={true}
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
              {
                min: 8,
                message: 'Password must be greater than 8 characters',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password></Input.Password>
          </Item>
        )}
        {isLogin && (
          <Link className={'link-common'} href={'/auth/forgot-password'} type={ELinkType.PRIMARY}>
            Forgot password
          </Link>
        )}
        <Button htmlType='submit' className={'btn-submit'} color={EButtonTheme.PRIMARY}>
          {content.btn}
          {isLoading && <LoadingOutlined />}
        </Button>
        <Divider lineColor={'rgba(255,255,255,0.6)'} textColor={'#ffffff'}></Divider>
        <div className={'flex link-common'}>
          {content.text}&nbsp;
          <Link href={content.navigateUrl} type={ELinkType.PRIMARY}>
            {content.navigateText}
          </Link>
          &nbsp;now!
        </div>
      </Form>
    </FormLoginRegisterStyle>
  );
};

export default FormLoginRegister;
