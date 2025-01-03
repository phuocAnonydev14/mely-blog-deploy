'use client';

import { BookmarkCategory } from '@/common/@types/boomark.type';
import { Button, Divider, Dropdown, Modal, Radio, Typography } from 'antd';
import { MoreHorizontal } from 'lucide-react';
import moment from 'moment';
import { BookMarkOwnerProps } from '@/components/page/about-me/Bookmark/BookMarkOwner';
import userService from '@/services/UserService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface BookmarkBoxProps extends BookMarkOwnerProps {
  bookmark: BookmarkCategory;
  selected?: boolean;
  setSelectedBookmark?: (cateId: string) => void;
  clickAction?: () => void;
}

export const BookmarkBox = ({
  bookmark,
  selected,
  isAddBookmark,
  setSelectedBookmark,
  clickAction,
}: BookmarkBoxProps) => {
  const { bookmarkCategoryName, description, blogBookmark, createTimestamp } = bookmark;
  const router = useRouter();
  const [isDelete, setIsDelete] = useState(false);

  const items = [
    {
      key: 'edit',
      label: <p>Edit</p>,
    },
    {
      key: 'delete',
      label: <p>Delete</p>,
      danger: true,
      onClick: async () => {
        try {
          setIsDelete(true);
        } catch (e) {
          console.log(e);
        }
      },
    },
  ];

  return (
    <div
      style={{
        height: '100%',
        border: `1px solid ${selected ? 'var(--yellow-primary)' : '#ced4da'} `,
        borderRadius: '8px',
        padding: '8px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography.Title
            onClick={clickAction}
            className='my-0'
            style={{ fontWeight: 500, fontSize: '26px' }}
            level={4}
          >
            {bookmarkCategoryName}
          </Typography.Title>

          {isAddBookmark ? (
            <Radio
              checked={selected}
              // onChange={(e) => setSelectedBookmark(e.target.checked ? bookmark.bookmarkCategoryId : '')}
            />
          ) : (
            <Dropdown menu={{ items }}>
              <Button type='text' size='small' icon={<MoreHorizontal />} />
            </Dropdown>
          )}
        </div>
        <Divider className='my-4' />
      </div>
      <div onClick={clickAction} className='flex flex-grow-1 flex-col justify-between'>
        <Typography.Text style={{ fontSize: '16px' }}>{description}</Typography.Text>
        <div className='flex justify-between items-center mt-4'>
          <Typography.Text className='flex items-center' style={{ color: '#ced4da' }}>
            {/*<Dot style={{ color: 'green', width: 24, height: 24 }} />*/}
            <span style={{ color: 'green', paddingRight: 3 }}>✧ </span> {blogBookmark.length} posts
          </Typography.Text>
          <Typography.Text style={{ fontSize: '12px', color: '#ced4da' }}>
            {moment(createTimestamp).fromNow()}
          </Typography.Text>
        </div>
      </div>
      <Modal
        title='Confirm delete'
        open={isDelete}
        onOk={() => {
          userService.deleteBookmarkCategory(bookmark.bookmarkCategoryId).then(() => {
            setIsDelete(false);
          });
        }}
        onCancel={() => setIsDelete(false)}
        okText='Delete'
      >
        <p>Are you sure you want to delete this?</p>
      </Modal>
    </div>
  );
};
