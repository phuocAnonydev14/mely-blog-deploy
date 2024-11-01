import { Button, Col, Row, Upload, UploadFile } from 'antd';
import DraggableImageUploadStyle from './DraggableImageUpload.style';
import { DeleteOutlined } from '@ant-design/icons';
import Body from '@/components/common/DraggableImageUpload/Body';
import useImageUpload from '@/hooks/useUploadImage';
import { useEffect } from 'react';

export interface DraggableImageUploadProps {
  currentTempFile: string;
  setCurrentTempFile: (val: string) => void;
  url?: string;
  isEdit?: boolean;
}

export default function DraggableImageUpload(props: DraggableImageUploadProps) {
  const {
    isUploading,
    imageUrl,
    onUploadImageStatusChange,
    handleValidateImage,
    handleUploadImage,
    handleRemoveImage,
    setImageUrl,
  } = useImageUpload(props);
  const defaultFileList = [
    {
      uid: '1',
      name: 'example.png',
      status: 'done',
      url: props?.url,
      visible: !!props?.url,
    },
  ].filter((item) => item.visible) as UploadFile<any>[];

  useEffect(() => {
    if (props.url) {
      setImageUrl(props.url);
    }
  }, []);

  return (
    <DraggableImageUploadStyle>
      <Row align='middle' justify='center' gutter={[0, 32]}>
        <Col span={24}>
          <Upload.Dragger
            accept='image/*'
            showUploadList={false}
            onChange={onUploadImageStatusChange}
            beforeUpload={handleValidateImage}
            customRequest={handleUploadImage}
            maxCount={1}
            disabled={isUploading}
            defaultFileList={defaultFileList}
          >
            <Body isUploading={isUploading} imageUrl={imageUrl} />
          </Upload.Dragger>
        </Col>
        {imageUrl && (
          <Col>
            <Button type='primary' danger icon={<DeleteOutlined />} onClick={handleRemoveImage}>
              Remove
            </Button>
          </Col>
        )}
      </Row>
    </DraggableImageUploadStyle>
  );
}
