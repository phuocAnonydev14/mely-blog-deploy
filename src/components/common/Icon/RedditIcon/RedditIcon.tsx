import Image from 'next/image';

interface RedditIconProps {
  width: number;
  height: number;
}

export default function RedditIcon({ width, height }: RedditIconProps) {
  return <Image src='/reddit-logo.svg' alt='Reddit logo' width={width} height={height} />;
}
