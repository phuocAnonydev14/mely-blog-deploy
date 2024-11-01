'use client';
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function NextThemeProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  return mounted && <ThemeProvider>{children}</ThemeProvider>;
}
