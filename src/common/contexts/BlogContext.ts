import { Blog, BlogUserStatus } from '@/common/@types/blog.type';
import { Dispatch, SetStateAction, createContext } from 'react';

export interface BlogContextValue {
  blog: Blog;
  setBlog: Dispatch<SetStateAction<Blog>>;
  blogUserStatus: BlogUserStatus | null;
  setBlogUserStatus: Dispatch<SetStateAction<BlogUserStatus | null>>;
}

const BlogContext = createContext<BlogContextValue | null>(null);

export default BlogContext;
