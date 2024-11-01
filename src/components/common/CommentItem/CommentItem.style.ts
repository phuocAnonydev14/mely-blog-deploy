import blogContentStyle from '@/common/styles/blogContent.style';
import styled from 'styled-components';

const CommentItemStyle = styled.div`
  .comment-item {
    &-subtitle {
      opacity: 0.5;
      font-weight: normal;
    }

    &-content {
      margin-top: 1.6rem;
      ${blogContentStyle}
    }

    &-actions {
      margin-top: 1.2rem;
      display: flex;
      font-size: 1.8rem;
      gap: 3rem;

      & .anticon {
        transition: all 0.2s;
        cursor: pointer;

        &:hover {
          color: var(--yellow-primary);
        }

        &.disabled {
          opacity: 0.3;
          pointer-events: none;
          cursor: default;
        }

        &.activated {
          color: var(--yellow-primary);
        }
      }

      & .anticon-caret-up {
        font-size: 2.6rem;

        &:hover,
        &.activated {
          color: var(--success);
        }
      }

      & .anticon-caret-down {
        font-size: 2.6rem;

        &:hover,
        &.activated {
          color: var(--error);
        }
      }

      & .anticon-delete {
        &:hover,
        &.activated {
          color: var(--error);
        }
      }
    }
  }

  .vote-btn-container {
    display: flex;
    gap: 0.6rem;
  }

  .show-reply-btn {
    transition: all 0.2s;

    &:hover,
    &:active {
      color: var(--yellow-primary) !important;
    }
  }
`;

export default CommentItemStyle;
