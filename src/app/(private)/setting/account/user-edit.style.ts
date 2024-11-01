import styled from 'styled-components';

export const UserEditStyle = styled.div`
  border: 1px solid white;
  border-bottom: none;
  border-top: none;
  height: 90vh;
  overflow: hidden;
  position: relative;

  .form-action {
    height: 80%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0 10%;

    .image-background {
      width: 100%;
      min-width: 280px;
      margin-top: 20px;

      .ant-upload-btn {
        height: 120px;
        min-height: 120px;
      }
    }

    .main-label {
      margin: 0;
    }
  }

  .header-title {
    padding: 0 16px;
    border-bottom: 1px solid white;
    width: 100%;
    height: 8%;
  }

  .btn-submit {
    padding: 0 16px;
    position: absolute;
    bottom: 0;
    border-top: 1px solid white;
    width: 100%;
    height: 10%;
  }
`;
