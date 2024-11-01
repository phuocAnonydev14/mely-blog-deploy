import { PropsWithChildren } from 'react';
import { ConfigProvider, theme, ThemeConfig } from 'antd';
import { useTheme as useNextTheme } from 'next-themes';

export default function AntThemeProvider({ children }: PropsWithChildren) {
  const { theme: nextTheme } = useNextTheme();

  const antTheme = {
    token: {
      colorPrimary: '#faa41d',
      colorLink: nextTheme === 'light' ? '#faa41d' : '#d88e1c',
      colorTextHeading: '#FFFFFF',
      colorText: '#FFFFFF',
      colorBgContainer: 'var(--color-primary)',
    },
    components: {
      Button: {
        // defaultBorderColor: 'var(--yellow-primary)',
        defaultBorderColor: '#ffffff',
      },
      Dropdown: {
        colorBgElevated: 'var(--color-primary)',
      },
      Input: {
        colorBorder: '#ffffff',
      },
      Notification: {
        zIndexPopup: 100000,
        zIndexPopupBase: 100000,
        colorBgElevated: '#ffffff',
        colorText: '#000000',
        colorTextHeading: '#000000',
        colorIcon: '#000000',
        colorIconHover: 'rgba(0,0,0,0.5)',
      },
    },
    algorithm: nextTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
  } satisfies ThemeConfig;

  return <ConfigProvider theme={antTheme}>{children}</ConfigProvider>;
}
