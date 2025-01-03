'use client';

import { Blog } from '@/common/@types/blog.type';
import { IUser } from '@/services/UserService';
import SearchPageStyle from './SearchPage.style';
import { Flex } from 'antd';
import clsx from 'clsx';
import BlogSearchResults from '@/components/page/search/BlogSearchResults';
import UserSearchResults from '@/components/page/search/UserSearchResults';
import { IPagination } from '@/common/@types/pagination.type';
import { useRouter } from 'next-nprogress-bar';
import { SearchType } from '@/common/enums/search-type.enum';
import AdvancedBlogSearchDrawer from '@/components/page/search/AdvancedBlogSearchModal';
import Pagination from '@/components/common/Pagination/Pagination';

interface SearchPageProps {
  query: string;
  type: SearchType;
  blogs: Blog[];
  users: IUser[];
  filterCategories: string[];
  pagination: IPagination;
}

export default function SearchPage({
  query,
  type,
  blogs,
  users,
  pagination,
  filterCategories,
}: SearchPageProps) {
  const router = useRouter();

  const handleNavigateToSearchType = (type: SearchType) => {
    const url = new URL(location.href);
    url.searchParams.set('type', type);
    router.push(url.href);
  };

  const handleSetPage = (page: number) => {
    const url = new URL(location.href);
    url.searchParams.set('page', `${page}`);
    router.push(url.href);
  };

  return (
    <SearchPageStyle>
      <Flex justify='space-between' align='center'>
        <h1>
          Search results for <span className='search-page-query'>{decodeURIComponent(query)}</span>
        </h1>
        {pagination.total !== 0 && (
          <Pagination
            defaultCurrent={pagination.page}
            total={pagination.total}
            pageSize={pagination.pageSize}
            onChange={handleSetPage}
            showSizeChanger={false}
          />
        )}
      </Flex>
      <Flex justify='space-between' align='center'>
        <ul className='search-types'>
          <li
            onClick={() => handleNavigateToSearchType(SearchType.BLOG)}
            className={clsx('search-type', { activated: type === 'blog' })}
          >
            Blogs
          </li>
          <li
            onClick={() => handleNavigateToSearchType(SearchType.USER)}
            className={clsx('search-type', { activated: type === 'user' })}
          >
            Users
          </li>
        </ul>
        {type === SearchType.BLOG && <AdvancedBlogSearchDrawer categories={filterCategories} />}
      </Flex>
      <div className='results-container'>
        {type === SearchType.BLOG && <BlogSearchResults blogs={blogs} />}
        {type === SearchType.USER && <UserSearchResults users={users} />}
      </div>
    </SearchPageStyle>
  );
}
