import styled from 'styled-components';

const NavbarStyle = styled.div`
  .navbar {
    width: 100%;
    &_item {
      margin-bottom: 4rem;
      width: 100%;
      h3 {
        color: var(--white);
        font-weight: 700;
        margin-bottom: 1.5rem;
      }
      a {
        color: var(--white);
        font-weight: 400;

        &:hover {
          color: white;
        }
      }
      &__route {
        font-size: 1.6rem;
        font-weight: 200;
        margin-bottom: 1.5rem;
        width: 100%;
      }
    }
    &_item:last-child {
      margin-top: 7rem;
    }
  }
`;

export default NavbarStyle;
