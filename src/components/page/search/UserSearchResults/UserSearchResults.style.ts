import styled from 'styled-components';

const UserSearchResultsStyle = styled.div`
  .user-search-result {
    position: relative;
    height: 300px;

    &-content {
      width: 100%;
      position: absolute;
      left: 0;
      top: 20%;
    }

    &-bg {
      width: 100%;
      height: 100px;
      object-fit: cover;
    }

    &-username {
      font-weight: 600;
      font-size: 1.8rem;
      color: white;
      transition: all 0.3s;

      &:hover {
        color: var(--yellow-primary);
      }
    }
  }
`;

export default UserSearchResultsStyle;
