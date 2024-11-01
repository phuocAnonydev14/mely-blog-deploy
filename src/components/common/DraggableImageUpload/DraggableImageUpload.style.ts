import styled from 'styled-components';

const DraggableImageUploadStyle = styled.div`
  .ant-upload-btn {
    position: relative;
    overflow: hidden;
    min-height: 30rem;
  }

  img {
    object-fit: cover;
  }

  .body-no-image {
    &::before {
      content: '';
      background-color: black;
      opacity: 0.6;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }

  .placeholder-image {
    z-index: -11;
    filter: blur(1rem);
  }

  .ant-upload-drag-icon,
  .ant-upload-text,
  .ant-upload-hint {
    position: relative;
    z-index: 11;
  }
`;

export default DraggableImageUploadStyle;
