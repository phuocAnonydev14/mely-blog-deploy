import Image from 'next/image';
import OtherIconStyle from './OtherIcon.style';

export interface OtherIconProps extends React.ComponentProps<'div'> {
  width: number;
  height: number;
}

export default function OtherIcon(props: OtherIconProps) {
  return (
    <OtherIconStyle {...props}>
      <Image
        src='/three-dots-logo.svg'
        alt='Three dots'
        width={props.width}
        height={props.height}
        className='three-dots-icon'
      />
    </OtherIconStyle>
  );
}
