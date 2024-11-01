import { IPagination } from '@/common/@types/pagination.type';
import { useCallback, useMemo, useState } from 'react';
import { Blog } from '@/common/@types/blog.type';
import { getBlogAction } from '@/components/page/home/BlogPagination/getBlogAction';

export interface BlogPaginationParams {
  setBlogs: (blogs: Blog[]) => void;
  pagination: IPagination;
}

export const useBlogPagination = (params: BlogPaginationParams) => {
  const {
    pagination: { totalPage: initTotalPage, page, pageSize },
    setBlogs,
  } = params;
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPage, setTotalPage] = useState(initTotalPage);
  const hasMoreData = useMemo(() => currentPage < totalPage, [currentPage, page, totalPage]);
  const handleLoadMorePosts = useCallback(async () => {
    if (!hasMoreData) return;
    const blogs = await getBlogAction(currentPage);
    setCurrentPage((state) => state + 1);
    setBlogs(blogs.data);
    setTotalPage(blogs.meta?.pagination?.totalPage ?? 20);
  }, [currentPage, totalPage, hasMoreData]);

  return [{ hasMoreData }, { handleLoadMorePosts }] as const;
};
