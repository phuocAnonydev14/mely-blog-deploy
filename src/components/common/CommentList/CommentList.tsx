import CommentItem from '@/components/common/CommentItem';
import { Comment } from '@/common/@types/blog.type';
import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import blogApiService from '@/services/BlogService';
import { BlogCommentOrder } from '@/common/enums/blog-comment-order.enum';
import useBlog from '@/hooks/useBlog';
import useAntMessage from '@/hooks/useAntMessage';
import useUser from '@/hooks/useUser';
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import LoadingIndicator from '@/components/common/Icon/LoadingIndicator';
import { CommentItemRef } from '@/components/common/CommentItem/CommentItem';

interface CommentListProps extends ComponentProps<'div'> {
  replyTo: string;
  order?: BlogCommentOrder;
  itemDisabled?: boolean;
}

export interface CommentListRef {
  showNextPageOfComments: (loadFromScratch?: boolean) => Promise<void>;
  addComment: (comment: Comment) => void;
  deleteComment: (commentId: string) => void;
  clearAllComments: () => void;
}

const MAX_COMMENTS_PER_PAGE = 10;

function CommentList(
  {
    replyTo,
    order = BlogCommentOrder.CREATE_TIMESTAMP_ASC,
    itemDisabled,
    hidden,
    style,
    ...props
  }: CommentListProps,
  ref: ForwardedRef<CommentListRef>,
) {
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [isLoadingCommentsFromScratch, setIsLoadingCommentsOnScratch] = useState(false);
  const [isLoadingNextPageOfComments, setIsLoadingNextPageOfComments] = useState(false);
  const [canLoadMoreComments, setCanLoadMoreComments] = useState(false);
  const [nextPageToLoadComments, setNextPageToLoadComments] = useState(1);
  const { blog } = useBlog();
  const { isLoggedIn } = useUser();
  const messageApi = useAntMessage();
  const commentItemRefs = useRef<CommentItemRef[]>([]);

  const showNextPageOfComments = async (loadFromScratch: boolean = false) => {
    const isLoadingCommentsSetter = loadFromScratch
      ? setIsLoadingCommentsOnScratch
      : setIsLoadingNextPageOfComments;

    try {
      isLoadingCommentsSetter(true);
      const res = await blogApiService.getAllComments(
        {
          blogId: blog.blogId,
          replyTo,
          order,
          page: loadFromScratch ? 1 : nextPageToLoadComments,
          pageSize: MAX_COMMENTS_PER_PAGE,
        },
        !isLoggedIn,
      );
      setCommentsList(loadFromScratch ? res.data : [...commentsList, ...res.data]);
      if (res.meta!.pagination.page < res.meta!.pagination.totalPage) {
        setCanLoadMoreComments(true);
        setNextPageToLoadComments(loadFromScratch ? 2 : nextPageToLoadComments + 1);
      } else setCanLoadMoreComments(false);

      if (loadFromScratch) {
        commentItemRefs.current.forEach((item) => item.clearReplies());
      }
    } catch (error: any) {
      messageApi.error('Failed to get replies:', error.response?.data?.message);
    }
    isLoadingCommentsSetter(false);
  };

  const addComment = (comment: Comment) => {
    if ((comment.replyTo === null && replyTo === 'null') || comment.replyTo === replyTo) {
      setCommentsList([comment, ...commentsList]);
    } else {
      setCommentsList(
        commentsList.map((c) =>
          c.blogCommentId === comment.replyTo ? { ...c, countReplies: Number(c.countReplies) + 1 } : c,
        ),
      );
    }
  };

  const deleteComment = (commentId: string) => {
    setCommentsList(commentsList.filter((comment) => comment.blogCommentId !== commentId));
  };

  const updateComment = (comment: Comment) => {
    setCommentsList(commentsList.map((c) => (c.blogCommentId === comment.blogCommentId ? comment : c)));
  };

  useImperativeHandle(
    ref,
    () => ({
      showNextPageOfComments,
      addComment,
      deleteComment,
      clearAllComments: () => setCommentsList([]),
    }),
    [commentsList],
  );

  useEffect(() => {
    if (replyTo === 'null') {
      showNextPageOfComments(true);
    }
  }, [order]);

  return (
    <div {...props} style={{ ...style, display: hidden ? 'none' : 'block' }}>
      {commentsList.map((comment) => {
        return (
          <CommentItem
            ref={(item) => {
              if (item) {
                commentItemRefs.current.push(item);
              }
            }}
            key={comment.blogCommentId}
            comment={comment}
            disabled={isLoadingCommentsFromScratch || itemDisabled}
            onDeleted={deleteComment}
            onReplySuccess={addComment}
            onUpdateComment={updateComment}
          />
        );
      })}
      {commentsList.length !== 0 && canLoadMoreComments && (
        <Button
          type='text'
          className='show-reply-btn'
          size='large'
          disabled={isLoadingNextPageOfComments}
          onClick={() => showNextPageOfComments()}
          style={{ marginTop: '-3rem' }}
        >
          {isLoadingNextPageOfComments ? (
            <LoadingIndicator />
          ) : (
            <div>
              <DownOutlined /> View more {replyTo === 'null' ? 'comments' : 'replies'}
            </div>
          )}
        </Button>
      )}
    </div>
  );
}

export default forwardRef(CommentList);
