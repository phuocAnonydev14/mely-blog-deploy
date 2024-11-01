import Link from 'next/link';
import { Card } from 'antd';
import AboutAuthorSummaryStyle from './AboutAuthorSummary.style';
import useBlog from '@/hooks/useBlog';

export default function AboutAuthorSummary() {
  const {
    blog: { user: author },
  } = useBlog();

  return (
    <AboutAuthorSummaryStyle>
      <Card
        title={
          <>
            About <Link href=''>{author?.fullName}</Link>
          </>
        }
        className='about-author-summary'
      >
        <p>{author?.description}</p>
      </Card>
    </AboutAuthorSummaryStyle>
  );
}
