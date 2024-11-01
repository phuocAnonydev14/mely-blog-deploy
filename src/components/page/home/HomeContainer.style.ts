import styled from 'styled-components';

const HomeStyle = styled.div`
  --home-bg-color: rgba(59, 57, 57, 0.5);

  .home-container {
    background-color: var(--color-primary);
    padding-inline: 2rem;

    //.ant-col.ant-col-6 {
    //  display: flex;
    //  justify-content: center;
    //}

    &_items {
      margin: 0 auto;
      max-width: 1300px;
      overflow-y: scroll;
      scrollbar-width: none;
      padding: 2.5rem;
      width: 100%;
    }

    &_filter-bar {
      padding: 3% 10%;
      font-size: 2rem;
      font-weight: 400;

      a + a {
        margin-left: 6rem;
      }

      a {
        color: var(--white);
      }
    }

    &_navbar,
    &_discussion {
      position: fixed;
      overflow: scroll;
      scrollbar-width: none;
      top: 60px;
      bottom: 0;
      width: 100%;
      //max-width: 22rem;
      //border-radius: 3rem 3rem 0 0;
      padding: 3rem 0.5rem;
      //border-right: 1px solid rgba(70, 70, 70, 0.83);

      h2 {
        color: var(--white);
        text-align: center;
        font-weight: 600;
        font-size: 1.8rem;
        margin-bottom: 2.6rem;
      }
    }

    //.col-centered {
    //  display: flex;
    //  flex-direction: column;
    //  align-items: end;
    //}
  }
`;
export default HomeStyle;
