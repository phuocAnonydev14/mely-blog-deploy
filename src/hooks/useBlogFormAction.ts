'use client';

import { useEffect, useState } from 'react';
import blogService from '@/services/BlogService';
import { BlogTypeCode } from '@/common/enums/blog.enum';
import { message } from 'antd';
import { cleanObject } from '@/common/utils/cleanObject';
import { useRouter } from 'next/navigation';
import { Blog } from '@/common/@types/blog.type';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const defaultField = {
  tempFileIdsList: '',
  content: '',
  title: '',
  tagIdsList: [],
  link: '',
  blogTypeCode: BlogTypeCode.DEFAULT,
  description: '',
};

export type BlogField = {
  tempFileIdsList: string | string[];
  content: string;
  title: string;
  tagIdsList: string[];
  link: string;
  blogTypeCode: BlogTypeCode;
  description: string;
};
export const useBlogFormAction = (action: 'edit' | 'create', currentBlog?: Blog) => {
  const [field, setField] = useState<BlogField>(defaultField);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleUpdateField = <K extends keyof BlogField>(key: K, value: BlogField[K]) => {
    setField((state) => ({ ...state, [key]: value }));
  };

  const handleSetInitField = (field: BlogField) => {
    setField(field);
  };

  const handleSetField = (val?: Partial<BlogField>) => {
    setField((state) => ({ ...field, ...(val || {}) }));
  };

  const handleSubmit = async () => {
    try {
      if (!field.title) {
        message.error('Please enter required field!');
        return;
      }
      setIsSubmitting(true);
      const dispatchField = cleanObject(field);
      if (dispatchField.tempFileIdsList) {
        dispatchField.tempFileIdsList = [dispatchField.tempFileIdsList as string];
      }
      if (!dispatchField.description) {
        dispatchField.description = '...';
      }
      switch (action) {
        case 'create': {
          console.log('start create');
          const res = await blogService.create(dispatchField);
          console.log(res);
          setField(defaultField);
          message.success('Create blog successfully');
          break;
        }
        case 'edit':
          if (!currentBlog) return;
          const timeZone = 'Asia/Ho_Chi_Minh';
          const utcDate = new Date(currentBlog.createTimestamp);
          const zonedDate = toZonedTime(utcDate, timeZone);
          const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ss.SSSXXX');
          console.log('start edit');
          const res = await blogService.updateBlog(currentBlog.blogId, {
            ...field,
            // updateTimestamp:formattedDate,
          });
          message.success('Update blog successfully');
      }
      router.push('/');
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    console.log('field changed', field);
  }, [field]);

  return [
    { field, isSubmitting },
    { handleUpdateField, handleSubmit, handleSetInitField, handleSetField },
  ] as const;
};
