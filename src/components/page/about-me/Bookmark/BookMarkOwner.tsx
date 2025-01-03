'use client';

import { useEffect, useState } from 'react';
import userService from '@/services/UserService';
import { Col, Empty, Row, Typography } from 'antd';
import Button from '@/components/common/Button/Button';
import { AddBookmarkModal } from '@/components/page/about-me/Bookmark/AddBookmarkmodal';
import { BookmarkCategory } from '@/common/@types/boomark.type';
import { BookmarkBox } from '@/components/page/about-me/Bookmark/BookmarkBox';
import { BookmarkDetail } from '@/components/page/about-me/Bookmark/BookmarkDetail';

export interface BookMarkOwnerProps {
  isAddBookmark?: boolean;
  selectedBookmark?: string;
  setSelectedBookmark?: (bookmark: string) => void;
}

export const BookMarkOwner = ({
  isAddBookmark,
  setSelectedBookmark,
  selectedBookmark,
}: BookMarkOwnerProps) => {
  const [bookmarks, setBookmarks] = useState<BookmarkCategory[]>([]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [showDetailBookmark, setShowDetailBookmark] = useState('');
  const handleFetchBookmarkCate = async () => {
    try {
      const bookmarkCates = await userService.getBookmarkCategories();
      setBookmarks(bookmarkCates.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleFetchBookmarkCate();
  }, []);

  if (bookmarks.length === 0) {
    return (
      <Empty
        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
        imageStyle={{ height: 60 }}
        description={<Typography.Text>You don&apos;t have any bookmark</Typography.Text>}
        className={'flex justify-center flex-col items-center'}
      >
        <Button onClick={() => setIsOpenAdd(true)} type='primary'>
          Create Now
        </Button>
        <AddBookmarkModal
          onAddSuccess={handleFetchBookmarkCate}
          open={isOpenAdd}
          onCancel={() => setIsOpenAdd(false)}
        />
      </Empty>
    );
  }

  if (showDetailBookmark) return <BookmarkDetail selectedBookmarkCate={showDetailBookmark} />;

  return (
    <div>
      <Row gutter={[20, 20]}>
        {bookmarks.map((item) => (
          <Col className='flex-1' lg={8} md={8} sm={12}>
            <BookmarkBox
              setSelectedBookmark={setSelectedBookmark}
              selected={selectedBookmark == item.bookmarkCategoryId}
              isAddBookmark={isAddBookmark}
              bookmark={item}
              clickAction={() => {
                if (isAddBookmark && setSelectedBookmark) setSelectedBookmark(item.bookmarkCategoryId);
                else setShowDetailBookmark(item.bookmarkCategoryId);
              }}
            />
          </Col>
        ))}
      </Row>
      <div className='flex justify-center mt-5'>
        <Button onClick={() => setIsOpenAdd(true)} type='primary'>
          Add category
        </Button>
        <AddBookmarkModal
          onAddSuccess={handleFetchBookmarkCate}
          open={isOpenAdd}
          onCancel={() => setIsOpenAdd(false)}
        />
      </div>
    </div>
  );
};
