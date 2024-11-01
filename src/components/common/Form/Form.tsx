'use client';
import { Form as AntForm } from 'antd';
import { ComponentProps } from 'react';
import { FormStyle } from '@/components/common/Form/form.style';
import clsx from 'clsx';

export enum EFormType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export interface IButtonProps extends ComponentProps<typeof AntForm> {
  type: EFormType;
}

export default function Form({ type = EFormType.PRIMARY, children, className, ...rest }: IButtonProps) {
  const clsName = clsx(type, className) as string;
  return (
    // @ts-ignore
    <FormStyle className={clsName} {...rest}>
      {children}
    </FormStyle>
  );
}
