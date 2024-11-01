import styled from 'styled-components';

const ShareBlogModalStyle = styled.div`
  a {
    text-decoration: none;
    color: inherit;
  }

  .social-carousel {
    & .carousel-items {
      gap: 1rem;
    }

    & .social-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
      cursor: pointer;
      border-radius: 0.5rem;
      padding: 0.5rem;
      transition: background-color 0.2s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }

      &:active {
        background-color: transparent;
      }
    }
  }
`;

export default ShareBlogModalStyle;
