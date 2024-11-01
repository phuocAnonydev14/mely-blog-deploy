import BodyNoImage from './BodyNoImage';
import BodyUploading from './BodyUploading';
import BodyWithImage from './BodyWithImage';

interface BodyProps {
  isUploading: boolean;
  imageUrl: string;
}

export default function Body({ isUploading, imageUrl }: BodyProps) {
  if (isUploading) return <BodyUploading />;

  if (imageUrl) return <BodyWithImage imageUrl={imageUrl} />;

  return <BodyNoImage />;
}
