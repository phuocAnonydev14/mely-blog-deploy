'use client';
import { Col, Form, Input, Row } from 'antd';
import { BlogTypeCode } from '@/common/enums/blog.enum';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import axios from 'axios';
import Link from 'next/link';
import { BlogField } from '@/hooks/useBlogFormAction';
import { urlToFile } from '@/helpers/urlToFile';

interface LinkRefProps {
  link: string;
  blogTypeCode: BlogTypeCode;
  description: string;
  handleUpdateField: (val: Partial<BlogField>) => void;
  content: string;
}

interface PreviewLinks {
  title: string;
  description: string;
  image: string;
}

export const LinkRef = (props: LinkRefProps) => {
  const { handleUpdateField, link, content } = props;
  const [previewLinks, setPreviewLinks] = useState<PreviewLinks>({
    image: '',
    title: '',
    description: '',
  });
  const [form] = useForm();
  const [linkDebounce] = useDebounce(form.getFieldValue('link'), 1000);

  const handleTriggerOnChangeValue = (field: string) => {
    setTimeout(() => {
      const isErrorInput = form.getFieldError(field);
      if (isErrorInput.length <= 0) {
        const valInput = form.getFieldValue(field);
        handleUpdateField({ [field]: valInput });
      }
    }, 1);
  };

  useEffect(() => {
    (async () => {
      try {
        if (!linkDebounce) {
          handleUpdateField({
            title: '',
            tempFileIdsList: '',
            description: '',
          });
          return;
        }
        const data = (await axios.get(`/api/preview?url=${linkDebounce}`)).data;
        setPreviewLinks(data.data);
        const imageFile = await urlToFile(
          data.data.image,
          data.data.title.toLowerCase().replaceAll(' ', '-'),
          'image/jpeg',
        );

        const formData = new FormData();
        formData.append('file', imageFile);
        // formData.append('eventId', '00');
        // const res = (await blogService.addTempFile(formData)) as any;
        handleUpdateField({
          title: data.data.title || 'fa',
          // tempFileIdsList: res?.data?.id,
          description: data.data.description,
        });
      } catch (e) {
        console.log('error', e);
      }
    })();
  }, [linkDebounce]);

  useEffect(() => {
    form.setFieldValue('link', link);
    form.setFieldValue('content', content);
  }, [link]);

  return (
    <div>
      <h2 style={{ fontSize: '20px', marginBottom: 12, fontWeight: 600 }}>Link ref:</h2>
      <Form form={form}>
        <Row gutter={[10, 0]} className='mt-2'>
          <Col span={24}>
            <Form.Item
              name='link'
              rules={[{ pattern: /(https?:\/\/[^\s]+)/g, message: 'Invalid link' }, { whitespace: true }]}
            >
              <Input
                onChange={() => handleTriggerOnChangeValue('link')}
                style={{ backgroundColor: 'transparent' }}
                placeholder='Enter link...'
              />
            </Form.Item>
            {previewLinks.title && (
              <Link href={linkDebounce} target='_blank'>
                <PreviewBox {...previewLinks} />
              </Link>
            )}
          </Col>
          <Col span={24}>
            <Form.Item name='content'>
              <Input.TextArea
                onChange={() => handleTriggerOnChangeValue('content')}
                style={{ backgroundColor: 'transparent' }}
                placeholder='Enter content...'
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const PreviewBox = ({ image, title, description }: PreviewLinks) => {
  return (
    <div
      style={{ border: '1px solid #f0f0f0', borderRadius: '8px', padding: '10px' }}
      className='flex gap-8 items-center mb-5'
    >
      <div style={{ maxWidth: '40%' }}>
        <img style={{ objectFit: 'cover', maxHeight: '200px' }} src={image} alt={title} />
      </div>
      <div>
        <h3 style={{ fontSize: '24px' }} className='font-bold'>
          {title}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
