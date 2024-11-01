'use client';

import { CaretDownOutlined as DownvoteButton, CaretUpOutlined as UpvoteButton } from '@ant-design/icons';
import VoteButtonStyle from './VoteButton.style';
import { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import clsx from 'clsx';
import formatNumberWithLeadingSign from '@/helpers/formatNumberWithLeadingSign';
import { Blog } from '@/common/@types/blog.type';
import { AuthModal } from '@/components/page/auth/AuthModal';
import useUser from '@/hooks/useUser';
import { VoteAction, VoteUserStatus } from '@/common/enums/blog.enum';

export default function VoteButton({ votes, blogId }: Partial<Blog>) {
  const [voteCount, setVoteCount] = useState(0);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [userStatus, setUserStatus] = useState(votes?.userStatus);
  const { isLoggedIn } = useUser();
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleVote = (action: VoteAction) => {
    if (!isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }
  };

  useEffect(() => {
    setVoteCount((votes?.upVote || 0) - (votes?.downVote || 0));
    setIsUpvoted(votes?.userStatus == VoteUserStatus.UP_VOTE);
    setIsDownvoted(votes?.userStatus == VoteUserStatus.DOWN_VOTE);
  }, []);

  return (
    <VoteButtonStyle>
      <Tooltip title='Upvote' placement='left'>
        <UpvoteButton
          className={clsx('upvote-btn', { activated: isUpvoted })}
          onClick={() => handleVote(VoteAction.UP_VOTE)}
        />
      </Tooltip>
      <span className='vote-count'>{formatNumberWithLeadingSign(voteCount)}</span>
      <Tooltip title='Downvote' placement='left'>
        <DownvoteButton
          className={clsx('downvote-btn', { activated: isDownvoted })}
          onClick={() => handleVote(VoteAction.DOWN_VOTE)}
        />
      </Tooltip>

      <AuthModal open={openLoginModal} onClose={() => setOpenLoginModal(false)} />
    </VoteButtonStyle>
  );
}
