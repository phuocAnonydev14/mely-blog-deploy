import { Metadata } from 'next';
import formatDateByLocale from '@/helpers/formatDateByLocale';
import { BlogDetailsPageStyle } from './BlogDetailsPage.style';
import blogApiService from '@/services/BlogService';
import BlogDetailPage from '@/app/(public)/blog/[blogId]/BlogDetailPage';
import BlogProvider from '@/common/providers/BlogProvider';
import { cookies } from 'next/headers';
import { EToken } from '@/common/enums/app.enum';

interface BlogDetailsPageProps {
  params: Promise<{
    blogId: string;
  }>;
}

const handleFetchBlog = async (blogId: string) => {
  try {
    const blog = await blogApiService.getById(blogId);
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(EToken.ACCESS_TOKEN);
    let blogUserStatus = null;
    if (accessToken) {
      blogUserStatus = await blogApiService.getBlogUserStatus(blogId);
    }
    const trendingBlogs = await blogApiService.getTrendingBlog({});

    return { blog, blogUserStatus, trendingBlogs } as const;
  } catch (e) {
    console.log(e);
    return { blog: null, blogUserStatus: null };
  }
};

export async function generateMetadata(props: BlogDetailsPageProps): Promise<Metadata> {
  const { blogId } = await props.params;
  const { blog } = await handleFetchBlog(blogId);

  if (!blog) return {};

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

const BlogDetailsPage = async (props: BlogDetailsPageProps) => {
  const { blogId } = await props.params;
  const { blog, trendingBlogs, blogUserStatus } = await handleFetchBlog(blogId);

  if (!trendingBlogs) return;
  return (
    <BlogDetailsPageStyle>
      <BlogProvider initialBlog={blog} initialBlogUserStatus={blogUserStatus}>
        <BlogDetailPage trendingBlog={trendingBlogs.data} />
      </BlogProvider>
    </BlogDetailsPageStyle>
  );
};

export default BlogDetailsPage;
