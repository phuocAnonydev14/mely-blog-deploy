'use client';

import styled from 'styled-components';

export const ToolActionMobileStyle = styled.div`
  .responsiveAction {
    position: fixed;
    width: max-content;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    border: 2px solid rgba(98, 98, 98, 0.75);
    border-radius: 40px;
    background: rgba(6, 9, 30, 0.94);
    padding: 10px 30px;
    display: flex;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;
