import { theme } from 'antd';

export default function useAntThemeToken() {
  const { useToken } = theme;
  return useToken();
}
