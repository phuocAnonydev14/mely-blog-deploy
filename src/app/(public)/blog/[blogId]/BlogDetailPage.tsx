'use client';
import { Button, Col, Divider, Row } from 'antd';
import Image from 'next/image';
import formatDateByLocale from '@/helpers/formatDateByLocale';
import parseHTMLToReact from '@/helpers/parseHTMLToReact';
import { Blog } from '@/common/@types/blog.type';
import { useMediaQuery } from 'usehooks-ts';
import { breakpoints } from '@/common/constants/constants';
import TrendingBlogs from '@/components/common/TrendingBlogs';
import { ToolActionMobile } from '@/components/common/ToolActionMobile';
import BlogActions from '@/components/page/blog/details/BlogActions';
import BlogArticleAuthor from '@/components/page/blog/details/BlogArticleAuthor';
import BlogComments from '@/components/page/blog/details/BlogComments';
import AboutAuthorSummary from '@/components/page/blog/details/AboutAuthorSummary';
import Advertisement from '@/components/common/Advertisement';
import { MapCategoriesTag } from '@/components/page/home/BlogItem/BlogItem';
import useBlog from '@/hooks/useBlog';
import { BlogTypeCode } from '@/common/enums/blog.enum';
import Link from 'next/link';

interface BlogDetailPageProps {
  trendingBlog: Blog[];
}

export default function BlogDetailPage({ trendingBlog }: BlogDetailPageProps) {
  const isMobile = useMediaQuery(`(max-width:${breakpoints.md})`);
  const { blog } = useBlog();

  return (
    <>
      <Row>
        <Col md={4} xs={0} className='left-bar'>
          {!isMobile && <BlogActions />}
        </Col>
        <Col md={12} xs={24} className='blog-article-container'>
          <article className='blog-details-container'>
            <div className='blog-cover-img'>
              <Image
                src={blog.image || '/code_mely_avatar.jpg'}
                alt='Cover image'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                placeholder='blur'
                blurDataURL='/code_mely_avatar.jpg'
              />
            </div>
            <header>
              <div className='blog-meta'>
                <div className='flex justify-between mb-4'>
                  <p className='blog-published-date'>
                    Posted on {formatDateByLocale(new Date(blog.createTimestamp))}
                  </p>
                  {blog.blogTypeCode === BlogTypeCode.SHARE_BY_LINK && (
                    <Link href={blog.link || ''} target='_blank'>
                      <Button type='primary'>Read Post</Button>
                    </Link>
                  )}
                </div>
                <h1 className='blog-title'>{blog.title}</h1>
                <BlogArticleAuthor />
              </div>
            </header>
            <section className='blog-content'>{parseHTMLToReact(blog.content as string)}</section>
            <MapCategoriesTag categories={blog.categories} />
            <Divider style={{ marginBlock: '6rem' }} />
            <BlogComments />
          </article>
        </Col>
        <Col md={6} xs={0} className='right-bar'>
          {!isMobile && (
            <>
              <AboutAuthorSummary />
              <TrendingBlogs trendingBlog={trendingBlog} />
              <Advertisement />
            </>
          )}
        </Col>
      </Row>
      <ToolActionMobile isMobile={isMobile}>
        <BlogActions layout='horizontal' />
      </ToolActionMobile>
    </>
  );
}
