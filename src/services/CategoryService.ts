import { ResponseData } from '@/common/@types/app.type';
import { Category } from '@/common/@types/blog.type';
import HttpService from '@/services/HttpService';

class CategoryService extends HttpService {
  getCategories = async () => {
    return this.get<ResponseData<Category[]>>('/categories');
  };
}

export const categoryService = new CategoryService();
