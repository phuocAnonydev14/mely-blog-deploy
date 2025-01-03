'use client';

import { Tooltip } from 'antd';
import { FlagOutlined } from '@ant-design/icons';
import useUser from '@/hooks/useUser';
import { useState } from 'react';
import useBlog from '@/hooks/useBlog';
import { BookmarkIcon } from 'lucide-react';
import { BookmarkAddDetailModal } from '@/components/page/blog/details/BlogActions/BookmarkAddDetailModal';

export const BookmarkAction = () => {
  const { isLoggedIn, user } = useUser();
  const { blogUserStatus } = useBlog();
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const handleToggleBookmark = () => {
    setIsOpenAdd(true);
  };

  if (!isLoggedIn) return;
  return (
    <>
      <Tooltip placement='left' title='Add to bookmark'>
        <BookmarkIcon
          className='anticon'
          style={{ color: blogUserStatus?.bookmarkCate ? 'var(--yellow-primary)' : 'white' }}
          onClick={handleToggleBookmark}
        />
      </Tooltip>
      <BookmarkAddDetailModal
        currentBlogBookmarkCateId={blogUserStatus?.bookmarkCate}
        open={isOpenAdd}
        onCancel={() => setIsOpenAdd(false)}
      />
    </>
  );
};
