'use client';

import Link from 'next/link';
import { Card } from 'antd';
import clsx from 'clsx';
import TrendingBlogsStyle from '@/components/common/TrendingBlogs/TrendingBlogs.style';
import { Blog } from '@/common/@types/blog.type';
import { useState } from 'react';

export default function TrendingBlogs({ trendingBlog }: { trendingBlog: Blog[] }) {
  const [limited, setLimited] = useState(4);

  return (
    <TrendingBlogsStyle>
      <Card title={'Trending blogs'} className='trending-blogs'>
        {trendingBlog.map((blog, index) =>
          index > limited ? null : (
            <Link key={index} href={`/blog/${blog.blogId}`}>
              <Card.Grid className={clsx('article', { 'last-article': index === 2 })}>
                <p className='article-title'>{blog.title || ''}</p>
              </Card.Grid>
            </Link>
          ),
        )}
        <Link href='' className='see-more-link' onClick={() => setLimited(10)}>
          <p>See more...</p>
        </Link>
      </Card>
    </TrendingBlogsStyle>
  );
}
