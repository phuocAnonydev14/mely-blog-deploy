import userApi, { IUser } from '@/services/UserService';
import SearchPage from '@/components/page/search/SearchPage';
import { Blog } from '@/common/@types/blog.type';
import blogApiService from '@/services/BlogService';
import { IPagination } from '@/common/@types/pagination.type';
import { SearchType } from '@/common/enums/search-type.enum';

interface SearchProps {
  searchParams: Promise<{
    query: string;
    type: SearchType;
    page: string;
    category: string[];
  }>;
}

export const revalidate = 0;

export default async function Search(props: SearchProps) {
  const searchParams = await props.searchParams;
  let { query, type, page, category: categories } = searchParams;

  query = query || '';
  type = type || SearchType.BLOG;
  page = page || '1';

  categories = typeof categories === 'string' ? [categories] : categories;
  const decodedQuery = decodeURIComponent(query);
  let blogs: Blog[] = [];
  let users: IUser[] = [];
  let pagination: IPagination;

  switch (type) {
    case SearchType.BLOG:
      const blogsRes = await blogApiService.getAllBlog({ title: decodedQuery, category: categories, page });
      blogs = blogsRes.data;
      pagination = blogsRes.meta.pagination;
      break;
    case SearchType.USER:
      const usersRes = await userApi.getAllUsers({ fullName: decodedQuery, page });
      users = usersRes.data;
      pagination = usersRes.meta.pagination;
      break;
  }

  return (
    <SearchPage
      query={decodedQuery}
      type={type}
      blogs={blogs}
      users={users}
      filterCategories={categories}
      pagination={pagination}
    />
  );
}
