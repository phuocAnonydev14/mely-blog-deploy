import { MailOutlined } from '@ant-design/icons';
import EmailIconStyle from './EmailIcon.style';

export interface EmailIconProps {
  width: number;
  height: number;
}

export default function EmailIcon(props: EmailIconProps) {
  return (
    <EmailIconStyle {...props}>
      <MailOutlined />
    </EmailIconStyle>
  );
}
