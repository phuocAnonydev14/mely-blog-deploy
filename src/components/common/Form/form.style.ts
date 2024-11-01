import styled from 'styled-components';
import { Form } from 'antd';
import {
  FORM_COLOR_PRIMARY_BG,
  FORM_COLOR_PRIMARY_TEXT,
  FORM_COLOR_SECONDARY_BG,
  FORM_COLOR_SECONDARY_TEXT,
  PRIMARY_COLOR,
} from '@/common/constants/color.constant';

export const FormStyle = styled(Form)`
  border-radius: 10px;
  padding: 3em;
  box-shadow: 0 0 30px 0 ${PRIMARY_COLOR};

  &.primary {
    background-color: ${FORM_COLOR_PRIMARY_BG};
    color: ${FORM_COLOR_PRIMARY_TEXT};

    label {
      color: ${FORM_COLOR_PRIMARY_TEXT};
    }
  }

  &.secondary {
    background-color: ${FORM_COLOR_SECONDARY_BG};
    color: ${FORM_COLOR_SECONDARY_TEXT};

    label {
      color: ${FORM_COLOR_SECONDARY_TEXT};
    }
  }
`;
