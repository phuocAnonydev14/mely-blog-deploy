import { CommonFields } from '@/common/@types/commonFields.type';
import { BlogTypeCode, VoteAction, VoteUserStatus } from '@/common/enums/blog.enum';
import { User } from '@/common/@types/user.type';

export interface Blog extends CommonFields {
  blogId: string;
  title?: string;
  description?: string;
  content?: string;
  blogTypeCode?: BlogTypeCode;
  link?: string;
  categories: Category[];
  image?: string;
  user?: User;
  votes?: BlogVote;
}

export interface BlogUserStatus {
  voteStatus: VoteAction;
  bookmarkCate: string;
}

export enum BlogVoteActionEnum {
  UP_VOTE = '0',
  DOWN_VOTE = '1',
  CANCEL = '2',
}

export interface BlogVote {
  upVote: number;
  downVote: number;
  userStatus?: VoteUserStatus;
}

export interface Category extends CommonFields {
  categoryId: string;
  name?: string;
  approvalStatus?: boolean | null;
}

export interface Comment extends CommonFields {
  blogCommentId: string;
  userId: string;
  content: string;
  user: User;
  replyTo: string | null;
  votes: BlogVote;
  countReplies: number;
}
