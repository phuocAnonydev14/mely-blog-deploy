import styled from 'styled-components';

const BlogArticleAuthorStyle = styled.div`
  .blog-article-author-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .blog-article-author {
    margin-top: 5rem;
    margin-bottom: 4rem;
    display: flex;
    align-items: center;
    gap: 1.2rem;

    & > * {
      cursor: pointer;
    }

    &-avatar {
      border-radius: 50%;
    }

    &-name {
      font-weight: 700;
      font-size: 1.6rem;
      transition: color 0.2s;

      &:hover {
        color: var(--yellow-primary);
      }
    }
  }

  .follow-author-btn {
    &.following {
      background-color: var(--success);
      border-color: var(--success);

      &:hover {
        background-color: var(--error);
        border-color: var(--error);
      }
    }
  }
`;

export default BlogArticleAuthorStyle;
