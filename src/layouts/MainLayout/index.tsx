import { PropsWithChildren } from 'react';
import Header from '@/components/layout/Header';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      {children}
      {/* TODO: add footer */}
    </div>
  );
}
