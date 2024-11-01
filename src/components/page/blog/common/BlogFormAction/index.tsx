'use client';

import { Button, Col, Row, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import BlogFormActionStyle from './BlogFormAction.style';
import { Blog } from '@/common/@types/blog.type';
import { BlogTypeCode } from '@/common/enums/blog.enum';
import { useMediaQuery } from 'usehooks-ts';
import { breakpoints } from '@/common/constants/constants';
import { ToolActionMobile } from '@/components/common/ToolActionMobile';
import { LinkRef } from '@/components/page/blog/common/BlogFormAction/LinkRef';
import { CategorySelector } from '@/components/common/Select/CategorySelector';
import { AddBlogDefault } from '@/components/page/blog/common/BlogFormAction/AddBlogDefault';
import { defaultField, useBlogFormAction } from '@/hooks/useBlogFormAction';

const MAX_TITLE_CHARACTERS_COUNT = 255;

const BlogFormAction = ({ action, blog }: { action: 'edit' | 'create'; blog?: Blog }) => {
  const [{ field, isSubmitting }, { handleUpdateField, handleSubmit, handleSetInitField, handleSetField }] =
    useBlogFormAction(action, blog);
  const isEditBlog = action === 'edit';
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md})`);
  const [postMode, setPostMode] = useState(BlogTypeCode.DEFAULT);
  useEffect(() => {
    if (blog) {
      const field = {
        tempFileIdsList: '',
        content: blog.content || '',
        title: blog.title || '',
        tagIdsList: blog.categories.filter((item) => item.name).map((item) => item.name as string),
        link: blog.link || '',
        blogTypeCode: blog.blogTypeCode || BlogTypeCode.DEFAULT,
        description: blog.description || '',
      };
      handleSetInitField(field);
      blog.blogTypeCode && setPostMode(blog.blogTypeCode);
    }
  }, [blog]);

  console.log('blog', blog);

  return (
    <BlogFormActionStyle>
      <Row justify='center' gutter={[0, 20]}>
        <Col md={24} lg={14}>
          <h1>{!isEditBlog ? 'Create' : 'Edit'} Post</h1>
          <>
            {!isEditBlog && (
              <Tabs
                defaultActiveKey='1'
                style={{ textTransform: 'capitalize' }}
                items={Object.keys(BlogTypeCode).map((value) => ({
                  // @ts-ignore
                  key: BlogTypeCode[value],
                  label: value.toLowerCase().replaceAll('_', ' '),
                }))}
                onChange={(val) => {
                  setPostMode(val as any);
                  console.log('val', val);
                  handleSetField({ ...defaultField, blogTypeCode: val as any });
                }}
              />
            )}
          </>
        </Col>
        <Col md={24} lg={14}>
          {postMode === BlogTypeCode.DEFAULT ? (
            <AddBlogDefault field={field} handleUpdateField={handleUpdateField} currentBlog={blog} />
          ) : (
            <div className='flex gap-4 flex-col'>
              <LinkRef
                content={field.content}
                link={field.link}
                description={field.description}
                blogTypeCode={field.blogTypeCode}
                handleUpdateField={handleSetField}
              />
              {/*<Advertisement/>*/}
            </div>
          )}
          <CategorySelector
            setTagIdsList={(val) => handleUpdateField('tagIdsList', val)}
            tagIdsList={field.tagIdsList}
          />
          {/*	<Col*/}
          {/*		md={24}*/}
          {/*		lg={6}*/}
          {/*		className='right-bar'*/}
          {/*		style={{overflow: 'hidden', paddingInline: !isMobile ? '3rem 0' : '1rem'}}*/}
          {/*	>*/}
          {/*		{!isMobile && (*/}
          {/*			<Flex vertical className='buttons-group' gap='small'>*/}
          {/*				<Button type='primary' loading={isSubmitting} onClick={handleSubmit}>*/}
          {/*					{isEditBlog ? 'Edit' : 'Publish'}*/}
          {/*				</Button>*/}
          {/*				<Button type='default'>Save as draft</Button>*/}
          {/*			</Flex>*/}
          {/*		)}*/}
          {/*		<CategorySelector*/}
          {/*			setTagIdsList={(val) => handleUpdateField('tagIdsList', val)}*/}
          {/*			tagIdsList={field.tagIdsList}*/}
          {/*		/>*/}
          {/*		<LinkRef*/}
          {/*			link={field.link}*/}
          {/*			description={field.description}*/}
          {/*			blogTypeCode={field.blogTypeCode}*/}
          {/*			handleUpdateField={handleUpdateField}*/}
          {/*		/>*/}
          {/*		<Advertisement/>*/}
          {/*	</Col>*/}
        </Col>
        <Col md={24} lg={14} style={{ direction: 'rtl' }}>
          <Button
            type='primary'
            style={{ paddingInline: '50px' }}
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            {isEditBlog ? 'Edit' : 'Publish'}
          </Button>
        </Col>
      </Row>

      <ToolActionMobile isMobile={isMobile}>
        <Button style={{ minWidth: '200px' }} type='primary' loading={isSubmitting} onClick={handleSubmit}>
          {isEditBlog ? 'Edit' : 'Publish'}
        </Button>
      </ToolActionMobile>
    </BlogFormActionStyle>
  );
};

export default BlogFormAction;
