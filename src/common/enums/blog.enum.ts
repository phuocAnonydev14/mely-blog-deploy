enum BlogTypeCode {
  DEFAULT = '00',
  SHARE_BY_LINK = '01',
}

enum VoteAction {
  UP_VOTE = 0,
  DOWN_VOTE = 1,
  CANCEL = 2,
}

enum VoteUserStatus {
  UP_VOTE = 'upvote',
  DOWN_VOTE = 'downvote',
  NONE = 'none',
}

export { BlogTypeCode, VoteAction, VoteUserStatus };
