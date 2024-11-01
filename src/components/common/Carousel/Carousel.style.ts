import styled from 'styled-components';

const CarouselStyle = styled.div`
  .carousel {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
  }

  .carousel-nav {
    align-self: flex-end;

    .left-btn {
      margin-right: 1rem;
    }
  }

  .carousel-items {
    display: flex;
    gap: 2rem;
    overflow: hidden;
  }
`;

export default CarouselStyle;
