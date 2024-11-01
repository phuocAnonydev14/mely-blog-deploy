import styled from 'styled-components';

const VoteButtonStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;

  .vote-count {
    font-size: 2.8rem;
    font-weight: 600;
  }

  .upvote-btn {
    &.activated,
    &:hover {
      color: var(--success) !important;
    }
  }

  .downvote-btn {
    &.activated,
    &:hover {
      color: var(--error) !important;
    }
  }
`;

export default VoteButtonStyle;
