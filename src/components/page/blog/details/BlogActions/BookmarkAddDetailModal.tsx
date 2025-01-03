'use client';

import { Button, message, Modal } from 'antd';
import { BookMarkOwner } from '@/components/page/about-me/Bookmark/BookMarkOwner';
import { useState } from 'react';
import useBlog from '@/hooks/useBlog';
import userService from '@/services/UserService';

interface BookmarkAddDetailModalProps {
  open: boolean;
  onCancel: () => void;
  currentBlogBookmarkCateId?: string;
}

export const BookmarkAddDetailModal = ({
  open,
  onCancel,
  currentBlogBookmarkCateId,
}: BookmarkAddDetailModalProps) => {
  const [selectedBookmark, setSelectedBookmark] = useState<string>(currentBlogBookmarkCateId || '');
  const { blog } = useBlog();
  const [loading, setLoading] = useState(false);
  const handleAddBookmark = async () => {
    try {
      setLoading(true);
      const res = await userService.addBookmark(blog.blogId, selectedBookmark);
      console.log(res);
      onCancel();
      message.success('Add bookmark success');
    } catch (e) {
      console.log(e);
      message.error('Add bookmark failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onCancel={onCancel} title='Add bookmark' footer={null} width={1000}>
      <div className='mt-4'>
        <BookMarkOwner
          selectedBookmark={selectedBookmark}
          setSelectedBookmark={setSelectedBookmark}
          isAddBookmark
        />
        <div className='flex justify-end gap-4 mt-5'>
          <Button type='default' onClick={onCancel}>
            {' '}
            Cancel
          </Button>
          <Button type='primary' loading={loading} onClick={handleAddBookmark}>
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
};
