'use client';

import { Select } from 'antd';
import BlogCommentsStyle from './BlogComments.style';
import useUser from '@/hooks/useUser';
import LoadingIndicator from '@/components/common/Icon/LoadingIndicator';
import useBlog from '@/hooks/useBlog';
import CommentList from '@/components/common/CommentList';
import CommentTextarea from '@/components/common/CommentTextarea';
import { BlogCommentOrder } from '@/common/enums/blog-comment-order.enum';

export default function BlogComments() {
  const { isLoading } = useUser();
  const { rootComments, setCommentsOrder, commentsOrder, isLoadingRootComments, setRootComments } = useBlog();

  return (
    <BlogCommentsStyle>
      <section className='blog-comments'>
        <div className='blog-comments-header'>
          <h2>Comments</h2>
        </div>
        {isLoading || isLoadingRootComments ? (
          <div className='blog-comments-loading'>
            <LoadingIndicator />
          </div>
        ) : (
          <>
            <CommentTextarea
              operation='CREATE'
              onSubmitSuccess={(submittedComment) =>
                setRootComments((prevComments) => [submittedComment, ...prevComments])
              }
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
            <CommentList comments={rootComments} style={{ paddingTop: '3rem' }} />
          </>
        )}
      </section>
    </BlogCommentsStyle>
  );
}
