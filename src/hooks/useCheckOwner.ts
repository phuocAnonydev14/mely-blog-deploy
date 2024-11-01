import { useEffect, useState } from 'react';
import userService from '@/services/UserService';

export const useCheckOwner = (userId: string) => {
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      try {
        const { data } = await userService.checkOwner(userId);
        setIsOwner(data);
      } catch (e) {
        setIsOwner(false);
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [userId]);

  return [isOwner, isLoading] as const;
};
