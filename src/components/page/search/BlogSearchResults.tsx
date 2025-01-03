import { Blog } from '@/common/@types/blog.type';
import BlogItem from '@/components/page/home/BlogItem';
import { Col, Empty, Row } from 'antd';
import Image from 'next/image';

interface BlogSearchResultsProps {
  blogs: Blog[];
}

export default function BlogSearchResults({ blogs }: BlogSearchResultsProps) {
  if (blogs.length === 0) {
    return (
      <div className='w-full flex flex-col items-center justify-center gap-10'>
        <img src='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg' alt='' />
        <p className='text-muted-foreground'>No blogs found.</p>
      </div>
    );
  }

  return (
    <>
      <Row gutter={16}>
        {blogs.map((blog, index) => (
          <Col key={`blog-search-result-${index}`} lg={8} sm={24}>
            <BlogItem dir='col' post={blog} />
          </Col>
        ))}
      </Row>
    </>
  );
}
