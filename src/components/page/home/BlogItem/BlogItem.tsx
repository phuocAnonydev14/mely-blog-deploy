import { Tag } from 'antd';
import BlockItemStyle from './BlockItem.style';
import { Blog, Category } from '@/common/@types/blog.type';
import moment from 'moment';
import Link from 'next/link';
import parseHTMLToReact from '@/helpers/parseHTMLToReact';
import { BlogTypeCode } from '@/common/enums/blog.enum';
import axios from 'axios';
import { useEffect, useState } from 'react';
export interface TempPostType {
  userName: string;
  title: string;
  time: Date;
  postImgUrl: string;
  avatarUrl: string;
}

interface Props {
  post: Blog;
  dir: 'col' | 'row';
}

const cateColors = ['#3538CD', '#C11574', '#C11574'];

const handleFetchBlogWithLinkRef = async (link: string) => {
  try {
    const data = (await axios.get(`/api/preview?url=${link}`)).data;
    return data.data;
  } catch (e) {}
};

const BlogItem = (props: Props) => {
  const { dir, post } = props;
  console.log(post);

  const { blogId, content, title, blogTypeCode, categories, image, createTimestamp, description } = post;

  const [blogInfo, setBlogInfo] = useState({
    content,
    title,
    image,
  });

  useEffect(() => {
    const checkBlogLinkRef = async () => {
      if (blogTypeCode === BlogTypeCode.SHARE_BY_LINK) {
        try {
          const blogLinkRef = await handleFetchBlogWithLinkRef(post.link || '');
          setBlogInfo({
            content: blogLinkRef.description,
            image: blogLinkRef.image,
            title: blogLinkRef.title,
          });
        } catch (e) {
          console.log(e);
        }
      }
    };
    checkBlogLinkRef().finally();
  }, []);

  return (
    <BlockItemStyle key={blogId} className={`flex flex-${dir} gap-16`}>
      <div
        style={{
          width: dir === 'col' ? '100%' : '50%',
          height: dir === 'col' ? '228px' : '210px',
        }}
      >
        <img
          className='image'
          loading='lazy'
          srcSet={
            blogInfo.image ||
            'https://www.shutterstock.com/image-photo/elearning-education-internet-lessons-online-600nw-2158034833.jpg'
          }
          src={
            blogInfo.image ||
            'https://www.shutterstock.com/image-photo/elearning-education-internet-lessons-online-600nw-2158034833.jpg'
          }
          width={100}
          height={100}
          alt={''}
          style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
        />
      </div>
      <div className='content' style={{ width: dir === 'col' ? '100%' : '50%' }}>
        <span className='time'>{moment(createTimestamp).fromNow()}</span>
        <Link href={`/blog/${post.blogId}`} target={'_self'}>
          <div className='flex justify-between gap-5'>
            <p className='title mt-0'>{blogInfo.title}</p>

            {BlogTypeCode.SHARE_BY_LINK === blogTypeCode && (
              <svg
                className='navigate-arrow'
                style={{ transform: 'translateY(8px)' }}
                cursor='pointer'
                width='40px'
                height='12'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 11L11 1M11 1H1M11 1V11'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
          </div>
        </Link>

        <span className='content'>
          <section className='blog-content'>{parseHTMLToReact(blogInfo.content || 'Blog content')}</section>
        </span>
        <MapCategoriesTag categories={categories} />
      </div>
    </BlockItemStyle>
  );
};
export default BlogItem;

export const MapCategoriesTag = ({ categories }: { categories: Category[] }) => {
  return (
    <div className='flex gap-2 mt-1 flex-wrap'>
      {categories.map((category, index) => {
        if (!category.categoryId) return;
        return (
          <Tag
            key={category.categoryId}
            style={{ background: cateColors[index], fontWeight: 600 }}
            color='#6941C6'
            bordered={false}
          >
            {category.name}
          </Tag>
        );
      })}
    </div>
  );
};
