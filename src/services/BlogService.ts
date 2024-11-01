import { Blog } from '@/common/@types/blog.type';
import { BlogTypeCode, VoteAction } from '@/common/enums/blog.enum';
import { ResponseData } from '@/common/@types/app.type';
import HttpService from './HttpService';
import { Comment } from '@/common/@types/blog.type';
import { BlogCommentOrder } from '@/common/enums/blog-comment-order.enum';

interface BlogMetadata {
  // TODO: add post metadata properties
}

export interface GetAllBlogPostParams {
  page?: string;
  pageSize?: string;
  userId?: string;
  keyword?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
}

export interface GetAllBlogCommentParams {
  page?: number;
  pageSize?: number;
  replyTo?: string;
  blogId: string;
  order?: BlogCommentOrder | BlogCommentOrder[];
}

interface CreateBlogParams {
  title: string;
  link: string;
  description: string;
  content: string;
  tagIdsList: string[];
  blogTypeCode: BlogTypeCode;
  tempFileIdsList: string[] | string;
}

interface CreateBlogCommentParams {
  content: string;
}

interface CreateBlogCommentVoteParams {
  status: VoteAction;
}

interface AddTempFile {
  file: File;
  eventId: '00';
}

class BlogApiService extends HttpService {
  static POST_PER_PAGE = 9;

  async getAllBlog(params: GetAllBlogPostParams) {
    return this.get<ResponseData<Blog[]>>(
      '/blogs',
      { ...params, pageSize: params?.pageSize ?? BlogApiService.POST_PER_PAGE.toString() },
      true,
    );
  }

  async getTrendingBlog(params: GetAllBlogPostParams) {
    return this.get<ResponseData<Blog[]>>('/blogs/trending', { ...params }, true);
  }

  async getById(id: string) {
    return (await this.get<ResponseData<Blog>>(`/blogs/${id}`, {}, false))?.data;
  }

  getAll() {
    return this.get<BlogMetadata[]>('/blogs');
  }

  create(data: CreateBlogParams) {
    return this.post<ResponseData<Blog>, CreateBlogParams>('/blogs', data);
  }

  updateBlog(id: string, data: BlogMetadata) {
    return this.update<ResponseData<Blog>, BlogMetadata>(`/blogs/${id}`, data);
  }

  async addTempFile(data: FormData) {
    return this.post<ResponseData<any>, FormData>('/temp-files', data);
  }

  async createBlogVote(status: VoteAction, blogId: string) {
    return this.post(`/blogs/blog-votes/${blogId}`, { status }, {}, false);
  }

  async updateBlogVote(status: VoteAction, blogId: string) {
    return this.update(`/blogs/blog-votes/${blogId}`, { status }, {}, false);
  }

  async getAllComments(params?: GetAllBlogCommentParams, isPublic = true) {
    return this.get<ResponseData<Comment[]>>(`/blogs/comments/all`, params, isPublic, false);
  }

  async getOneComment(commentId: string, isPublic = true) {
    return this.get<ResponseData<Comment>>(`/blogs/comments/${commentId}`, {}, isPublic, false);
  }

  async createComment(blogId: string, content: string) {
    return this.post<ResponseData<Comment>, CreateBlogCommentParams>(`/blogs/comments/${blogId}`, {
      content,
    });
  }

  async replyComment(blogCommentId: string, content: string) {
    return this.post<ResponseData<Comment>, CreateBlogCommentParams>(
      `/blogs/comments/reply/${blogCommentId}`,
      {
        content,
      },
    );
  }

  async updateComment(blogCommentId: string, content: string) {
    return this.update<ResponseData<Comment>, CreateBlogCommentParams>(`/blogs/comments/${blogCommentId}`, {
      content,
    });
  }

  async deleteComment(blogCommentId: string) {
    return this.remove(`/blogs/comments/${blogCommentId}`);
  }

  async createCommentVote(blogCommentId: string, status: VoteAction) {
    return this.post<any, CreateBlogCommentVoteParams>(`/blogs/comments/votes/${blogCommentId}`, {
      status,
    });
  }

  async updateCommentVote(blogCommentId: string, status: VoteAction) {
    return this.update<any, CreateBlogCommentVoteParams>(`/blogs/comments/votes/${blogCommentId}`, {
      status,
    });
  }
}

const blogApiService = new BlogApiService();
export default blogApiService;
