import { IUser } from '@/services/UserService';
import { createContext } from 'react';

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

const UserContext = createContext<IUserContext | null>(null);

export default UserContext;
