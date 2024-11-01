import styled from 'styled-components';
import { Button } from 'antd';
import {
  BUTTON_COLOR_PRIMARY_BG,
  BUTTON_COLOR_PRIMARY_TEXT,
  BUTTON_COLOR_SECONDARY_BG,
  BUTTON_COLOR_SECONDARY_TEXT,
} from '@/common/constants/color.constant';

export const ButtonStyle = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3em;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(149, 147, 147, 0.3) 0px 3px 7px -3px;

  &.type-text {
    box-shadow: none;
  }

  &.primary {
    background-color: ${BUTTON_COLOR_PRIMARY_BG};
    transition: all 0.3s ease;
    //box-shadow: 0 0 20px 0 white;

    span,
    svg {
      transition: all 0.3s ease;
      color: ${BUTTON_COLOR_PRIMARY_TEXT};
    }

    &:hover {
      background-color: white !important;

      span,
      svg {
        color: black !important;
      }
    }
  }

  &.secondary {
    background-color: ${BUTTON_COLOR_SECONDARY_BG};
    transition: all 0.3s ease;

    span,
    svg {
      color: ${BUTTON_COLOR_SECONDARY_TEXT};
      transition: all 0.3s ease;
    }

    &:hover {
      background-color: #0c1320 !important;

      span,
      svg {
        color: white !important;
      }
    }
  }
`;
