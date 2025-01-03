'use client';

import { ThemeProvider } from 'next-themes';
import { ComponentProps, useEffect, useState } from 'react';

export default function NextThemeProvider({ children, ...props }: ComponentProps<typeof ThemeProvider>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  return mounted && <ThemeProvider {...props}>{children}</ThemeProvider>;
}
