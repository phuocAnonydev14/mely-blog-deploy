import { useEffect, useState } from 'react';
import userService, { IUser } from '@/services/UserService';

export const useGetUser = (id: string) => {
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    const getUser = async () => {
      try {
        const { data } = await userService.getUser(id);
        setUser(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, [id]);
  return [user, isLoading] as const;
};
