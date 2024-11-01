import styled from 'styled-components';

const HeaderStyle = styled.div`
  box-shadow: rgba(0, 0, 0, 0.8) 0px 1px 4px;

  header {
    height: 68px;
    background-color: rgba(6, 9, 30, 0.94);
    width: 100%;
    padding-block: 1rem;
    position: fixed;
    top: 0;
    z-index: 100;
  }

  & + * {
    margin-top: 6.6rem;
  }

  .ant-flex {
    height: 100%;

    > div {
      display: flex;
      align-items: center;
    }
  }

  .header-title {
    font-weight: bold;
    font-size: 2.6rem;
    color: var(--yellow-primary);
  }

  .create-btn {
    font-size: 1.6rem;
    border-radius: 10rem;
    text-align: center;
    padding-inline: 2.5rem;
  }
`;

export default HeaderStyle;
