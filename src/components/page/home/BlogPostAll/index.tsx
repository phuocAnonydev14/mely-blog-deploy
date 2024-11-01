'use client';

import { Blog } from '@/common/@types/blog.type';
import { Col, Row, Typography } from 'antd';
import BlogItem from '../BlogItem';
import BlogPagination from '../BlogPagination/BlogPagination';
import { useState } from 'react';
import { BlogHomeProps } from '@/components/page/home/Home';

export default function BlogPostAll(props: BlogHomeProps) {
  const { blogs: initBlog } = props;
  const [blogs, setBlogs] = useState<Blog[]>(initBlog);

  return (
    <>
      <Typography.Title level={3} className='mb-5 mt-10'>
        All blog posts
      </Typography.Title>
      <Row gutter={[22, 50]}>
        {blogs.map((post, index) => (
          <Col key={index} lg={8} xl={8} md={8} sm={24}>
            <BlogItem dir='col' post={post} />
          </Col>
        ))}
      </Row>

      <BlogPagination
        pagination={props.pagination}
        setBlogs={(blogs: Blog[]) => setBlogs((state) => [...state, ...blogs])}
      />
    </>
  );
}
