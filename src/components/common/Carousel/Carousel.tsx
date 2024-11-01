'use client';

import { ComponentProps, ReactNode, useRef } from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import CarouselStyle from './Carousel.style';

interface CarouselProps extends ComponentProps<'div'> {
  items?: ReactNode[];
  scrollWidth?: number;
}

export default function Carousel({ items, className, scrollWidth, ...props }: CarouselProps) {
  const carouselItemsRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    carouselItemsRef.current?.scrollTo({
      left: carouselItemsRef.current.scrollLeft - (scrollWidth || 200),
      behavior: 'smooth',
    });
  };

  const handleScrollRight = () => {
    carouselItemsRef.current?.scrollTo({
      left: carouselItemsRef.current.scrollLeft + (scrollWidth || 200),
      behavior: 'smooth',
    });
  };

  return (
    <CarouselStyle {...props}>
      <div className={clsx('carousel', className)}>
        <div className='carousel-nav'>
          <Button type='text' icon={<LeftOutlined />} className='left-btn' onClick={handleScrollLeft} />
          <Button type='text' icon={<RightOutlined />} className='right-btn' onClick={handleScrollRight} />
        </div>
        <div className='carousel-items' ref={carouselItemsRef}>
          {items?.map((item, index) => (
            <div className='carousel-item' key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </CarouselStyle>
  );
}
