'use client';

import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { BlogSkeleton } from '@/components/page/home/BlogSkeleton';
import { BlogPaginationParams, useBlogPagination } from '@/hooks/useBlogPagination';

export default function BlogPagination(props: BlogPaginationParams) {
  const [scrollTrigger, isInView] = useInView();

  const [{ hasMoreData }, { handleLoadMorePosts }] = useBlogPagination(props);

  useEffect(() => {
    if (isInView && hasMoreData) {
      handleLoadMorePosts().finally();
    }
  }, [isInView, hasMoreData]);

  if (!hasMoreData) return <></>;

  return (
    <div ref={scrollTrigger}>
      <BlogSkeleton />
    </div>
  );
}
