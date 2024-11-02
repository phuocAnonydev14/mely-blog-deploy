'use client';

import React, { useState } from 'react';
import { Avatar, Col, Drawer, Flex, Row } from 'antd';
import { AppRoutes } from '@/app/routes';
import { MenuOutlined } from '@ant-design/icons';
import Link from '@/components/common/Link/Link';
import BlogNav from '@/components/page/home/NavBar/NavBar';
import { useMediaQuery } from 'usehooks-ts';
import { breakpoints } from '@/common/constants/constants';
import HeaderStyle from '@/components/layout/Header/Header.style';
import BtnActionGroup from '@/components/layout/Header/BtnActionGroup/BtnActionGroup';

// TODO: Handle responsive design for the header
// * The current column span works well for large screens (i.e. 992px and above)
const Header = () => {
  const isMobile = useMediaQuery(`(max-width:${breakpoints.md})`);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <HeaderStyle>
      <header>
        <Row className='px-11'>
          <Col span={10}>
            <Flex align='center' justify='start'>
              <Link href={AppRoutes.HOME} title='Home page'>
                <Flex align='center' justify='start' gap={10}>
                  <Avatar src='/code_mely_avatar.jpg' />
                  {!isMobile && <h1 className='header-title'>MELY BLOG</h1>}
                </Flex>
              </Link>
            </Flex>
          </Col>
          <Col span={14}>
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
