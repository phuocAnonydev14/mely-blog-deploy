'use client';

import { CaretDownOutlined as DownvoteButton, CaretUpOutlined as UpvoteButton } from '@ant-design/icons';
import VoteButtonStyle from './VoteButton.style';
import { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import clsx from 'clsx';
import formatNumberWithLeadingSign from '@/helpers/formatNumberWithLeadingSign';
import postApiService from '@/services/BlogService';
import { Blog, BlogVoteActionEnum } from '@/common/@types/blog.type';
import { AuthModal } from '@/components/page/auth/AuthModal';
import { VoteAction, VoteUserStatus } from '@/common/enums/blog.enum';
import useUser from '@/hooks/useUser';
import useBlog from '@/hooks/useBlog';

export default function VoteButton({ votes, blogId }: Partial<Blog>) {
  const [voteCount, setVoteCount] = useState(0);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const { blogUserStatus } = useBlog();
  const [userStatus, setUserStatus] = useState<VoteAction | null>(
    blogUserStatus?.voteStatus !== undefined ? (blogUserStatus?.voteStatus as any) : null,
  );
  const { isLoggedIn } = useUser();
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleUpvote = async () => {
    try {
      if (!isLoggedIn) {
        setOpenLoginModal(true);
        return;
      }
      if (isUpvoted) {
        setIsUpvoted(false);
        await postApiService.updateBlogVote(VoteAction.DOWN_VOTE, blogId as string);
        setUserStatus(VoteAction.DOWN_VOTE);
        setVoteCount((state) => state - 1);
        return;
      }
      setUserStatus(VoteAction.UP_VOTE);
      setVoteCount((state) => state + (isDownvoted ? 2 : 1));
      setIsDownvoted(false);
      setIsUpvoted(true);
      if (userStatus === VoteAction.NOT_VOTE_YET) {
        await postApiService.createBlogVote(VoteAction.UP_VOTE, blogId as string);
      } else {
        await postApiService.updateBlogVote(VoteAction.UP_VOTE, blogId as string);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDownvote = async () => {
    try {
      if (!isLoggedIn) {
        setOpenLoginModal(true);
        return;
      }
      if (isDownvoted) {
        await postApiService.updateBlogVote(VoteAction.UP_VOTE, blogId as string);
        setVoteCount((state) => state + 1);
        setUserStatus(VoteAction.UP_VOTE);
        setIsDownvoted(false);
        return;
      }
      setUserStatus(VoteAction.DOWN_VOTE);
      setVoteCount((state) => state - (isUpvoted ? 2 : 1));
      setIsUpvoted(false);
      setIsDownvoted(true);
      if (userStatus === VoteAction.NOT_VOTE_YET) {
        await postApiService.createBlogVote(VoteAction.DOWN_VOTE, blogId as string);
      } else {
        await postApiService.updateBlogVote(VoteAction.DOWN_VOTE, blogId as string);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setVoteCount((votes?.upVote || 0) - (votes?.downVote || 0));
    setIsUpvoted(blogUserStatus?.voteStatus == (BlogVoteActionEnum.UP_VOTE as any));
    setIsDownvoted(blogUserStatus?.voteStatus == (BlogVoteActionEnum.DOWN_VOTE as any));
  }, []);

  return (
    <VoteButtonStyle>
      <Tooltip title='Upvote' placement='left'>
        <UpvoteButton className={clsx('upvote-btn', { activated: isUpvoted })} onClick={handleUpvote} />
      </Tooltip>
      <span className='vote-count'>{formatNumberWithLeadingSign(voteCount)}</span>
      <Tooltip title='Downvote' placement='left'>
        <DownvoteButton
          className={clsx('downvote-btn', { activated: isDownvoted })}
          onClick={handleDownvote}
        />
      </Tooltip>

      <AuthModal open={openLoginModal} onClose={() => setOpenLoginModal(false)} />
    </VoteButtonStyle>
  );
}
