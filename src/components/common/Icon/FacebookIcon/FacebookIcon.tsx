import Image from 'next/image';

interface FacebookIconProps {
  width: number;
  height: number;
}

export default function FacebookIcon({ width, height }: FacebookIconProps) {
  return <Image src='/facebook-icon.svg' alt='Facebook icon' width={width} height={height} />;
}
