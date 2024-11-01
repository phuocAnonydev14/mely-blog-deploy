'use client';

import { OtherInformationGroupStyle } from '@/components/page/about-me/OtherInformationGroup/other-information-group';
import { useEffect, useState } from 'react';
import { Empty, Typography } from 'antd';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import PostUser from '@/components/page/about-me/Post/Post';
import { useCheckOwner } from '@/hooks/useCheckOwner';

const contentListNoTitle = (isOwner: boolean, userId: string): Record<string, React.ReactNode> => {
  return {
    dashboard: <p>dashboard content</p>,
    post: <PostUser isOwner={isOwner} userId={userId} />,
    bookmark: (
      <Empty
        image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
        imageStyle={{ height: 60 }}
        description={<Typography.Text>You don&apos;t have any bookmark</Typography.Text>}
        className={'flex justify-center flex-col items-center'}
      ></Empty>
    ),
  };
};

export interface OtherInformationGroupProps {
  userId: string;
}

interface GetTabListProps {
  isOwner: boolean;
  isLoadingGetOwner?: boolean;
}

const getTabList = ({ isOwner, isLoadingGetOwner }: GetTabListProps) => {
  return [
    {
      key: 'dashboard',
      label: 'Dashboard',
      access: isLoadingGetOwner ? true : isOwner,
    },
    {
      key: 'post',
      label: 'Post',
      access: true,
    },
    {
      key: 'bookmark',
      label: 'Bookmark',
      access: isLoadingGetOwner ? true : isOwner,
    },
  ].filter((item) => item.access);
};

export default function OtherInformationGroup({ userId }: OtherInformationGroupProps) {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tabView = searchParams.get('tab');
  const [isOwner, isLoadingGetOwner] = useCheckOwner(userId);
  const [tabList, setTabList] = useState(getTabList({ isOwner, isLoadingGetOwner }));
  const [tab, setTab] = useState(tabList[0].key);

  useEffect(() => {
    setTabList(getTabList({ isOwner, isLoadingGetOwner }));
  }, [isLoadingGetOwner, isOwner]);

  useEffect(() => {
    const index = tabList.findIndex((tab) => tab.key === tabView);
    if (index === -1) {
      setTab(tabList[0].key);
      router.push(`${pathname}?tab=${tabList[0].key}`);
    } else setTab(tabList[index].key);
  }, [tabView, tabList, router, pathname]);

  return (
    <OtherInformationGroupStyle
      style={{ width: '100%' }}
      tabList={tabList}
      activeTabKey={tab}
      onTabChange={(key) => {
        setTab(key);
        router.push(`${pathname}?tab=${key}`);
      }}
      tabProps={{
        size: 'middle',
      }}
    >
      {contentListNoTitle(isOwner, params.userId as string)[tab]}
    </OtherInformationGroupStyle>
  );
}
