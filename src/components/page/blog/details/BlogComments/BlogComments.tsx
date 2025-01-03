'use client';

import { Select } from 'antd';
import BlogCommentsStyle from './BlogComments.style';
import useUser from '@/hooks/useUser';
import LoadingIndicator from '@/components/common/Icon/LoadingIndicator';
import CommentList from '@/components/common/CommentList';
import CommentTextarea from '@/components/common/CommentTextarea';
import { BlogCommentOrder } from '@/common/enums/blog-comment-order.enum';
import { useRef, useState } from 'react';
import { CommentListRef } from '@/components/common/CommentList/CommentList';

export default function BlogComments() {
  const { isLoading: isLoadingUser } = useUser();
  const [commentsOrder, setCommentsOrder] = useState<BlogCommentOrder>(BlogCommentOrder.TOP_DESC);
  const commentsListRef = useRef<CommentListRef>(null);

  return (
    <BlogCommentsStyle>
      <section className='blog-comments'>
        <div className='blog-comments-header'>
          <h2>Comments</h2>
        </div>
        {isLoadingUser ? (
          <div className='blog-comments-loading'>
            <LoadingIndicator />
          </div>
        ) : (
          <>
            <CommentTextarea
              operation='CREATE'
              onSubmitSuccess={(submittedComment) => commentsListRef.current?.addComment(submittedComment)}
              className='comments-textarea'
            />
            <div className='blog-comments-sort'>
              <span>Sort by: </span>
              <Select
                className='comments-sort-select'
                size='large'
                value={commentsOrder}
                onChange={setCommentsOrder}
                options={[
                  { value: BlogCommentOrder.TOP_DESC, label: 'Top' },
                  { value: BlogCommentOrder.CREATE_TIMESTAMP_DESC, label: 'Latest' },
                  { value: BlogCommentOrder.CREATE_TIMESTAMP_ASC, label: 'Oldest' },
                ]}
              />
            </div>
            <CommentList
              ref={commentsListRef}
              replyTo='null'
              style={{ paddingTop: '3rem' }}
              order={commentsOrder}
            />
          </>
        )}
      </section>
    </BlogCommentsStyle>
  );
}
