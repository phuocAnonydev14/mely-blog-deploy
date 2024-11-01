'use client';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'usehooks-ts';
import { breakpoints } from '@/common/constants/constants';
import Button, { EButtonTheme } from '@/components/common/Button/Button';
import React from 'react';
import SearchInputStyle from '@/components/layout/Header/SearchInput/SearchInput.style';

export default function SearchInput() {
  const isMobile = useMediaQuery(`(max-width:${breakpoints.md})`);

  return (
    <SearchInputStyle className={'flex items-center'}>
      {isMobile ? (
        <Button color={EButtonTheme.SECONDARY} type='default' icon={<SearchOutlined />} />
      ) : (
        <Input placeholder='Search...' prefix={<SearchOutlined />} />
      )}
    </SearchInputStyle>
  );
}
