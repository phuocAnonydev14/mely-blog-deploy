import { Metadata } from 'next';
import blogApiService from '@/services/BlogService';
import Home from '@/components/page/home';
import { Blog } from '@/common/@types/blog.type';

export const metadata: Metadata = {
  title: 'Mely Blog',
  description: 'Home page Mely Blog',
};

export default async function HomePage() {
  /**
   * Fetches blog data and trending blog data from the blog API service.
   * @returns An object containing the blog data and trending blog data.
   */
  const handleFetchBlog = async () => {
    try {
      const blogs = await blogApiService.getAllBlog({ page: '1', pageSize: '20' });
      const trendingBlog = await blogApiService.getTrendingBlog({});
      return { blogs, trendingBlog } as const;
    } catch (e) {
      console.log(e);
      return { blogs: { data: [], meta: {} as any }, trendingBlog: null };
    }
  };

  const { blogs, trendingBlog } = await handleFetchBlog();
  if (!blogs || blogs.data.length === 0 || !blogs.meta || !trendingBlog) return <></>;

  return (
    <>
      <Home
        blogs={blogs?.data as Blog[]}
        pagination={blogs?.meta?.pagination}
        trendingBlog={trendingBlog.data}
      />
    </>
  );
}

export const revalidate = 10; //revalidate every 10 seconds
