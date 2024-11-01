import styled from 'styled-components';

const CommentTextareaStyle = styled.div`
  .blog-comments-form {
    display: flex;
    gap: 2rem;
  }

  .blog-comments-avatar {
    border-radius: 50%;
  }

  .blog-comments-textarea {
    width: 100%;

    & .submit-comment-btn {
      margin-top: 2rem;
    }

    & textarea {
      font-size: 1.8rem;
      padding: 1rem;
    }
  }

  .blog-comments-login-prompt {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    gap: 2rem;
    margin-block: 6rem;
  }

  .dismiss-comment-btn {
    margin-left: 1.2rem;
  }
`;

export default CommentTextareaStyle;
