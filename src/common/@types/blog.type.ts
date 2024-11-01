import { CommonFields } from '@/common/@types/commonFields.type';
import { BlogTypeCode, VoteUserStatus } from '@/common/enums/blog.enum';
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

export interface BlogVote {
  upVote: number;
  downVote: number;
  userStatus?: VoteUserStatus;
}

export interface Category extends CommonFields {
  categoryId: string;
  name?: string;
  iconCode?: string;
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
