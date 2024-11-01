import styled from 'styled-components';

const BlogFormActionStyle = styled.section`
  & {
    padding-top: 3rem;
  }

  h1 {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 3rem;
  }

  .blog-title {
    font-size: 4rem;
    font-weight: 900;
  }

  .right-bar {
    //padding-left: 3rem;
    position: sticky;
    top: 9.5rem;
    display: flex;
    flex-direction: column;
    gap: 2.8rem;
    height: 85vh;
    overflow-y: scroll;
    overscroll-behavior: contain;
  }

  .buttons-group {
    html[data-theme='dark'] & {
      background-color: var(--charcoal);
    }

    html[data-theme='light'] & {
      background-color: #f5f5f5;
    }

    box-shadow: 0 0 1.6rem rgba(0, 0, 0, 0.2);
    padding: 1.4rem;
    border-radius: 1rem;
  }
`;

export default BlogFormActionStyle;
