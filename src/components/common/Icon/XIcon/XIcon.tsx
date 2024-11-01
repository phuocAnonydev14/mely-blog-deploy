import Image from 'next/image';
import XIconStyle from './XIcon.style';

export interface XIconProps {
  width: number;
  height: number;
}

export default function XIcon(props: XIconProps) {
  return (
    <XIconStyle {...props}>
      <Image src='/x-icon.svg' alt='X icon' width={props.width} height={props.height} className='x-icon' />
    </XIconStyle>
  );
}
