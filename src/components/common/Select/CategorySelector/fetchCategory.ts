import { categoryService } from '@/services/CategoryService';

export const fetchCategories = async () => {
  return categoryService.getCategories();
};
