import Image from 'next/image';
import { PictureOutlined } from '@ant-design/icons';

export default function BodyNoImage() {
  return (
    <div className='body-no-image'>
      <Image
        src='/code_mely_avatar.jpg'
        alt=''
        fill
        sizes='(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw'
        quality={50}
        className='placeholder-image'
      />
      <p className='ant-upload-drag-icon'>
        <PictureOutlined />
      </p>
      <p className='ant-upload-text'>Click or drag an image file to this area to upload</p>
      <p className='ant-upload-hint'>Support for any type of image file, up to 1MB</p>
    </div>
  );
}
