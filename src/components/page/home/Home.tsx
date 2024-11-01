'use client';
import { Col, Row, Typography } from 'antd';
import { useMediaQuery } from 'usehooks-ts';
import { breakpoints } from '@/common/constants/constants';
import { Blog } from '@/common/@types/blog.type';
import { IPagination } from '@/common/@types/pagination.type';
import HomeStyle from './HomeContainer.style';
import BlogPostAll from '@/components/page/home/BlogPostAll';
import BlogItem from '@/components/page/home/BlogItem/BlogItem';
import BlogNav from '@/components/page/home/NavBar/NavBar';

export interface BlogHomeProps {
  blogs: Blog[];
  pagination: IPagination;
  trendingBlog: Blog[];
}

const Home = (props: BlogHomeProps) => {
  const { blogs, trendingBlog } = props;
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.lg})`);

  console.log(trendingBlog);
  if (!trendingBlog) return <></>;

  return (
    <HomeStyle>
      <div className='home-container' id='home-scroll-parent'>
        <Row>
          <Col
            lg={{ span: 4 }}
            xxl={3}
            md={{ span: 0 }}
            style={{
              borderRight: '1px solid rgba(70, 70, 70, 0.83)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              hidden={isMobile}
              style={{ maxWidth: isMobile ? '10rem' : '22rem' }}
              className='home-container_navbar'
            >
              <BlogNav />
            </div>
          </Col>
          <Col xxl={21} lg={20} md={24}>
            <div className='home-container_items' id='home-scroll-child'>
              <Typography.Title level={3} className='mb-5'>
                Top blog posts
              </Typography.Title>
              <Row gutter={[25, 50]}>
                <Col sm={{ span: 24 }} md={{ span: 12 }} className='h-full'>
                  {trendingBlog[0] && <BlogItem dir='col' post={trendingBlog[0]} />}
                </Col>
                <Col sm={{ span: 24 }} md={{ span: 12 }}>
                  <div className='w-full flex flex-col gap-16'>
                    {trendingBlog[1] && <BlogItem dir='row' post={trendingBlog[1]} />}
                    {trendingBlog[2] && <BlogItem dir='row' post={trendingBlog[2]} />}
                  </div>
                </Col>
                <Col span='24'>{trendingBlog[3] && <BlogItem dir='row' post={trendingBlog[3]} />}</Col>
              </Row>

              <BlogPostAll {...props} />
            </div>
          </Col>
        </Row>
      </div>
    </HomeStyle>
  );
};
export default Home;
