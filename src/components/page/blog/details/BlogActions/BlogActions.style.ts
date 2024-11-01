import styled from 'styled-components';

const BlogActionsStyle = styled.div`
  .blog-actions {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    align-items: flex-end;
    justify-content: start;
  }

  .anticon {
    font-size: 2.8rem;
    cursor: pointer;
    transition: all 0.2s;

    html[data-theme='dark'] & {
      color: white;
    }

    html[data-theme='light'] & {
      color: black;
    }

    html[data-theme='dark'] &:hover,
    html[data-theme='light'] &:hover {
      color: var(--yellow-primary) !important;
    }
  }

  .social-icons-carousel {
    padding-block: 2rem;
  }
`;

export default BlogActionsStyle;
