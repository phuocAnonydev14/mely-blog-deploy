import { VoteAction, VoteUserStatus } from '@/common/enums/blog.enum';

export default function voteActionToVoteUserStatus(action: VoteAction) {
  switch (action) {
    case VoteAction.UP_VOTE:
      return VoteUserStatus.UP_VOTE;

    case VoteAction.DOWN_VOTE:
      return VoteUserStatus.DOWN_VOTE;

    case VoteAction.CANCEL:
      return VoteUserStatus.NONE;

    default:
      throw new Error('Vote action is invalid');
  }
}
