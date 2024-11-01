'use client';
import { AppProgressBar } from 'next-nprogress-bar';

export default function ProgressBarProvider() {
  return (
    <AppProgressBar
      height='4px'
      color='var(--yellow-primary)'
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
