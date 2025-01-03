'use client';

import { Flex, Select } from 'antd';
import { ArrowRightOutlined, CloseCircleFilled, SearchOutlined } from '@ant-design/icons';
import SearchInputStyle from '@/components/layout/Header/SearchInput/SearchInput.style';
import { ComponentProps, KeyboardEventHandler, useState } from 'react';
import { Blog } from '@/common/@types/blog.type';
import Divider from '@/components/common/Divider/Divider';
import SearchInputDropdownStyle from '@/components/layout/Header/SearchInput/SearchInputDropdown.style';
import { useDebounceCallback } from 'usehooks-ts';
import blogApiService from '@/services/BlogService';
import userApi, { IUser } from '@/services/UserService';
import LoadingIndicator from '@/components/common/Icon/LoadingIndicator';
import Link from 'next/link';
import { useRouter } from 'next-nprogress-bar';
import { Avatar, AvatarFallback } from '@/components/common/Avatar';
import { User } from 'lucide-react';

interface SearchInputProps extends ComponentProps<typeof Select> {}

interface SearchInputDropdownProps {
  blogs: Blog[];
  users: IUser[];
  searchValue: string;
  isSearching: boolean;
  onSelectItem?: () => void;
}

export default function SearchInput(props: SearchInputProps) {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useDebounceCallback(async (value: string) => {
    const [blogsData, usersData] = await Promise.all([
      blogApiService.getAllBlog({ title: value }),
      userApi.getAllUsers({ fullName: value }),
    ]);

    setBlogs(blogsData.data);
    setUsers(usersData.data);
    setIsSearching(false);
  }, 500);

  const handleOnSearchValueChange = (value: string) => {
    const trimmedSearchValue = value.trim();

    setSearchValue(value);
    setDropdownVisible(trimmedSearchValue !== '');

    if (trimmedSearchValue === '') {
      setBlogs([]);
      setUsers([]);
    }

    setIsSearching(true);
    debouncedSearch(trimmedSearchValue);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter' && dropdownVisible) {
      router.push(`/search?query=${encodeURIComponent(searchValue)}`);
      setDropdownVisible(false);
    }
  };

  const handleClearSearchValue = () => {
    setSearchValue('');
    setDropdownVisible(false);
  };

  return (
    <SearchInputStyle>
      <Select
        showSearch
        suffixIcon={
          searchValue !== '' ? <CloseCircleFilled onClick={handleClearSearchValue} /> : <SearchOutlined />
        }
        size='large'
        open={dropdownVisible}
        searchValue={searchValue}
        onSearch={handleOnSearchValueChange}
        onKeyDown={handleKeyDown}
        dropdownRender={() => (
          <SearchInputDropdown
            blogs={blogs}
            users={users}
            searchValue={searchValue}
            isSearching={isSearching}
            onSelectItem={() => setDropdownVisible(false)}
          />
        )}
        {...props}
      />
    </SearchInputStyle>
  );
}

function SearchInputDropdown({
  searchValue,
  isSearching,
  blogs,
  users,
  onSelectItem,
}: SearchInputDropdownProps) {
  const router = useRouter();

  return (
    <SearchInputDropdownStyle>
      {isSearching ? (
        <Flex justify='center' className='search-dropdown-loading'>
          <LoadingIndicator />
        </Flex>
      ) : (
        (blogs.length === 0 && users.length === 0) || (
          <div className='search-dropdown-body'>
            {blogs.length > 0 && (
              <>
                <div className='search-dropdown-group-header'>Blog Posts</div>
                {blogs.map((blog) => (
                  <Flex
                    vertical
                    className='search-dropdown-item'
                    key={`search-blog-${blog.blogId}`}
                    onClick={() => {
                      router.push(`/blog/${blog.blogId}`);
                      onSelectItem?.();
                    }}
                  >
                    <p className='search-dropdown-subtitle'>{blog.user?.fullName}</p>
                    <h3 className='search-dropdown-title'>{blog.title}</h3>
                    <p className='search-dropdown-subtitle'>
                      {new Intl.DateTimeFormat('en-US', { dateStyle: 'short' }).format(
                        new Date(blog.createTimestamp),
                      )}
                    </p>
                  </Flex>
                ))}
              </>
            )}
            {users.length > 0 && (
              <>
                {blogs.length > 0 && <Divider />}
                <div className='search-dropdown-group-header'>Users</div>
                {users.map((user) => (
                  <div
                    className='flex items-center gap-6 px-4 py-2 cursor-pointer transition-colors duration-300 hover:bg-white/10'
                    key={`search-user-${user.userId}`}
                    onClick={() => {
                      router.push(`/${user.uid}`);
                      onSelectItem?.();
                    }}
                  >
                    <Avatar className='h-12 w-12'>
                      <AvatarFallback>
                        <User className='h-8 w-8' />
                      </AvatarFallback>
                    </Avatar>
                    <p className='font-bold'>{user.fullName}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        )
      )}
      {(blogs.length === 0 && users.length === 0) || <Divider className='search-dropdown-divider-footer' />}
      <Link
        href={`/search?query=${encodeURIComponent(searchValue)}`}
        className='all-results-link'
        onClick={onSelectItem}
      >
        <Flex justify='space-between' className='search-dropdown-footer'>
          <p>See all results for "{searchValue}"</p>
          <ArrowRightOutlined />
        </Flex>
      </Link>
    </SearchInputDropdownStyle>
  );
}
