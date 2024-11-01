import styled from 'styled-components';

const BlogCommentsStyle = styled.div`
  .blog-comments-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h2 {
    font-size: 2em;
    font-weight: 600;
  }

  .comments-sort-select {
    width: 10rem;
  }

  .blog-comments-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block: 6rem;

    & .anticon-loading {
      font-size: 4rem;
    }
  }

  .blog-comments-form {
    margin-block: 3rem;
  }
`;

export default BlogCommentsStyle;
