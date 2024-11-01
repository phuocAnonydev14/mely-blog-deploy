import Image from 'next/image';
import Link from 'next/link';
import { Button, Form, Input } from 'antd';
import useUser from '@/hooks/useUser';
import { useState } from 'react';
import LoadingIndicator from '@/components/common/Icon/LoadingIndicator';
import blogApiService from '@/services/BlogService';
import useBlog from '@/hooks/useBlog';
import { Comment } from '@/common/@types/blog.type';
import CommentTextareaStyle from '@/components/common/CommentTextarea/CommentTextarea.style';
import useAntMessage from '@/hooks/useAntMessage';

interface CommentTextareaProps {
  initialContent?: string;
  blogCommentIdReplyTo?: string;
  blogCommentIdUpdate?: string;
  showDismissButton?: boolean;
  onDismiss?: () => void;
  onSubmitSuccess?: (submittedComment: Comment) => void | Promise<void>;
  operation: 'CREATE' | 'REPLY' | 'UPDATE';
}

export default function CommentTextarea({
  operation,
  initialContent,
  blogCommentIdReplyTo,
  blogCommentIdUpdate,
  onDismiss,
  onSubmitSuccess,
  showDismissButton = false,
}: CommentTextareaProps) {
  const [content, setContent] = useState(initialContent ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const { blog } = useBlog();
  const messageApi = useAntMessage();

  const handleSubmitComment = async () => {
    try {
      setIsSubmitting(true);
      let commentData: Comment;

      switch (operation) {
        case 'CREATE':
          commentData = (await blogApiService.createComment(blog.blogId, content)).data;
          messageApi.success('Your comment has been submitted successfully.');
          break;
        case 'REPLY':
          commentData = (await blogApiService.replyComment(blogCommentIdReplyTo!, content)).data;
          messageApi.success('Your reply has been submitted successfully.');
          break;
        case 'UPDATE':
          commentData = (await blogApiService.updateComment(blogCommentIdUpdate!, content)).data;
          messageApi.success('Your comment has been updated successfully.');
          break;
      }

      setContent('');
      await onSubmitSuccess?.(commentData);
      setIsSubmitting(false);

      if (showDismissButton) onDismiss?.();
    } catch (err) {
      messageApi.error('Failed to submit your comment. Please try again later.');
    }
  };

  return (
    <CommentTextareaStyle>
      {!user ? (
        <div className='blog-comments-login-prompt'>
          <p>Please login to submit your comments.</p>
          <Link href='/auth/login'>
            <Button type='primary'>Login</Button>
          </Link>
        </div>
      ) : (
        <Form className='blog-comments-form'>
          {operation !== 'UPDATE' && (
            <Form.Item>
              <Image
                src={user.avatar || '/code_mely_avatar.jpg'}
                alt='Author'
                width={50}
                height={50}
                className='blog-comments-avatar'
              />
            </Form.Item>
          )}
          <Form.Item className='blog-comments-textarea'>
            <Input.TextArea rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
            <Button
              type='primary'
              disabled={content.trim().length === 0 || isSubmitting}
              className='submit-comment-btn'
              onClick={handleSubmitComment}
            >
              {isSubmitting ? <LoadingIndicator /> : 'Comment'}
            </Button>
            {showDismissButton && (
              <Button
                type='default'
                disabled={isSubmitting}
                className='dismiss-comment-btn'
                onClick={() => {
                  onDismiss?.();
                  setContent('');
                }}
              >
                Dismiss
              </Button>
            )}
          </Form.Item>
        </Form>
      )}
    </CommentTextareaStyle>
  );
}
