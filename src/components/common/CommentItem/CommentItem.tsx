import { Comment } from '@/common/@types/blog.type';
import CommentItemStyle from '@/components/common/CommentItem/CommentItem.style';
import { Button, Card, Modal, Tooltip } from 'antd';
import {
  CommentOutlined,
  CaretDownOutlined as DownvoteButton,
  CaretUpOutlined as UpvoteButton,
  DeleteOutlined,
  FlagOutlined,
  DownOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import useBlog from '@/hooks/useBlog';
import CommentList from '@/components/common/CommentList';
import blogApiService from '@/services/BlogService';
import CommentTextarea from '@/components/common/CommentTextarea';
import useUser from '@/hooks/useUser';
import { VoteAction, VoteUserStatus } from '@/common/enums/blog.enum';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/app/routes';
import useAntMessage from '@/hooks/useAntMessage';
import formateDateTimeByLocale from '@/helpers/formatDateTimeByLocale';
import { BlogCommentOrder } from '@/common/enums/blog-comment-order.enum';
import LoadingIndicator from '@/components/common/Icon/LoadingIndicator';

interface CommentProps {
  comment: Comment;
  onReloadReplies?: () => Promise<void>;
}

const MAX_COMMENTS_PER_PAGE = 10;

export default function CommentItem({ comment, onReloadReplies }: CommentProps) {
  const [commentData, setCommentData] = useState<Comment>(comment);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [canLoadMoreReplies, setCanLoadMoreReplies] = useState(comment.countReplies > MAX_COMMENTS_PER_PAGE);
  const [nextPageToLoadReplies, setNextPageToLoadReplies] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { blog, setRootComments } = useBlog();
  const { user, isLoggedIn } = useUser();
  const router = useRouter();
  const messageApi = useAntMessage();

  const handleToggleReplyForm = () => {
    if (showReplyForm) {
      handleCloseReplyForm();
      return;
    }

    setShowReplyForm(true);
  };

  const handleCloseReplyForm = () => {
    setShowReplyForm(false);
  };

  const handleVoteComment = async (action: VoteAction) => {
    if (!user) {
      router.push(AppRoutes.LOGIN);
      return;
    }

    try {
      setIsVoting(true);
      if (commentData.votes.userStatus === VoteUserStatus.NONE) {
        await blogApiService.createCommentVote(commentData.blogCommentId, action);
      } else await blogApiService.updateCommentVote(commentData.blogCommentId, action);

      const { data: updatedComment } = await blogApiService.getOneComment(
        commentData.blogCommentId,
        !isLoggedIn,
      );
      setCommentData((_) => updatedComment);

      if (action === VoteAction.CANCEL) {
        messageApi.success('Successfully cancelled vote the comment!');
      }

      if (action === VoteAction.UP_VOTE) {
        messageApi.success('Successfully upvoted the comment!');
      }

      if (action === VoteAction.DOWN_VOTE) {
        messageApi.success('Successfully downvoted the comment!');
      }
    } catch (error: any) {
      messageApi.error('Failed to upvote comment:', error.response?.data?.message);
    }
    setIsVoting(false);
  };

  const handleShowNextPageOfReplies = async (loadFromScratch: boolean = false) => {
    try {
      setIsLoadingReplies(true);
      const res = await blogApiService.getAllComments({
        blogId: blog.blogId,
        replyTo: commentData.blogCommentId,
        order: BlogCommentOrder.CREATE_TIMESTAMP_ASC,
        page: loadFromScratch ? 1 : nextPageToLoadReplies,
        pageSize: MAX_COMMENTS_PER_PAGE,
      });
      setReplies(loadFromScratch ? res.data : [...replies, ...res.data]);
      if (res.meta!.pagination.page < res.meta!.pagination.totalPage) {
        setCanLoadMoreReplies(true);
        setNextPageToLoadReplies(loadFromScratch ? 2 : nextPageToLoadReplies + 1);
      } else setCanLoadMoreReplies(false);
    } catch (error: any) {
      messageApi.error('Failed to get replies:', error.response?.data?.message);
    }
    setIsLoadingReplies(false);
    setShowReplies(true);
  };

  const handleReloadReplies = async () => {
    await handleShowNextPageOfReplies(true);
  };

  const handleSuccessReply = async () => {
    if (commentData.replyTo === null) {
      await handleReloadReplies();
      return;
    }

    await onReloadReplies?.();
  };

  const handleDeleteComment = async () => {
    try {
      setIsDeleteModalVisible(false);
      await blogApiService.deleteComment(commentData.blogCommentId);

      if (commentData.replyTo === null) {
        setRootComments((prevComments) =>
          prevComments.filter((c) => c.blogCommentId !== commentData.blogCommentId),
        );
      } else {
        await onReloadReplies?.();
      }
      messageApi.success('Deleted comment successfully!');
    } catch (error: any) {
      messageApi.error('Failed to delete comment:', error.response?.data?.message);
    }
  };

  return (
    <CommentItemStyle>
      <Card>
        <Card.Meta
          title={
            <>
              <span>{commentData.user.fullName}</span>
              <span className='comment-item-subtitle'>
                {' '}
                • {formateDateTimeByLocale(new Date(commentData.updateTimestamp))}
              </span>
              {commentData.updateTimestamp !== commentData.createTimestamp && (
                <span className='comment-item-subtitle'>
                  {' '}
                  • Edited at {formateDateTimeByLocale(new Date(commentData.updateTimestamp))}
                </span>
              )}
            </>
          }
        />
        <div className='comment-item-content'>
          {!isEditing ? (
            commentData.content
          ) : (
            <CommentTextarea
              operation='UPDATE'
              blogCommentIdUpdate={commentData.blogCommentId}
              initialContent={commentData.content}
              showDismissButton
              onDismiss={() => setIsEditing(false)}
              onSubmitSuccess={(submittedComment) => {
                setCommentData(submittedComment);
                setIsEditing(false);
              }}
            />
          )}
        </div>
        {!isEditing && (
          <div className='comment-item-actions'>
            <div className='vote-btn-container'>
              <Tooltip
                placement='bottom'
                title={
                  !user
                    ? 'Login to upvote this comment'
                    : commentData.votes.userStatus === VoteUserStatus.UP_VOTE
                      ? 'Cancel upvote this comment'
                      : 'Upvote this comment'
                }
              >
                <UpvoteButton
                  className={clsx({
                    activated: commentData.votes.userStatus === VoteUserStatus.UP_VOTE,
                    disabled: isVoting,
                  })}
                  onClick={() =>
                    handleVoteComment(
                      commentData.votes.userStatus === VoteUserStatus.UP_VOTE
                        ? VoteAction.CANCEL
                        : VoteAction.UP_VOTE,
                    )
                  }
                />
              </Tooltip>
              {commentData.votes.upVote != 0 && <span>{commentData.votes.upVote}</span>}
            </div>
            <div className='vote-btn-container'>
              <Tooltip
                placement='bottom'
                title={
                  !user
                    ? 'Login to downvote this comment'
                    : commentData.votes.userStatus === VoteUserStatus.DOWN_VOTE
                      ? 'Cancel downvote this comment'
                      : 'Downvote this comment'
                }
              >
                <DownvoteButton
                  className={clsx({
                    activated: commentData.votes.userStatus === VoteUserStatus.DOWN_VOTE,
                    disabled: isVoting,
                  })}
                  disabled={isVoting}
                  onClick={() =>
                    handleVoteComment(
                      commentData.votes.userStatus === VoteUserStatus.DOWN_VOTE
                        ? VoteAction.CANCEL
                        : VoteAction.DOWN_VOTE,
                    )
                  }
                />
              </Tooltip>
              {commentData.votes.downVote != 0 && <span>{commentData.votes.downVote}</span>}
            </div>
            <div>
              <Tooltip placement='bottom' title='Reply this comment'>
                <CommentOutlined
                  className={clsx({ activated: showReplyForm, disabled: isVoting })}
                  onClick={handleToggleReplyForm}
                />
              </Tooltip>
            </div>
            {user?.userId !== commentData.userId && (
              <div>
                <Tooltip placement='bottom' title='Report this comment'>
                  <FlagOutlined className={clsx({ disabled: isVoting })} />
                </Tooltip>
              </div>
            )}
            {user?.userId === commentData.userId && (
              <>
                <div>
                  <Tooltip placement='bottom' title='Edit this comment'>
                    <EditOutlined
                      className={clsx({ disabled: isVoting })}
                      onClick={() => setIsEditing(true)}
                    />
                  </Tooltip>
                </div>
                <div>
                  <Tooltip placement='bottom' title='Delete this comment'>
                    <DeleteOutlined
                      className={clsx({ disabled: isVoting })}
                      onClick={() => setIsDeleteModalVisible(true)}
                    />
                  </Tooltip>
                </div>
              </>
            )}
          </div>
        )}
        {showReplyForm && (
          <CommentTextarea
            operation='REPLY'
            blogCommentIdReplyTo={commentData.blogCommentId}
            showDismissButton
            onDismiss={handleCloseReplyForm}
            onSubmitSuccess={handleSuccessReply}
          />
        )}
      </Card>

      <div style={{ marginTop: '1rem', marginBottom: '3rem' }}>
        <CommentList
          comments={replies}
          style={{ borderLeft: '1px solid white', paddingLeft: '5rem' }}
          onReloadReplies={handleReloadReplies}
        />
        {!showReplies && commentData.countReplies > 0 && (
          <Button
            type='text'
            className='show-reply-btn'
            size='large'
            onClick={() => handleShowNextPageOfReplies()}
            disabled={isLoadingReplies}
          >
            {isLoadingReplies ? (
              <LoadingIndicator />
            ) : (
              <div>
                <DownOutlined /> View {commentData.countReplies}{' '}
                {commentData.countReplies > 1 ? 'replies' : 'reply'}
              </div>
            )}
          </Button>
        )}
        {canLoadMoreReplies && showReplies && (
          <Button
            type='text'
            className='show-reply-btn'
            size='large'
            onClick={() => handleShowNextPageOfReplies()}
            disabled={isLoadingReplies}
          >
            {isLoadingReplies ? (
              <LoadingIndicator />
            ) : (
              <div>
                <DownOutlined /> View more replies
              </div>
            )}
          </Button>
        )}
      </div>
      <Modal
        centered
        title='Delete comment?'
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={handleDeleteComment}
      >
        <p>Are you sure you want to delete this comment?</p>
      </Modal>
    </CommentItemStyle>
  );
}
