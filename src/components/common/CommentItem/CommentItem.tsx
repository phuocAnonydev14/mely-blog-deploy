import { Comment } from '@/common/@types/blog.type';
import CommentItemStyle from '@/components/common/CommentItem/CommentItem.style';
import { Button, Card, Flex, Modal, Tooltip } from 'antd';
import {
  CommentOutlined,
  CaretDownOutlined as DownvoteButton,
  CaretUpOutlined as UpvoteButton,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { MessageCircle, MessageCircleMore, ThumbsDown, ThumbsUp } from 'lucide-react';
import { ForwardedRef, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import clsx from 'clsx';
import CommentList from '@/components/common/CommentList';
import blogApiService from '@/services/BlogService';
import CommentTextarea from '@/components/common/CommentTextarea';
import useUser from '@/hooks/useUser';
import { VoteAction, VoteUserStatus } from '@/common/enums/blog.enum';
import useAntMessage from '@/hooks/useAntMessage';
import formateDateTimeByLocale from '@/helpers/formatDateTimeByLocale';
import { CommentListRef } from '@/components/common/CommentList/CommentList';
import LoadingIndicator from '@/components/common/Icon/LoadingIndicator';
import { AuthModal } from '@/components/page/auth/AuthModal';
import CommentItemMoreActions from '@/components/common/CommentItem/CommentItemMoreActions';

interface CommentItemProps {
  comment: Comment;
  disabled?: boolean;
  onDeleted: (commentId: string) => void;
  onReplySuccess?: (comment: Comment) => void;
  onUpdateComment?: (comment: Comment) => void;
}

export interface CommentItemRef {
  clearReplies: () => void;
}

function CommentItem(
  { comment, disabled, onDeleted, onReplySuccess, onUpdateComment }: CommentItemProps,
  ref: ForwardedRef<CommentItemRef>,
) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isRepliesHidden, setIsRepliesHidden] = useState(false);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { isLoggedIn } = useUser();
  const messageApi = useAntMessage();
  const repliesListRef = useRef<CommentListRef>(null);

  const handleToggleReplyForm = () => {
    if (isVoting) return;

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
    if (isVoting) return;

    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }

    try {
      setIsVoting(true);
      if (comment.votes.userStatus === VoteUserStatus.NONE) {
        await blogApiService.createCommentVote(comment.blogCommentId, action);
      } else await blogApiService.updateCommentVote(comment.blogCommentId, action);

      const { data: updatedComment } = await blogApiService.getOneComment(comment.blogCommentId, !isLoggedIn);
      onUpdateComment?.(updatedComment);

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

  const handleShowReplies = async () => {
    setIsLoadingReplies(true);
    await repliesListRef.current?.showNextPageOfComments(true);
    setIsLoadingReplies(false);
    setShowReplies(true);
  };

  const toggleRepliesHidden = () => {
    setIsRepliesHidden(!isRepliesHidden);
  };

  const handleReplySuccess = async (submittedComment: Comment) => {
    if (comment.replyTo === null) {
      repliesListRef.current?.addComment(submittedComment);
    }

    onReplySuccess?.(submittedComment);

    if (!showReplies) {
      await handleShowReplies();
    }
  };

  const handleDeleteComment = async () => {
    try {
      setIsDeleteModalVisible(false);
      setIsDeleting(true);
      await blogApiService.deleteComment(comment.blogCommentId);

      onDeleted(comment.blogCommentId);
      messageApi.success('Deleted comment successfully!');
    } catch (error: any) {
      messageApi.error('Failed to delete comment:', error.response?.data?.message);
    }
    setIsDeleting(false);
  };

  useImperativeHandle(ref, () => ({
    clearReplies: () => {
      repliesListRef.current?.clearAllComments();
      setShowReplies(false);
    },
  }));

  return (
    <CommentItemStyle>
      <Card style={{ opacity: disabled || isDeleting ? 0.3 : 1 }}>
        {disabled || (isDeleting && <div className='comment-item-disabled-cover'></div>)}
        <Card.Meta
          title={
            <Flex justify='space-between'>
              <div>
                <span>{comment.user.fullName}</span>
                <span className='comment-item-subtitle'>
                  {' '}
                  • {formateDateTimeByLocale(new Date(comment.updateTimestamp))}
                </span>
                {comment.updateTimestamp !== comment.createTimestamp && (
                  <span className='comment-item-subtitle'>
                    {' '}
                    • Edited at {formateDateTimeByLocale(new Date(comment.updateTimestamp))}
                  </span>
                )}
              </div>
              {isEditing || (
                <CommentItemMoreActions
                  disabled={disabled || isDeleting || isVoting}
                  comment={comment}
                  onDeleteClick={() => setIsDeleteModalVisible(true)}
                  onEditClick={() => {
                    handleCloseReplyForm();
                    setIsEditing(true);
                  }}
                />
              )}
            </Flex>
          }
        />
        <div className='comment-item-content'>
          {!isEditing ? (
            comment.content
          ) : (
            <CommentTextarea
              operation='UPDATE'
              blogCommentIdUpdate={comment.blogCommentId}
              initialContent={comment.content}
              showDismissButton
              onDismiss={() => setIsEditing(false)}
              onSubmitSuccess={(submittedComment) => {
                onUpdateComment?.(submittedComment);
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
                title={getUpvoteButtonTooltipTitle({
                  isLoggedIn,
                  hasVoted: comment.votes.userStatus === VoteUserStatus.UP_VOTE,
                  disabled: isVoting,
                })}
              >
                <ThumbsUp
                  size={18}
                  className={clsx({
                    activated: isLoggedIn && comment.votes.userStatus === VoteUserStatus.UP_VOTE,
                    disabled: isVoting,
                  })}
                  onClick={() =>
                    handleVoteComment(
                      comment.votes.userStatus === VoteUserStatus.UP_VOTE
                        ? VoteAction.CANCEL
                        : VoteAction.UP_VOTE,
                    )
                  }
                />
              </Tooltip>
              {isLoggedIn && comment.votes.upVote != 0 && <span>{comment.votes.upVote}</span>}
            </div>
            <div className='vote-btn-container'>
              <Tooltip
                placement='bottom'
                title={getDownvoteButtonTooltipTitle({
                  isLoggedIn,
                  hasVoted: comment.votes.userStatus === VoteUserStatus.DOWN_VOTE,
                  disabled: isVoting,
                })}
              >
                <ThumbsDown
                  size={18}
                  className={clsx({
                    activated: isLoggedIn && comment.votes.userStatus === VoteUserStatus.DOWN_VOTE,
                    disabled: isVoting,
                  })}
                  onClick={() =>
                    handleVoteComment(
                      comment.votes.userStatus === VoteUserStatus.DOWN_VOTE
                        ? VoteAction.CANCEL
                        : VoteAction.DOWN_VOTE,
                    )
                  }
                />
              </Tooltip>
              {isLoggedIn && comment.votes.downVote != 0 && <span>{comment.votes.downVote}</span>}
            </div>
            <div>
              <Tooltip placement='bottom' title={isVoting ? '' : 'Reply this comment'}>
                <MessageCircleMore
                  size={18}
                  className={clsx({ activated: showReplyForm, disabled: isVoting })}
                  onClick={handleToggleReplyForm}
                />
              </Tooltip>
            </div>
          </div>
        )}
        {showReplyForm && (
          <CommentTextarea
            operation='REPLY'
            blogCommentIdReplyTo={comment.blogCommentId}
            showDismissButton
            onDismiss={handleCloseReplyForm}
            onSubmitSuccess={handleReplySuccess}
          />
        )}
      </Card>
      {comment.countReplies > 0 && !showReplies && (
        <Button
          type='text'
          className='show-reply-btn'
          size='large'
          disabled={isLoadingReplies || disabled || isDeleting}
          onClick={handleShowReplies}
          style={{ marginTop: '1rem' }}
        >
          {isLoadingReplies ? (
            <LoadingIndicator />
          ) : (
            <div>
              <DownOutlined /> View {comment.countReplies} {comment.countReplies > 1 ? 'replies' : 'reply'}
            </div>
          )}
        </Button>
      )}
      {showReplies && comment.countReplies > 0 && (
        <Button
          type='text'
          className='show-reply-btn'
          size='large'
          disabled={isLoadingReplies || disabled || isDeleting}
          onClick={toggleRepliesHidden}
          style={{ marginTop: '1rem' }}
        >
          {isRepliesHidden ? (
            <div>
              <DownOutlined /> View {comment.countReplies} {comment.countReplies > 1 ? 'replies' : 'reply'}
            </div>
          ) : (
            <div>
              <UpOutlined /> Hide replies
            </div>
          )}
        </Button>
      )}

      <div style={{ marginTop: '1rem', marginBottom: comment.replyTo === null ? '3rem' : '2rem' }}>
        <CommentList
          ref={repliesListRef}
          style={{ borderLeft: '1px solid white', paddingLeft: '3.5rem' }}
          replyTo={comment.blogCommentId}
          itemDisabled={disabled || isDeleting}
          hidden={isRepliesHidden}
        />
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
      <AuthModal open={openLoginModal} onClose={() => setOpenLoginModal(false)} />
    </CommentItemStyle>
  );
}

function getUpvoteButtonTooltipTitle(args: { isLoggedIn: boolean; hasVoted: boolean; disabled: boolean }) {
  if (!args.isLoggedIn) return 'Login to upvote this comment';
  if (args.disabled) return '';
  if (args.hasVoted) return 'Cancel upvote this comment';
  return 'Upvote this comment';
}

function getDownvoteButtonTooltipTitle(args: { isLoggedIn: boolean; hasVoted: boolean; disabled: boolean }) {
  if (!args.isLoggedIn) return 'Login to downvote this comment';
  if (args.disabled) return '';
  if (args.hasVoted) return 'Cancel downvote this comment';
  return 'Downvote this comment';
}

export default forwardRef(CommentItem);
