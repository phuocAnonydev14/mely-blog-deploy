import BlogContext from '@/common/contexts/BlogContext';
import { useContext } from 'react';

export default function useBlog() {
  const value = useContext(BlogContext);

  if (value === null) {
    throw new Error('useBlog() must be used within BlogProvider');
  }

  return value;
}
