'use client';

import { Col, Row, Skeleton } from 'antd';
import { useMediaQuery } from 'usehooks-ts';
import { breakpoints } from '@/common/constants/constants';

export const BlogSkeleton = () => {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.sm})`);

  return (
    <Row className='mt-5' gutter={16}>
      {Array(isMobile ? 1 : 3)
        .fill(0)
        .map((_, index) => (
          <Col key={index} lg={8} sm={24}>
            <Skeleton.Image active className='mb-2' />
            <Skeleton active />
          </Col>
        ))}
    </Row>
  );
};
