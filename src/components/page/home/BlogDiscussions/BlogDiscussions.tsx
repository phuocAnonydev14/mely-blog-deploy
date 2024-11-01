import Link from 'next/link';
import DiscussionStyle from './BlogDiscussions.style';
export interface TempDiscussType {
  title: string;
  reference: string;
  comment: number;
}
interface Props {
  discussItems: TempDiscussType[];
}
const BlogDiscussions = ({ discussItems }: Props) => {
  return (
    <DiscussionStyle>
      <div className='discussions'>
        {discussItems.map((item, index) => {
          const { title, reference, comment } = item;
          return (
            <div className='discussions__item' key={index}>
              <Link href={reference}>{title}</Link>
              <Link href={`${reference}/comment`}> {comment} comments</Link>
            </div>
          );
        })}
      </div>
    </DiscussionStyle>
  );
};
export default BlogDiscussions;
