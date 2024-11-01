import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import Layout from '@/layouts/AuthLayout/AuthLayout';

export const metadata: Metadata = {
  title: 'Auth Page',
  description: '',
};

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return <Layout>{children}</Layout>;
}
