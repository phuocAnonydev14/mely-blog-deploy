import styled from 'styled-components';

const ReportFormStyle = styled.div`
  display: flex;
  justify-content: center;

  .content {
    margin-top: 30px;
    padding: 2% 4%;
    width: 50vw;
    min-height: 80vh;
    background: #1d1d1d;
    border-radius: 12px;
    &__heading {
      display: flex;
      align-items: center;
      gap: 20px;
      p {
        font-weight: bold;
        font-size: 2rem;
      }
      .avatar {
        border-radius: 100rem;
      }
    }

    &__body {
      margin-top: 20px;
      .report-thumbnail {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 12px;
        margin-bottom: 30px;
      }
      label {
        font-size: 1.8rem;
      }
      .submit-btn {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
`;

export { ReportFormStyle };
