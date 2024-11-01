import { PropsWithChildren } from 'react';
import MainLayout from '@/layouts/MainLayout';

export default function MainLayoutPage({ children }: PropsWithChildren) {
  return <MainLayout>{children}</MainLayout>;
}
