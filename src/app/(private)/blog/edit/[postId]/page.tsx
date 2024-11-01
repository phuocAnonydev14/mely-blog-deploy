import React from 'react';
import blogService from '@/services/BlogService';
import BlogFormAction from '@/components/page/blog/common/BlogFormAction';

const EditPostPage = async ({ params }: { params: Record<any, any> }) => {
  const { postId } = params;
  const blog = await blogService.getById(postId);

  if (!blog) return;
  return (
    <div className='mb-5'>
      <BlogFormAction action='edit' blog={blog} />
    </div>
  );
};

export default EditPostPage;
