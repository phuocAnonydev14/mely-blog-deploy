import styled from 'styled-components';

const MoreBlogsFromAuthorStyle = styled.div`
  p {
    font-size: 1.6rem;
  }

  .more-blogs-from-author {
    html[data-theme='dark'] & {
      background-color: #070c20;
    }

    html[data-theme='light'] & {
      background-color: #f5f5f5;
    }

    border-radius: 1.6rem;

    .ant-card-head-title {
      font-size: 1.17em;
    }

    .ant-card-body {
      padding: 0;
    }

    .article {
      width: 100%;

      &-title {
        html[data-theme='dark'] & {
          color: white;
        }

        html[data-theme='light'] & {
          color: black;
        }

        transition: color 0.3s;
      }

      &:hover .article-title {
        color: var(--yellow-primary);
      }
    }
  }

  .see-more-link {
    display: flex;
    justify-content: center;
    padding-block: 1rem;
  }
`;

export default MoreBlogsFromAuthorStyle;
