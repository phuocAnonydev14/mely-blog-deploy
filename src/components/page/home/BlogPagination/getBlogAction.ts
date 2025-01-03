import blogApiService from '@/services/BlogService';

export const getBlogAction = async (currentPage: number) => {
  return blogApiService.getAllBlog({ page: (currentPage + 1).toString() });
};
