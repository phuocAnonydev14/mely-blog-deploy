'use client';

import { Form, Input, message, Modal, Typography } from 'antd';
import React from 'react';
import { REGEX_EMAIL } from '@/common/utils/string';
import userService, { IAddBookmarkCategory } from '@/services/UserService';
import Button, { EButtonTheme } from '@/components/common/Button/Button';
import { LoadingOutlined } from '@ant-design/icons';

interface IAddBookmarkModalProps {
  open: boolean;
  onCancel: () => void;
  onAddSuccess?: () => void;
}

export const AddBookmarkModal = ({ open, onCancel, onAddSuccess }: IAddBookmarkModalProps) => {
  const onFinish = async (vals: IAddBookmarkCategory) => {
    try {
      await userService.addBookmarkCategory(vals);
      message.success('Add bookmark category successfully!');
      onAddSuccess && onAddSuccess();
      onCancel();
    } catch (e) {
      message.error('Add bookmark category failed!');
    }
  };

  return (
    <Modal footer={null} open={open} onCancel={onCancel}>
      <Typography.Title level={3} className={'flex justify-center'}>
        Add Bookmark Category
      </Typography.Title>

      <Form layout='vertical' onFinish={onFinish}>
        <Form.Item<IAddBookmarkCategory>
          name={'bookmarkCategoryName'}
          label={'Name'}
          required={true}
          rules={[
            {
              required: true,
              message: 'Please enter your bookmark category name!',
            },
          ]}
        >
          <Input placeholder={'Ender Bookmark category name...'} />
        </Form.Item>
        <Form.Item<IAddBookmarkCategory>
          name={'description'}
          label={'Description'}
          required={true}
          rules={[
            {
              required: true,
              message: 'Please enter your description!',
            },
          ]}
        >
          <Input placeholder={'Enter description...'} />
        </Form.Item>
        <Button block htmlType='submit' className={'btn-submit mt-2'} color={EButtonTheme.PRIMARY}>
          Add
        </Button>
      </Form>
    </Modal>
  );
};
