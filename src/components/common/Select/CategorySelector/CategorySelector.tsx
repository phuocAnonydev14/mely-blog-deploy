'use client';
import { Flex, Select, SelectProps, Tag } from 'antd';
import { useMemo, useState } from 'react';
import { Category } from '@/common/@types/blog.type';
import { categoryService } from '@/services/CategoryService';
import { useDebounceCallback } from 'usehooks-ts';
import LoadingIndicator from '@/components/common/Icon/LoadingIndicator';

type TagRender = SelectProps['tagRender'];

const colorList = ['gold', 'lime', 'green', 'cyan'];

const TagSelector: TagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const colors = useMemo(() => colorList[Math.floor(Math.random() * 3)], [value]);

  return (
    <Tag
      color={colors}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

interface CategorySelectorProps {
  tagIdsList: string[];
  setTagIdsList: (val: string[]) => void;
  allowAddNew?: boolean;
}

export const CategorySelector = (props: CategorySelectorProps) => {
  const { tagIdsList, setTagIdsList } = props;
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebounceCallback(async (value: string) => {
    const { data } = await categoryService.getAllCategories({ name: value });
    setCategories(data);
    setIsSearching(false);
  }, 1000);

  const handleOnSearchValueChange = (value: string) => {
    const trimmedSearchValue = value.trim();
    setSearchValue(trimmedSearchValue);

    if (trimmedSearchValue === '') {
      setCategories([]);
      return;
    }

    setIsSearching(true);
    debouncedSearch(trimmedSearchValue);
  };

  return (
    <Select
      value={tagIdsList}
      mode={props.allowAddNew ? 'tags' : 'multiple'}
      tagRender={TagSelector}
      style={{ width: '100%' }}
      loading={isSearching}
      options={categories.map(({ name }) => ({
        value: name,
        label: name,
      }))}
      onBlur={() => setCategories([])}
      onChange={(val) => setTagIdsList(val)}
      onSearch={handleOnSearchValueChange}
      dropdownRender={(menu) => {
        if (isSearching) {
          return (
            <Flex justify='center' align='center' style={{ paddingBlock: '1.6rem' }}>
              <LoadingIndicator style={{ fontSize: '2rem' }} />
            </Flex>
          );
        }

        if (categories.length > 0 && searchValue !== '') return menu;

        return <></>;
      }}
    />
  );
};
