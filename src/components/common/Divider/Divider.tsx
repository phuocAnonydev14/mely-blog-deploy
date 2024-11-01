'use client';

import { Divider as AntDivider } from 'antd';
import { ComponentProps } from 'react';
import clsx from 'clsx';
import { DividerStyle } from '@/components/common/Divider/divider.style';

export interface IButtonProps extends ComponentProps<typeof AntDivider> {
  textColor?: string;
  lineColor?: string;
}

export default function Divider({ textColor, lineColor, className, children, ...rest }: IButtonProps) {
  const clsName = clsx(className) as string;
  return (
    <DividerStyle className={clsName} style={{ color: textColor, borderColor: lineColor }} {...rest}>
      {children}
    </DividerStyle>
  );
}
