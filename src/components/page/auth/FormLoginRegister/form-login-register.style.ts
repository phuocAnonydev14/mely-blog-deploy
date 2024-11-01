import styled from 'styled-components';
import { PRIMARY_COLOR } from '@/common/constants/color.constant';

export const FormLoginRegisterStyle = styled('div')<{ $height?: string }>`
  height: ${(props) => props.$height || '100dvh'};

  background-image: ${(props) =>
    props.$height ? 'auto' : 'linear-gradient(135deg, ${PRIMARY_COLOR}, #1f2233, #484a58)'};
  display: flex;
  justify-content: center;
  align-items: center;

  .form-login {
    width: 400px;
    min-height: 60vh;

    .button-group {
    }

    .btn-submit {
      width: 100%;
    }

    .link-common {
      margin-top: -1.4em;
      margin-bottom: 2em;
    }
  }
`;
