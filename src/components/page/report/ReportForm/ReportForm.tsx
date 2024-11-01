'use client';
import React from 'react';
import { ReportFormStyle } from './ReportForm.style';
import Image from 'next/image';
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const ReportForm = () => {
  return (
    <ReportFormStyle>
      <div className='content'>
        <div className='content__heading'>
          <Image className='avatar' src='/code_mely_avatar.jpg' width={40} height={40} alt='' />
          <p>Tui tên em anh Hy</p>
        </div>
        <div className='content__body'>
          <Image className='report-thumbnail' src='/code_mely_avatar.jpg' width={350} height={250} alt='' />
          <Form layout='vertical'>
            <Form.Item
              label='Link'
              name='link'
              rules={[{ required: true, message: 'Please input your link!' }]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item
              label='Reason'
              name='reason'
              rules={[{ required: true, message: 'Please input your Reason!' }]}
            >
              <TextArea size='large' style={{ height: 200, resize: 'none' }} />
            </Form.Item>
            <Button className='submit-btn' size='large'>
              Report
            </Button>
          </Form>
        </div>
      </div>
    </ReportFormStyle>
  );
};

export default ReportForm;
