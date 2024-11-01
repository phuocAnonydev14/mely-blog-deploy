import LoadingIndicator from '@/components/common/Icon/LoadingIndicator';

export default function BodyUploading() {
  return (
    <>
      <p className='ant-upload-drag-icon'>
        <LoadingIndicator />
      </p>
      <p className='ant-upload-text'>Uploading...</p>
      <p className='ant-upload-hint'></p>
    </>
  );
}
