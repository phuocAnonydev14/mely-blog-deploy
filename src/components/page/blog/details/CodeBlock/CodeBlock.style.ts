import styled from 'styled-components';

const CodeBlockStyle = styled.div`
  pre {
    tab-size: 2;
    position: relative;
  }

  .codeblock-copy-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  code {
    border-radius: 0.5rem;
    margin-block: 1.6rem;
  }
`;

export default CodeBlockStyle;
