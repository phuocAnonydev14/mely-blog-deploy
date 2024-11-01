import { Col, Empty, Flex, Row, Typography } from 'antd';
import Button from '@/components/common/Button/Button';
import { useBlogUser } from '@/hooks/useGetBlogUser';
import { useEffect, useState } from 'react';
import BlogItem from '@/components/page/home/BlogItem';
import Pagination from '@/components/common/Pagination/Pagination';
import { PostStyle } from '@/components/page/about-me/Post/post.style';

export interface IPostUserProps {
  isOwner: boolean;
  userId: string;
}

export default function PostUser({ isOwner, userId }: IPostUserProps) {
  const [page, setPage] = useState(1);
  const [{ blogs, pagination }, { setParams }] = useBlogUser({
    page: page.toString(),
    pageSize: '6',
    userId,
  });
  useEffect(() => {
    setParams({
      page: page.toString(),
      pageSize: '6',
      userId,
    });
  }, [page]);
  if (blogs.length === 0) {
    return (
      <Empty
        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
        imageStyle={{ height: 60 }}
        description={
          <Typography.Text>{isOwner ? "You don't" : "This user doesn't "} have any post</Typography.Text>
        }
        className={'flex justify-center flex-col items-center'}
      >
        {isOwner && (
          <Button href={'/blog/create'} type='primary'>
            Create Now
          </Button>
        )}
      </Empty>
    );
  }
  return (
    <PostStyle>
      <Row>
        {blogs.map((blog) => {
          return (
            <Col className={'blog-item'} key={blog.blogId} span={8}>
              <BlogItem dir='col' post={blog} />
            </Col>
          );
        })}
      </Row>
      <Row>
        <Flex className={'row-pagination'} justify={'center'}>
          <Pagination
            defaultCurrent={pagination.page}
            total={pagination.total}
            pageSize={pagination.pageSize}
            showSizeChanger={false}
            onChange={(e) => {
              setPage(e);
            }}
          />
        </Flex>
      </Row>
    </PostStyle>
  );
}
