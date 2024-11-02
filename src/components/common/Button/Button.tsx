'use client';

import { Button as AntButton } from 'antd';
import { ComponentProps } from 'react';
import clsx from 'clsx';
import { ButtonStyle } from '@/components/common/Button/button.style';

export enum EButtonTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DEFAULT = 'default',
}

export interface IButtonProps extends ComponentProps<typeof AntButton> {
  color?: any;
}

export default function Button({
  type = 'primary',
  color = EButtonTheme.DEFAULT,
  className,
  children,
  ...rest
}: IButtonProps) {
  const clsName = clsx(color, className, `type-${type}`) as string;
  return (
    // @ts-ignore
    <ButtonStyle className={clsName} type={type} {...rest}>
      {children}
    </ButtonStyle>
  );
}
