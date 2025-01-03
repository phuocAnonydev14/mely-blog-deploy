import React from 'react';
import blogService from '@/services/BlogService';
import BlogFormAction from '@/components/page/blog/common/BlogFormAction';

interface EditPostPageProps {
  params: Promise<{
    postId: string;
  }>;
}

const EditPostPage = async ({ params }: EditPostPageProps) => {
  const { postId } = await params;
  const blog = await blogService.getById(postId);

  if (!blog) return;
  return (
    <div className='mb-5'>
      <BlogFormAction action='edit' blog={blog} />
    </div>
  );
};

export default EditPostPage;
