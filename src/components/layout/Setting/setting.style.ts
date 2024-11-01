import styled from 'styled-components';
import { Tabs } from 'antd';

export const SettingStyle = styled(Tabs)`
  .ant-tabs-nav {
    width: 100%;

    .ant-tabs-nav-list {
      align-items: end;

      .item-tab {
        svg {
          margin-right: 8px;
        }
      }
    }
  }
`;
