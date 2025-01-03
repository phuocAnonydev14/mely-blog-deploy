import { CommonFields } from '@/common/@types/commonFields.type';
import { Blog } from '@/common/@types/blog.type';

export interface BookmarkCategory extends CommonFields {
  bookmarkCategoryId: string;
  bookmarkCategoryName: string;
  description: string;
  isActive: boolean;
  isDefault: boolean;
  blogBookmark: any[];
  blogs: Blog[];
}
