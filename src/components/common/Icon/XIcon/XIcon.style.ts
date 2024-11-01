import styled from 'styled-components';
import { XIconProps } from './XIcon';

const XIconStyle = styled.div<XIconProps>`
  & {
    border-radius: 50%;
    background-color: white;
    width: ${(props) => props.width / 10}rem;
    height: ${(props) => props.height / 10}rem;
  }

  .x-icon {
    padding: 1.5rem;
  }
`;

export default XIconStyle;
