'use client';

import Link from 'next/link';
import { Card } from 'antd';
import MoreBlogsFromAuthorStyle from './MoreBlogsFromAuthor.style';
import { BlogMetadata } from '@/mocks/services/BlogService';
import useBlog from '@/hooks/useBlog';

export default function MoreBlogsFromAuthor() {
  // TODO: fetch 3 recent articles from the author
  const {
    blog: { user: author },
  } = useBlog();

  return (
    <MoreBlogsFromAuthorStyle>
      <Card
        title={
          <>
            More from <Link href=''>{author?.fullName}</Link>
          </>
        }
        className='more-blogs-from-author'
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <Link key={index} href=''>
            <Card.Grid className='article'>
              <p className='article-title'>Article title</p>
            </Card.Grid>
          </Link>
        ))}
        <Link href='' className='see-more-link'>
          <p>See more...</p>
        </Link>
      </Card>
    </MoreBlogsFromAuthorStyle>
  );
}
