'use client';

import BackToTopButtonStyle from './BackToTopButton.style';
import { ArrowUpOutlined } from '@ant-design/icons';
import { FloatButton, Tooltip } from 'antd';

export default function BackToTopButton() {
  return (
    <BackToTopButtonStyle>
      <Tooltip title='Back to top' placement='left'>
        <FloatButton.BackTop icon={<ArrowUpOutlined />} className='back-to-top-btn' />
      </Tooltip>
    </BackToTopButtonStyle>
  );
}
