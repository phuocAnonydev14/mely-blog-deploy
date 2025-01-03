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

interface BlogFormActionProps {
  action: 'edit' | 'create';
  blog?: Blog;
}

const BlogFormAction = ({ action, blog }: BlogFormActionProps) => {
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
            </div>
          )}
          <h2 style={{ fontSize: '20px', marginBottom: 12, fontWeight: 600 }}>Select categories: </h2>
          <CategorySelector
            setTagIdsList={(val) => handleUpdateField('tagIdsList', val)}
            tagIdsList={field.tagIdsList}
            allowAddNew
          />
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
