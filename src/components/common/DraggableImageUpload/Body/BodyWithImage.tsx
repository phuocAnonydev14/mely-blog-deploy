import Image from 'next/image';

interface BodyWithImageProps {
  imageUrl: string;
}

export default function BodyWithImage({ imageUrl }: BodyWithImageProps) {
  return (
    <Image
      src={imageUrl}
      alt=''
      fill
      sizes='(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw'
      quality={50}
    />
  );
}
