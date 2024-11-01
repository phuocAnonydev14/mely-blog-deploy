'use client';

import { ProfileStyle } from '@/components/page/about-me/Profile/profile.style';
import { Avatar, Card, Flex, Typography } from 'antd';
import Title from '@/components/common/Title/Title';
import { mdiGenderFemale, mdiGenderMale, mdiGenderMaleFemale } from '@mdi/js';
import Icon from '@mdi/react';
import { EGender } from '@/common/enums/gender.enum';
import { dateToMMMMDYYYY } from '@/common/utils/time-convert.utils';
import Button, { EButtonTheme } from '@/components/common/Button/Button';
import { EditOutlined } from '@ant-design/icons';
import Link from '@/components/common/Link/Link';
import useUser from '@/hooks/useUser';
import { useEffect, useState } from 'react';
import userApi, { IUser } from '@/services/UserService';
import Image from 'next/image';

const { Meta } = Card;

export interface ProfileProps {
  userId: string;
}

export default function Profile({ userId }: ProfileProps) {
  const { user: currentSignedInUser, isLoading } = useUser();
  const [user, setUser] = useState<IUser>();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    (async () => {
      if (isLoading) return;

      if (currentSignedInUser && (currentSignedInUser.userId === userId || userId === 'me')) {
        setUser(currentSignedInUser);
        setIsOwner(true);
        return;
      }

      const { data } = await userApi.getUser(userId);
      setUser(data);
      setIsOwner(false);
    })();
  }, [currentSignedInUser, isLoading, userId]);

  const genderIcon = () => {
    if (!user) return <></>;
    else {
      switch (user.genderCode) {
        case EGender.MALE:
          return <Icon path={mdiGenderMale} size={1.1} color={'#3498DB'} />;
        case EGender.FEMALE:
          return <Icon path={mdiGenderFemale} size={1.1} color={'#FF4191'} />;
        case EGender.OTHER:
          return <Icon path={mdiGenderMaleFemale} size={1.1} />;
      }
    }
  };

  return (
    <ProfileStyle>
      <Card
        hoverable
        className={'card-profile'}
        cover={
          <Image alt='bg' className={'bg-image'} style={{ filter: 'blur(5px)' }} src={user?.avatar || ''} />
        }
        actions={
          isOwner
            ? [
                <Link key={Math.random() * 1000} href={`setting/account`}>
                  <Button className={'btn-edit-profile'} color={EButtonTheme.PRIMARY}>
                    <EditOutlined />
                    Edit profile
                  </Button>
                </Link>,
              ]
            : undefined
        }
      >
        <Avatar className={'avatar'} src={user?.avatar} size={80} />

        <div style={{ padding: '16px' }}></div>
        <Meta
          className={'item-card'}
          title={
            <Flex align={'center'} gap={4}>
              <span>{user?.fullName}</span>
              {genderIcon()}
            </Flex>
          }
          description={`#${user?.userId} • Joined ${dateToMMMMDYYYY(user?.createTimestamp ?? new Date().toString())}`}
        />
        <Flex className={'item-card'} justify={'start'} gap={8}>
          <Title highlight={'0'} description={'Followers'} />
          <Title highlight={'0'} description={'Upvotes'} />
          <Title highlight={'0'} description={'View'} />
        </Flex>
        <Typography.Text className={'item-card'}>{user?.description}</Typography.Text>
      </Card>
    </ProfileStyle>
  );
}
