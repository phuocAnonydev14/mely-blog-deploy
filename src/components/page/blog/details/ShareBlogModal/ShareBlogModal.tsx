'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Col, Divider, Input, InputRef, message, Modal, Row } from 'antd';
import navigatorService from '@/services/NavigatorService';
import ShareBlogModalStyle from './ShareBlogModal.style';
import Link from 'next/link';
import EmailIcon from '@/components/common/Icon/EmailIcon';
import FacebookIcon from '@/components/common/Icon/FacebookIcon';
import XIcon from '@/components/common/Icon/XIcon';
import RedditIcon from '@/components/common/Icon/RedditIcon';
import LinkedInIcon from '@/components/common/Icon/LinkedInIcon';
import OtherIcon from '@/components/common/Icon/OtherIcon';
import Carousel from '@/components/common/Carousel';

interface ShareBlogModalProps {
  triggerOpenElementRef: React.RefObject<HTMLElement>;
}

export default function ShareBlogModal({ triggerOpenElementRef }: ShareBlogModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const blogLinkRef = useRef<InputRef>(null);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const handleCopyBlogLink = async () => {
    // TODO: Implement AntMessageProvider after merge #16 (https://github.com/mely-apps/mely-blog-ui/pull/16)
    try {
      const blogLink = blogLinkRef.current?.input?.value;
      if (!blogLink) {
        message.error('Failed to copy blog link!');
        return;
      }

      await navigatorService.copyToClipboard(blogLink);
      message.success('Blog link copied to clipboard!');
    } catch (error) {
      message.error('Failed to copy blog link!');
    }
  };

  const handleShareToOtherPlatforms = () => {
    navigatorService.share({
      url: window.location.href,
    });
  };

  useEffect(() => {
    const triggerOpenElement = triggerOpenElementRef.current;
    triggerOpenElement?.addEventListener('click', handleOpen);

    return () => {
      triggerOpenElement?.removeEventListener('click', handleOpen);
    };
  }, [triggerOpenElementRef]);

  return (
    <Modal title='Share this blog via...' open={isOpen} onCancel={handleClose} centered footer={null}>
      <ShareBlogModalStyle>
        <Carousel
          className='social-carousel'
          scrollWidth={480}
          items={[
            <>
              <Link href={`mailto:?body=${window.location.href}`} className='social-item' tabIndex={0}>
                <EmailIcon width={60} height={60} />
                Email
              </Link>
            </>,
            <>
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target='_blank'
                className='social-item'
                tabIndex={1}
              >
                <FacebookIcon width={60} height={60} />
                Facebook
              </Link>
            </>,
            <>
              <Link href='' target='_blank' className='social-item' tabIndex={2}>
                <XIcon width={60} height={60} />X
              </Link>
            </>,
            <>
              <Link href='' target='_blank' className='social-item' tabIndex={3}>
                <RedditIcon width={60} height={60} />
                Reddit
              </Link>
            </>,
            <>
              <Link href='' target='_blank' className='social-item' tabIndex={4}>
                <LinkedInIcon width={60} height={60} />
                LinkedIn
              </Link>
            </>,
            <>
              <div className='social-item' tabIndex={5} onClick={handleShareToOtherPlatforms}>
                <OtherIcon width={60} height={60} />
                Others
              </div>
            </>,
          ]}
        />
        <Divider plain>or copy this blog link</Divider>
        <Row>
          <Col span={19}>
            <Input readOnly value={window.location.href} className='blog-link' ref={blogLinkRef} />
          </Col>
          <Col span={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type='primary' className='copy-btn' onClick={handleCopyBlogLink}>
              Copy link
            </Button>
          </Col>
        </Row>
      </ShareBlogModalStyle>
    </Modal>
  );
}
