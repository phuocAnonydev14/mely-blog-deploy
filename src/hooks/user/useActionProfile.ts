import { useEffect, useState } from 'react';
import userService, { IUser } from '@/services/UserService';
import { ENotification, openNotification } from '@/common/utils/notification.util';
import useUser from '@/hooks/useUser';
import { deleteCookie } from 'cookies-next';
import { EToken } from '@/common/enums/app.enum';

export const useActionProfile = () => {
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const { setUser: setUserContext } = useUser();
  const getUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await userService.getProfile();
      setUser(data);
    } catch (e) {
      console.log(e);
      deleteCookie(EToken.USER_TOKEN);
      deleteCookie(EToken.USER_ID);
      deleteCookie(EToken.ACCESS_TOKEN);
      deleteCookie(EToken.REFRESH_TOKEN);
    } finally {
      setIsLoading(false);
    }
  };
  const updateUser = async (payload: Partial<IUser>) => {
    setIsLoading(true);
    try {
      const { data } = await userService.updateProfile({
        ...payload,
        updateTimestamp: user?.updateTimestamp,
      });
      setUser(data);
      setUserContext(data);
      await getUser();
      openNotification({
        type: ENotification.SUCCESS,
        message: 'Update profile successful!',
      });
    } catch (e: any) {
      const response = await e.response.json();
      openNotification({
        type: ENotification.ERROR,
        message: response.message[0],
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return [{ user, isLoading }, { updateUser }] as const;
};
