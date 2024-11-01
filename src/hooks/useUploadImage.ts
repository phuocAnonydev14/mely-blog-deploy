import { useState } from 'react';
import useAntMessage from './useAntMessage';
import { UploadProps } from 'antd';
import blogService from '@/services/BlogService';
import { DraggableImageUploadProps } from '@/components/common/DraggableImageUpload/DraggableImageUpload';

interface UseImageUploadValue {
  isUploading: boolean;
  imageUrl: string;
  onUploadImageStatusChange: UploadProps['onChange'];
  handleValidateImage: UploadProps['beforeUpload'];
  handleUploadImage: UploadProps['customRequest'];
  handleRemoveImage: () => void;
  setImageUrl: (imageUrl: string) => void;
}

export const MAX_SIZE_IN_BYTES = 1 * 1024 ** 2;

export default function useImageUpload({
  currentTempFile,
  setCurrentTempFile,
}: DraggableImageUploadProps): UseImageUploadValue {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const messageApi = useAntMessage();

  const onUploadImageStatusChange: UploadProps['onChange'] = async (info) => {
    if (info.file.status === 'uploading') {
      setIsUploading(true);
      return;
    }

    console.log('start upload file');

    setIsUploading(false);
    if (info.file.status === 'done') {
      try {
        messageApi.success(`${info.file.name} file uploaded successfully!`);
      } catch (e) {
        console.log(e);
      }
      return;
    }

    if (info.file.status === 'error') {
      messageApi.error(`${info.file.name} file upload failed!`);
      return;
    }
  };

  const handleValidateImage: UploadProps['beforeUpload'] = (file) => {
    const isImageFile = file.type.startsWith('image/');
    if (!isImageFile) {
      messageApi.error('You can only upload image file!');
      return false;
    }

    const isLargerThanMaxSize = file.size < MAX_SIZE_IN_BYTES;
    if (!isLargerThanMaxSize) {
      messageApi.error(`Image must smaller than ${MAX_SIZE_IN_BYTES / 1024 ** 2}MB!`);
      return false;
    }

    return true;
  };

  const handleUploadImage: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    try {
      if (typeof file !== 'string' && file instanceof File) {
        const formData = new FormData();
        formData.append('file', file as any);
        formData.append('eventId', '00');
        const res = (await blogService.addTempFile(formData)) as any;
        setCurrentTempFile(res?.data?.id);
        setImageUrl(res?.data?.url);
        onSuccess?.(res.data);
      }
    } catch (err: any) {
      onError?.(err);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl('');
  };

  return {
    setImageUrl,
    isUploading,
    imageUrl,
    onUploadImageStatusChange,
    handleValidateImage,
    handleUploadImage,
    handleRemoveImage,
  };
}
