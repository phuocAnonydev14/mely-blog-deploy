import blogApiService from '@/services/BlogService';

export const getBlogAction = async (currentPage: number) => {
  console.log('currentPage', currentPage);
  return blogApiService.getAllBlog({ page: (currentPage + 1).toString() });
};
