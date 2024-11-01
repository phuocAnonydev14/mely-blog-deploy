import React, { ComponentProps } from 'react';
import { Dropdown as AntDropDown, Space } from 'antd';
import { DropDownStyle } from '@/components/common/Dropdown/drop-down.style';

interface DropDownProps extends ComponentProps<typeof AntDropDown> {
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
}

const DropDown = ({ children, prefix, suffix, ...rest }: DropDownProps) => {
  return (
    <DropDownStyle overlayStyle={{ zIndex: 10000 }} {...rest}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {prefix}
          {children}
          {suffix}
        </Space>
      </a>
    </DropDownStyle>
  );
};

export default DropDown;
