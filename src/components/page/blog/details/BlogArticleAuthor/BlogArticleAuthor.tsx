'use client';

import { ReactEventHandler, useState } from 'react';
import Image from 'next/image';
import { Button } from 'antd';
import { CheckOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import BlogArticleAuthorStyle from './BlogArticleAuthor.style';
import clsx from 'clsx';
import useBlog from '@/hooks/useBlog';

export default function BlogArticleAuthor() {
  const {
    blog: { user: author },
  } = useBlog();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHoveringWhenFollowing, setIsHoveringWhenFollowing] = useState(true);
  const handleSetDefaultAvatar: ReactEventHandler<HTMLImageElement> = (event) => {
    const target = event.currentTarget;
    target.src = '/code_mely_avatar.jpg';
  };

  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <BlogArticleAuthorStyle>
      <div className='blog-article-author-container'>
        <div className='blog-article-author'>
          <Image
            src={author?.avatar || '/code_mely_avatar.jpg'}
            alt='Author'
            width={50}
            height={50}
            className='blog-article-author-avatar'
            onError={handleSetDefaultAvatar}
          />
          <div className='blog-article-author-info'>
            <p className='blog-article-author-name'>{author?.fullName}</p>
          </div>
        </div>
        <Button
          className={clsx('follow-author-btn', { following: isFollowing })}
          type='default'
          size='large'
          icon={
            !isFollowing ? <PlusOutlined /> : !isHoveringWhenFollowing ? <CheckOutlined /> : <CloseOutlined />
          }
          onMouseEnter={() => isFollowing && setIsHoveringWhenFollowing(true)}
          onMouseLeave={() => isFollowing && setIsHoveringWhenFollowing(false)}
          onClick={handleToggleFollow}
        >
          {!isFollowing ? 'Follow' : !isHoveringWhenFollowing ? 'Following' : 'Unfollow'}
        </Button>
      </div>
    </BlogArticleAuthorStyle>
  );
}
