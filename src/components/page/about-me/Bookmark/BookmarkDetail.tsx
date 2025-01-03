'use client';

import { useEffect, useState } from 'react';
import { BookmarkCategory } from '@/common/@types/boomark.type';
import userService from '@/services/UserService';
import { Button, Col, Row, Typography } from 'antd';
import BlogItem from '@/components/page/home/BlogItem';
import { PostStyle } from '@/components/page/about-me/Post/post.style';

interface BookmarkDetailProps {
  selectedBookmarkCate: string;
}

export const BookmarkDetail = ({ selectedBookmarkCate }: BookmarkDetailProps) => {
  const [bookmarkCate, setBookmarkCate] = useState<BookmarkCategory>({} as BookmarkCategory);

  const items = [
    // {
    //   key: 'edit',
    //   label: <p>Edit</p>,
    // },
    {
      key: 'delete',
      label: <p>Delete</p>,
      danger: true,
      onClick: async (e: any) => {
        try {
          console.log(e);
          // await userService.deleteBookmark();
        } catch (e) {}
      },
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await userService.getBookmarkCategoryDetail(selectedBookmarkCate);
        setBookmarkCate(res.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [selectedBookmarkCate]);

  if (!bookmarkCate) return;

  return (
    <div>
      <Typography.Title title='3' className='mb-0'>
        {bookmarkCate.bookmarkCategoryName}
      </Typography.Title>
      <Typography.Text>{bookmarkCate.description}</Typography.Text>

      <div className='mt-4'>
        <PostStyle>
          <Row gutter={[16, 16]}>
            {bookmarkCate?.blogs?.map((blog) => {
              return (
                <Col className={'blog-item'} key={blog.blogId} span={8}>
                  <div>
                    <BlogItem dir='col' post={blog} />
                    <div className='flex justify-end'>
                      <Button
                        danger
                        onClick={async () => {
                          await userService.deleteBookmark(blog.blogId);
                          if (!bookmarkCate) return;
                          setBookmarkCate((state) => ({
                            ...state,
                            blogs: state?.blogs.filter((item) => item.blogId !== blog.blogId) || [],
                          }));
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </PostStyle>
      </div>
    </div>
  );
};
