import { useEffect, useState } from 'react';
import blogService, { GetAllBlogPostParams } from '@/services/BlogService';
import { Blog } from '@/common/@types/blog.type';
import { IPagination } from '@/common/@types/pagination.type';

export const useBlogUser = (initParams: GetAllBlogPostParams) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<IPagination>({} as IPagination);
  const [params, setParams] = useState<GetAllBlogPostParams>(initParams);
  useEffect(() => {
    console.log(params);
    const getBlogs = async () => {
      try {
        const { data, meta } = await blogService.getAllBlog(params);
        setPagination(meta?.pagination ?? ({} as IPagination));
        setBlogs(data);
      } catch (e) {
        console.log(e);
      }
    };
    getBlogs();
  }, [params]);

  return [{ blogs, pagination }, { setParams }] as const;
};
