'use client';

import { Col, Flex, Input, Row } from 'antd';
import DraggableImageUpload from '@/components/common/DraggableImageUpload';
// import TextEditor from '@/components/common/TextEditor';
import React, { ChangeEventHandler } from 'react';
import { BlogField } from '@/hooks/useBlogFormAction';
import TextEditor from '@/components/common/TextEditor';
import { Blog } from '@/common/@types/blog.type';

interface AddBlogDefaultProps {
  field: BlogField;
  handleUpdateField: <K extends keyof BlogField>(key: K, value: BlogField[K]) => any;
  currentBlog?: Blog;
}
const MAX_TITLE_CHARACTERS_COUNT = 255;

export const AddBlogDefault = ({ field, handleUpdateField, currentBlog }: AddBlogDefaultProps) => {
  const handleTitleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    let newTitle = e.target.value;

    if (newTitle.length > MAX_TITLE_CHARACTERS_COUNT)
      newTitle = newTitle.substring(0, MAX_TITLE_CHARACTERS_COUNT);

    handleUpdateField('title', newTitle);
  };

  return (
    <Row gutter={[0, 40]} className='mb-4'>
      <Col span={24}>
        <DraggableImageUpload
          currentTempFile={field.tempFileIdsList as string}
          setCurrentTempFile={(value) => handleUpdateField('tempFileIdsList', value)}
          isEdit
          url={currentBlog?.image}
        />
      </Col>
      <Col span={24}>
        <Flex vertical align='flex-end'>
          <Input.TextArea
            variant='borderless'
            className='blog-title'
            placeholder='New post title here...'
            autoSize
            value={field.title}
            onChange={handleTitleChange}
            style={{ minHeight: '100px' }}
          />
          <div className='title-characters-counter'>
            {field.title.length} / {MAX_TITLE_CHARACTERS_COUNT}
          </div>
        </Flex>
      </Col>
      <Col span={24}>
        <TextEditor content={field.content} setContent={(val) => handleUpdateField('content', val)} />
      </Col>
    </Row>
  );
};
