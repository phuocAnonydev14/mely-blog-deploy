import Image from 'next/image';
import { ComponentProps } from 'react';

interface LinkedInIconProps {
  width: number;
  height: number;
}

export default function LinkedInIcon({ width, height }: LinkedInIconProps) {
  return <Image src='/linkedin-icon.svg' alt='LinkedIn logo' width={width} height={height} />;
}
