import styled from 'styled-components';
const DiscussionStyle = styled.div`
  .discussions {
    font-size: 1.6rem;
    div + div {
      margin-top: 2rem;
    }
    &__item {
      display: flex;
      flex-direction: column;
      line-height: 1.6;
      font-weight: 400;
      a {
        color: #c8c8c8;
        font-weight: 100;
      }
    }
  }
`;
export default DiscussionStyle;
