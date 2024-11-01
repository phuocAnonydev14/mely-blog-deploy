import BlogFormAction from '@/components/page/blog/common/BlogFormAction';

const MAX_TITLE_CHARACTERS_COUNT = 255;

export default function CreatePostPage() {
  return (
    <div className='mb-15'>
      <BlogFormAction action='create' />
    </div>
  );
}
