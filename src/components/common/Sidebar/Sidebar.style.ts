import styled from 'styled-components';

const SidebarStyle = styled.div`
  margin-top: 30px;
  background: #2a2a2a;
  width: 100%;
  height: calc(100vh - 70px);
  padding: 20px;
  border-radius: 22px;
  .sidebar__heading {
    display: flex;
    align-items: center;
    gap: 10px;
    .avatar {
      border-radius: 50%;
    }
    p {
      font-size: 1.6rem;
      font-weight: bold;
    }
  }
  .sidebar__content {
    padding-top: 40px;
    .navbar {
      font-size: 1.8rem;
      li {
        margin-bottom: 40px;
        & > p {
          font-weight: bold;
        }
      }
      .subnav {
        margin-top: 20px;
        font-size: 1.6rem;
        &-item {
          display: flex;
          gap: 10px;
          margin-bottom: 6px;
          cursor: pointer;
          transition: all 0.1s linear;
          &:hover {
            color: #faa41d;
          }
        }
      }
    }
  }
`;

export { SidebarStyle };
