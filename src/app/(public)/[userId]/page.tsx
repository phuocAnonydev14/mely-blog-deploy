'use client';
import Profile from '@/components/page/about-me/Profile/Profile';
import { Col, Row } from 'antd';
import OtherInformationGroup from '@/components/page/about-me/OtherInformationGroup/OtherInformationGroup';
import { AboutMeStyle } from '@/app/(public)/[userId]/about-me.style';
import { useParams } from 'next/navigation';

const AboutMePage = () => {
  const userId = useParams().userId as string;

  return (
    <AboutMeStyle>
      <Row>
        <Col md={7} sm={24} style={{ marginRight: '20px' }}>
          <Profile userId={userId} />
        </Col>
        <Col md={16} sm={24}>
          <OtherInformationGroup userId={userId} />
        </Col>
      </Row>
    </AboutMeStyle>
  );
};

export default AboutMePage;
