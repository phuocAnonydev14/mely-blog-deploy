import HttpService from '@/services/HttpService';
import { ResponseData } from '@/common/@types/app.type';
import { EAuthProvider } from '@/common/enums/app.enum';
import { EGender } from '@/common/enums/gender.enum';
import { BookmarkCategory } from '@/common/@types/boomark.type';

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
  blogsCount: number;
}

interface GetAllUsersParams {
  page?: string;
  pageSize?: string;
  fullName?: string;
}

export interface IAddBookmarkCategory {
  bookmarkCategoryName: string;
  description: string;
}

class UserApiService extends HttpService {
  constructor() {
    super();
  }

  getAllUsers(params: GetAllUsersParams) {
    return this.get<ResponseData<IUser[]>>(`/users`, params, true, false);
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

  async getBookmarkCategories() {
    return this.get<ResponseData<BookmarkCategory[]>>(`/bookmark-categories`, {}, false);
  }

  async addBookmarkCategory(payload: IAddBookmarkCategory) {
    return this.post<ResponseData<any>, typeof payload>(`/bookmark-categories`, payload, {}, false);
  }

  async deleteBookmarkCategory(bookmarkCategoryId: string) {
    return this.remove<ResponseData<any>>(`/bookmark-categories/${bookmarkCategoryId}`, {}, false);
  }

  async getBookmarkCategoryDetail(bookmarkCategoryId: string) {
    return this.get<ResponseData<BookmarkCategory>>(`/bookmark-categories/${bookmarkCategoryId}`, {}, false);
  }

  async addBookmark(blogId: string, bookmarkCategoryId: string) {
    return this.post<ResponseData<any>, any>(`/blog-bookmark/${blogId}`, { bookmarkCategoryId }, {}, false);
  }

  async deleteBookmark(blogId: string) {
    return this.remove<ResponseData<any>>(`/blog-bookmark/${blogId}`, {}, false);
  }
}

const userApi = new UserApiService();

export default userApi;
