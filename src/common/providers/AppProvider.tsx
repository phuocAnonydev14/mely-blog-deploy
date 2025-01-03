import { PropsWithChildren } from 'react';
import GlobalStyleProvider from '@/common/providers/GlobalStyleProvider';
import AntMessageProvider from '@/common/providers/AntMessageProvider';
import UserProvider from '@/common/providers/UserProvider';
import ProgressBarProvider from '@/common/providers/ProgressBarProvider';

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <GlobalStyleProvider>
      <UserProvider>
        <ProgressBarProvider />
        <AntMessageProvider>{children}</AntMessageProvider>
      </UserProvider>
    </GlobalStyleProvider>
  );
}
