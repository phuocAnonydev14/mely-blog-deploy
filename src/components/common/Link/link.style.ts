import styled from 'styled-components';
import { LINK_COLOR_PRIMARY_TEXT, LINK_COLOR_SECONDARY_TEXT } from '@/common/constants/color.constant';
import Link from 'next/link';

export const LinkStyle = styled(Link)`
  display: flex;

  &.primary {
    color: ${LINK_COLOR_PRIMARY_TEXT};
  }

  &.secondary {
    color: ${LINK_COLOR_SECONDARY_TEXT};
  }
`;
