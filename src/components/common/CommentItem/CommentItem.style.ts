import blogContentStyle from '@/common/styles/blogContent.style';
import styled from 'styled-components';

const CommentItemStyle = styled.div`
  .ant-card {
    position: relative;
    overflow: hidden;

    &-body {
      padding-block: 1rem;
      padding-inline: 1.4rem;
    }
  }

  .anticon {
    font-size: 1.8rem;
  }

  .lucide {
    transition: all 0.3s;
    cursor: pointer;

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &-thumbs-up:hover:not(.disabled),
    &-thumbs-up.activated {
      color: #0091ff;
    }

    &-thumbs-down:hover:not(.disabled),
    &-thumbs-down.activated {
      color: red;
    }

    &-message-circle-more:hover:not(.disabled),
    &-message-circle-more.activated {
      color: var(--yellow-primary);
    }
  }

  .anticon-more {
    transition: all 0.3s;
    cursor: pointer;
  }

  .comment-item {
    &-disabled-cover {
      position: absolute;
      width: 100%;
      height: 100%;
      inset: 0;
      background-color: transparent;
      z-index: 99;
      cursor: not-allowed;
      user-select: none;
      pointer-events: none;
    }

    &-subtitle {
      opacity: 0.5;
      font-weight: normal;
    }

    &-content {
      margin-top: 1.2rem;
      ${blogContentStyle}
    }

    &-actions {
      margin-top: 0.8rem;
      display: flex;
      align-items: center;
      font-size: 1.8rem;
      gap: 3rem;
    }
  }

  .vote-btn-container {
    display: flex;
    align-items: center;
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
