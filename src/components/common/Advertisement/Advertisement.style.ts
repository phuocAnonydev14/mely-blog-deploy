import styled from 'styled-components';

const AdvertisementStyle = styled.div`
  .advertisement {
    html[data-theme='dark'] & {
      background-color: #070c20;
    }

    html[data-theme='light'] & {
      background-color: #f5f5f5;
    }

    border-radius: 1.6rem;

    .ant-card-head-title {
      font-size: 1.2rem;
      text-transform: uppercase;

      html[data-theme='dark'] & {
        color: #bdbdbd;
      }

      html[data-theme='light'] & {
        color: #333333;
      }
    }

    .anticon {
      font-size: 1.6rem;
      transition: background-color 0.3s;
      padding: 1rem;
      border-radius: 50%;

      html[data-theme='dark'] &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      html[data-theme='light'] &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
`;

export default AdvertisementStyle;
