import styled from 'styled-components';
import { EmailIconProps } from './EmailIcon';

const padding = 1.5;

const EmailIconStyle = styled.div<EmailIconProps>`
  & {
    width: ${(props) => props.width / 10}rem;
    height: ${(props) => props.height / 10}rem;
    padding: ${padding}rem;
    background: #888888;
    border-radius: 50%;
  }

  .anticon-mail {
    font-size: ${(props) => props.width / 10 - padding * 2}rem;
  }
`;

export default EmailIconStyle;
