'use client';

import React, { useState } from 'react';
import { Col, Drawer, Flex, Row } from 'antd';
import { AppRoutes } from '@/app/routes';
import { MenuOutlined } from '@ant-design/icons';
import Link from '@/components/common/Link/Link';
import BlogNav from '@/components/page/home/NavBar/NavBar';
import { useMediaQuery } from 'usehooks-ts';
import { breakpoints } from '@/common/constants/constants';
import HeaderStyle from '@/components/layout/Header/Header.style';
import BtnActionGroup from '@/components/layout/Header/BtnActionGroup/BtnActionGroup';
import SearchInput from '@/components/layout/Header/SearchInput/SearchInput';
import { authService } from '@/services/auth.service';
import { Avatar, AvatarImage } from '@/components/common/Avatar';

// TODO: Handle responsive design for the header
// * The current column span works well for large screens (i.e. 992px and above)
const Header = () => {
  const isMobile = useMediaQuery(`(max-width:${breakpoints.md})`);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <HeaderStyle>
      <header>
        <Row className='px-28 items-center'>
          <Col span={3}>
            <Flex align='center' justify='center'>
              <Link href={AppRoutes.HOME} title='Home page'>
                <Flex align='center' justify='start' className='w-full' gap={10} flex='1'>
                  <Avatar className='h-12 w-12'>
                    <AvatarImage src='/code_mely_avatar.jpg' alt='mely logo' />
                  </Avatar>
                  {!isMobile && <h1 className='header-title w-max'>MELY BLOG</h1>}
                </Flex>
              </Link>
            </Flex>
          </Col>
          <Col span={15}>
            <Flex align='center' justify='center'>
              <SearchInput placeholder="Search by blog title, user's full name ..." />
            </Flex>
          </Col>
          <Col span={6}>
            <Flex gap={20} justify='end' align='center'>
              <BtnActionGroup />
              {isMobile && <MenuOutlined onClick={() => setOpenDrawer(!openDrawer)} />}
            </Flex>
          </Col>
        </Row>
      </header>
      <Drawer
        open={openDrawer && isMobile}
        onClose={() => setOpenDrawer(false)}
        style={{ background: 'var(--color-primary)', paddingBlock: '1rem' }}
      >
        <BlogNav />
      </Drawer>
    </HeaderStyle>
  );
};

export default Header;
