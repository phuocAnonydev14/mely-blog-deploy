import HttpService from '@/services/HttpService';
import { ResponseData } from '@/common/@types/app.type';

interface AddBookmarkCategory {
  bookmarkCategoryName: string;
  description: string;
}

export class BookmarkService extends HttpService {
  async addBookmarkCategory(params: AddBookmarkCategory) {
    return await this.post<ResponseData<any>, AddBookmarkCategory>('/bookmark-categories', params, {}, false);
  }

  async unBookmarkCategory(id: string) {
    return await this.remove(`/bookmark-categories/${id}`, {}, false);
  }
}

export const bookmarkService = new BookmarkService();
