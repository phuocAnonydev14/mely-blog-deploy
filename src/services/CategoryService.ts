import { ResponseData } from '@/common/@types/app.type';
import { Category } from '@/common/@types/blog.type';
import HttpService from '@/services/HttpService';

interface GetAllCategoriesParams {
  page?: string;
  pageSize?: string;
  name?: string;
}

class CategoryService extends HttpService {
  async getAllCategories(params: GetAllCategoriesParams) {
    return this.get<ResponseData<Category[]>>('/categories', params, true, false);
  }
}

export const categoryService = new CategoryService();
