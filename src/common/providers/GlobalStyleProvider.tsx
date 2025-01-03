'use client';
import { PropsWithChildren } from 'react';
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes';
import GlobalStyleContext from '@/common/contexts/GlobalStyleContext';

import '@/common/styles/reset.css';
import '@/common/styles/colors.css';
import '@/common/styles/ckeditor.css';
import '@/common/styles/globals.css';
// import 'highlight.js/styles/github-dark.min.css';
import AntThemeProvider from '@/common/providers/AntThemeProvider';

export default function GlobalStyleProvider({ children }: PropsWithChildren) {
  return (
    <GlobalStyleContext.Provider value={null}>
      <NextThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
        <AntThemeProvider>{children}</AntThemeProvider>
      </NextThemeProvider>
    </GlobalStyleContext.Provider>
  );
}
