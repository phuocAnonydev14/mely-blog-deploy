import { PropsWithChildren } from 'react';

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <div>ProfileLayout</div>
      {children}
    </div>
  );
}
