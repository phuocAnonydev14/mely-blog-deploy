'use client';

import HttpService from '@/services/HttpService';
import { ResponseData } from '@/common/@types/app.type';
import { EAuthProvider } from '@/common/enums/app.enum';
import { EGender } from '@/common/enums/gender.enum';

export interface IUser {
  userId: string;
  socialProvider: EAuthProvider;
  email: string;
  fullName: string;
  birthday: any;
  occupation: string;
  genderCode: EGender;
  phoneNumber: string;
  address: string;
  avatar: string;
  background: string;
  description: string;
  createTimestamp: string;
  updateUserId: string;
  updateTimestamp: string;
  deleteUserId: string;
  deleteTimestamp: string;
  isActive: boolean;
  uid: string;
  userRoles: any;
}

class UserApiService extends HttpService {
  constructor() {
    super();
  }

  getUser(id: string) {
    return this.get<ResponseData<IUser>>(`/users/${id}`, {}, false);
  }

  getProfile() {
    return this.get<ResponseData<IUser>>(`/users/profile`, {}, false);
  }

  updateProfile(payload: Partial<IUser>) {
    return this.update<ResponseData<IUser>, typeof payload>(`/users/profile`, payload, {}, false);
  }

  async checkOwner(userId: string) {
    return this.get<ResponseData<boolean>>(`/auth/owner/${userId}`, {}, false);
  }
}

const userApi = new UserApiService();

export default userApi;
