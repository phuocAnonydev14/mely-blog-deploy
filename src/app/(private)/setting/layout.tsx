import { PropsWithChildren } from 'react';
import SettingLayout from '@/layouts/SettingLayoyt/SettingLayout';

export default function SettingLayoutPage({ children }: PropsWithChildren) {
  return <SettingLayout>{children}</SettingLayout>;
}
