import { PropsWithChildren } from 'react';
import PrivateLayout from '@/layouts/PrivateLayout/PrivateLayout';

export default function PrivateLayoutPage({ children }: PropsWithChildren) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
