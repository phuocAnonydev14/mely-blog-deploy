import { Metadata } from 'next';
import blogApiService from '@/services/BlogService';
import Head from 'next/head';
import Home from '@/components/page/home';

export const metadata: Metadata = {
  title: 'Mely Blog',
  description: 'Home page Mely Blog',
};

export default async function HomePage() {
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
      <Home blogs={blogs?.data} pagination={blogs?.meta?.pagination} trendingBlog={trendingBlog.data} />
    </>
  );
}
