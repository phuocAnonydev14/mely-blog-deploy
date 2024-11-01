import { Metadata } from 'next';
import formatDateByLocale from '@/helpers/formatDateByLocale';
import { BlogDetailsPageStyle } from './BlogDetailsPage.style';
import blogApiService from '@/services/BlogService';
import BlogDetailPage from '@/app/(public)/blog/[blogId]/BlogDetailPage';
import BlogProvider from '@/common/providers/BlogProvider';

interface BlogDetailsPageProps {
  params: {
    blogId: string;
  };
}

export async function generateMetadata({ params }: BlogDetailsPageProps): Promise<Metadata> {
  const blog = await blogApiService.getById(params.blogId);

  return {
    title: blog.title,
    openGraph: {
      title: blog.title,
      type: 'article',
      authors: [blog?.user?.fullName || ''],
      publishedTime: formatDateByLocale(new Date(blog.createTimestamp)),
    },
  };
}

const BlogDetailsPage = async ({ params: { blogId } }: BlogDetailsPageProps) => {
  const blog = await blogApiService.getById(blogId);
  const trendingBlogs = await blogApiService.getTrendingBlog({});

  if (!trendingBlogs) return;
  return (
    <BlogDetailsPageStyle>
      <BlogProvider initialBlog={blog}>
        <BlogDetailPage trendingBlog={trendingBlogs.data} />
      </BlogProvider>
    </BlogDetailsPageStyle>
  );
};

export default BlogDetailsPage;
