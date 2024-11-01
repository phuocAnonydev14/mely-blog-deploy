'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { CommentOutlined, EditOutlined, FlagOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { AppRoutes } from '@/app/routes';
import BlogActionsStyle from './BlogActions.style';
import { breakpoints } from '@/common/constants/constants';
import { useMediaQuery } from 'usehooks-ts';
import ShareBlogModal from '@/components/page/blog/details/ShareBlogModal';
import VoteButton from '@/components/page/blog/details/VoteButton';
import useBlog from '@/hooks/useBlog';
import { EToken } from '@/common/enums/app.enum';
import { getCookie } from 'cookies-next';

interface BlogActionsProps {
  layout?: 'vertical' | 'horizontal';
}

export default function BlogActions({ layout = 'vertical' }: BlogActionsProps) {
  const { blog } = useBlog();
  const shareButtonRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery(`(max-width:${breakpoints.md})`);
  const userId = getCookie(EToken.USER_ID);

  console.log('blog', blog);

  const handleJumpToComments = () => {
    const commentsSectionTopPosition = document.querySelector('.blog-comments')?.getBoundingClientRect().top;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const paddingAndMargin = 80;

    if (commentsSectionTopPosition) {
      window.scrollTo({
        top: commentsSectionTopPosition + scrollTop - paddingAndMargin,
        behavior: 'smooth',
      });
    }
  };

  return (
    <BlogActionsStyle>
      <div className='blog-actions' style={{ flexDirection: layout === 'horizontal' ? 'row' : 'column' }}>
        {userId === blog.user?.userId && (
          <Tooltip placement='left' title='Edit this blog'>
            <Link href={`${AppRoutes.BLOG_EDIT}/${blog.blogId}`}>
              <EditOutlined className='blog-actions-edit' />
            </Link>
          </Tooltip>
        )}
        {!isMobile && <VoteButton {...blog} />}
        <Tooltip placement='left' title='Jump to Comments'>
          <CommentOutlined className='blog-actions-comments' onClick={handleJumpToComments} />
        </Tooltip>
        <Tooltip placement='left' title='Share via...'>
          <ShareAltOutlined className='blog-actions-share' ref={shareButtonRef} />
          <ShareBlogModal triggerOpenElementRef={shareButtonRef} />
        </Tooltip>
        <Tooltip placement='left' title='Report this blog'>
          <Link href={AppRoutes.BLOG_REPORT}>
            <FlagOutlined className='blog-actions-report' />
          </Link>
        </Tooltip>
      </div>
    </BlogActionsStyle>
  );
}
