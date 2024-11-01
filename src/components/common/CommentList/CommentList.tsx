import CommentItem from '@/components/common/CommentItem';
import { Comment } from '@/common/@types/blog.type';
import { ComponentProps } from 'react';

interface CommentListProps extends ComponentProps<'div'> {
  comments: Comment[];
  onReloadReplies?: () => Promise<void>;
}

export default function CommentList({ comments, onReloadReplies, ...props }: CommentListProps) {
  return (
    <div {...props}>
      {comments.map((comment) => {
        return (
          <CommentItem key={comment.blogCommentId} comment={comment} onReloadReplies={onReloadReplies} />
        );
      })}
    </div>
  );
}
