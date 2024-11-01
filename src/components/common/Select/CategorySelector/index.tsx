'use client';
import { Select, SelectProps, Tag } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Category } from '@/common/@types/blog.type';
import { fetchCategories } from '@/components/common/Select/CategorySelector/fetchCategory';

type TagRender = SelectProps['tagRender'];

const options: SelectProps['options'] = [];

const colorList = ['gold', 'lime', 'green', 'cyan'];

const TagSelector: TagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const colors = useMemo(() => colorList[Math.floor(Math.random() * 3)], value);

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
}

export const CategorySelector = (props: CategorySelectorProps) => {
  const { tagIdsList, setTagIdsList } = props;
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    (async () => {
      const categories = (await fetchCategories())?.data;
      console.log({ categories });
      setCategories(categories);
    })();
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: '20px', marginBottom: 12, fontWeight: 600 }}>Select categories: </h2>
      <Select
        value={tagIdsList}
        onChange={(val) => setTagIdsList(val)}
        mode='tags'
        tagRender={TagSelector}
        style={{ width: '100%' }}
        options={categories.map(({ categoryId, iconCode, name }) => ({
          value: categoryId,
          label: `${iconCode} ${name}`,
        }))}
      />
    </div>
  );
};
