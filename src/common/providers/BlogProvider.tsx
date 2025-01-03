'use client';

import { Blog, BlogUserStatus, Comment } from '@/common/@types/blog.type';
import BlogContext from '@/common/contexts/BlogContext';
import { BlogCommentOrder } from '@/common/enums/blog-comment-order.enum';
import useUser from '@/hooks/useUser';
import blogApiService from '@/services/BlogService';
import { PropsWithChildren, useEffect, useState } from 'react';

interface BlogProviderProps extends PropsWithChildren {
  initialBlog: Blog;
  initialBlogUserStatus: BlogUserStatus | null;
}

export default function BlogProvider({ initialBlog, children, initialBlogUserStatus }: BlogProviderProps) {
  const [blog, setBlog] = useState(initialBlog);
  const [blogUserStatus, setBlogUserStatus] = useState<BlogUserStatus | null>(initialBlogUserStatus);

  return (
    <BlogContext.Provider
      value={{
        blog,
        setBlog,
        blogUserStatus,
        setBlogUserStatus,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}
