import { useEffect, useState } from 'react';
import { EToken } from '@/common/enums/app.enum';
import userApi from '@/services/UserService';
import { getCookie, setCookie } from 'cookies-next';

export const useCheckSession = () => {
  const [onSession, setOnSession] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const checkSession = async () => {
      const token = getCookie(EToken.ACCESS_TOKEN);
      if (!token) {
        setOnSession(false);
        setIsLoading(false);
        return;
      }
      try {
        const { data } = await userApi.getProfile();
        setCookie(EToken.USER_ID, data.userId);
        const token = getCookie(EToken.USER_TOKEN);
        setOnSession(!!token);
      } catch (e: any) {
        console.log(e);
        if (e.response.status) {
          console.log('Refresh');
          // await authService.refreshToken();
        }
        setOnSession(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);
  return [onSession, isLoading];
};
