import blogContentStyle from '@/common/styles/blogContent.style';
import styled from 'styled-components';

const TextEditorStyle = styled.div`
  .ck-content {
    ${blogContentStyle}

    code {
      html[data-theme='light'] & {
        color: black;
      }

      html[data-theme='dark'] & {
        color: white;
      }
    }

    *:not(pre) > code {
      background-color: hsla(0, 0%, 78%, 0.3) !important;
    }
  }
`;

export default TextEditorStyle;
