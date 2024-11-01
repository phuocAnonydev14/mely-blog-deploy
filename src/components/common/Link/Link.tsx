'use client';
import { ComponentProps } from 'react';
import clsx from 'clsx';
import NextLink from 'next/link';
import { LinkStyle } from '@/components/common/Link/link.style';

export enum ELinkType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DEFAULT = 'default',
}

export interface ILinkProps extends ComponentProps<typeof NextLink> {
  type?: ELinkType;
  hasUnderline?: boolean;
}

export default function Link({
  type = ELinkType.DEFAULT,
  children,
  className,
  hasUnderline = false,
  ...rest
}: ILinkProps) {
  const clsName = clsx(type, className) as string;
  return (
    // @ts-ignore
    <LinkStyle style={{ textDecoration: hasUnderline ? 'underline' : 'none' }} className={clsName} {...rest}>
      {children}
    </LinkStyle>
  );
}
