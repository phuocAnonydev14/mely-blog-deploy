import styled from 'styled-components';

const HeaderMenuStyle = styled.div`
  display: flex;
  align-items: center;
  .anticon-menu {
    font-size: 2.6rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover,
    &:focus {
      color: var(--yellow-primary);
    }

    &:active {
      opacity: 0.7;
    }
  }
  .header-menu-username {
    font-weight: bold;
  }

  .ant-dropdown-menu {
    margin-top: 0.5rem;
  }
`;

export default HeaderMenuStyle;
