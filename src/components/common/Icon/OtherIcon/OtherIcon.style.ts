import styled from 'styled-components';
import { OtherIconProps } from './OtherIcon';

const OtherIconStyle = styled.div<OtherIconProps>`
  & {
    width: ${(props) => props.width / 10}rem;
    height: ${(props) => props.height / 10}rem;
    background-color: #d9d9d9;
    border-radius: 50%;
  }

  .three-dots-icon {
    padding: 1rem;
  }
`;

export default OtherIconStyle;
