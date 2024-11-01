import { Blog, Comment } from '@/common/@types/blog.type';
import { BlogCommentOrder } from '@/common/enums/blog-comment-order.enum';
import { Dispatch, SetStateAction, createContext } from 'react';

export interface BlogContextValue {
  blog: Blog;
  rootComments: Comment[];
  setRootComments: Dispatch<SetStateAction<Comment[]>>;
  setBlog: Dispatch<SetStateAction<Blog>>;
  commentsOrder: BlogCommentOrder;
  setCommentsOrder: Dispatch<SetStateAction<BlogCommentOrder>>;
  isLoadingRootComments: boolean;
}

const BlogContext = createContext<BlogContextValue | null>(null);

export default BlogContext;
