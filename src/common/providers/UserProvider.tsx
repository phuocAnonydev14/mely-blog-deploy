'use client';

import UserContext from '@/common/contexts/UserContext';
import { EToken } from '@/common/enums/app.enum';
import userApi, { IUser } from '@/services/UserService';
import { authService } from '@/services/auth.service';
import { deleteCookie, setCookie } from 'cookies-next';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const value = { user, setUser, isLoggedIn, setIsLoggedIn, isLoading };

  useEffect(() => {
    const unsubscribe = authService.getAuth().onAuthStateChanged(async (user) => {
      setIsLoading(true);
      if (user) {
        const accessToken = await user.getIdToken();
        setCookie(EToken.ACCESS_TOKEN, accessToken);
        setCookie(EToken.USER_ID, user.uid);
        setCookie(EToken.REFRESH_TOKEN, user.refreshToken);
        const resp = await userApi.getProfile();
        setUser(resp.data);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        deleteCookie(EToken.ACCESS_TOKEN);
        deleteCookie(EToken.USER_ID);
        deleteCookie(EToken.REFRESH_TOKEN);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
