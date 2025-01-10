import styled from 'styled-components';
const BlockItemStyle = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid rgba(63, 63, 63, 0.74);
  border-radius: 10px;
  overflow: hidden;

  &:hover {
    border: 1px solid rgba(111, 111, 111, 0.74);
    transition: all 0.3s ease-in-out;
  }

  //&:hover {
  //  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  //}

  .ant-image {
    width: 100%;
    height: 100%;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
    flex-grow: 1;
    padding: 20px;

    .time {
      color: #6941c6;
      font-size: 14px;
      font-weight: 600;
    }

    .title {
      font-size: 24px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* number of lines to show */
      -webkit-box-orient: vertical;
      line-height: 32px;
      color: #eaeaea;
    }

    .navigate-arrow {
      transform: translateY(8px);

      &:hover path {
        stroke: var(--yellow-primary) !important;
      }
    }

    .content {
      color: #c0c5d0;
      font-size: 16px;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* number of lines to show */
      -webkit-box-orient: vertical;
      max-height: 100px;
    }
  }
`;
export default BlockItemStyle;
