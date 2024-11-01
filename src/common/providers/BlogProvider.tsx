'use client';

import { Blog, Comment } from '@/common/@types/blog.type';
import BlogContext from '@/common/contexts/BlogContext';
import { BlogCommentOrder } from '@/common/enums/blog-comment-order.enum';
import useUser from '@/hooks/useUser';
import blogApiService from '@/services/BlogService';
import { PropsWithChildren, useEffect, useState } from 'react';

interface BlogProviderProps extends PropsWithChildren {
  initialBlog: Blog;
}

export default function BlogProvider({ initialBlog, children }: BlogProviderProps) {
  const [blog, setBlog] = useState(initialBlog);
  const [isLoadingRootComments, setIsLoadingRootComments] = useState(true);
  const [rootComments, setRootComments] = useState<Comment[]>([]);
  const [commentsOrder, setCommentsOrder] = useState<BlogCommentOrder>(BlogCommentOrder.TOP_DESC);
  const { isLoading, isLoggedIn } = useUser();

  useEffect(() => {
    (async () => {
      if (isLoading) return;

      setIsLoadingRootComments(true);
      const res = await blogApiService.getAllComments(
        { blogId: blog.blogId, replyTo: 'null', order: commentsOrder },
        !isLoggedIn,
      );
      setRootComments(res.data);
      setIsLoadingRootComments(false);
    })();
  }, [blog, commentsOrder, isLoading, isLoggedIn]);

  return (
    <BlogContext.Provider
      value={{
        blog,
        rootComments,
        setBlog,
        setRootComments,
        commentsOrder,
        setCommentsOrder,
        isLoadingRootComments,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}
