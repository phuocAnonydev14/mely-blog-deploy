'use client';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';
import { useMediaQuery } from 'usehooks-ts';
import { breakpoints } from '@/common/constants/constants';
import UserAvatarStyle from '@/components/layout/Header/UserAvatar/UserAvatar.style';
import useUser from '@/hooks/useUser';

export default function UserAvatar() {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md})`);
  const { user } = useUser();

  return (
    <UserAvatarStyle>
      <Typography.Text hidden={isMobile} style={{ width: 'max-content' }}>
        {user?.fullName}
      </Typography.Text>
      <Avatar icon={<UserOutlined />} src={user?.avatar} />
    </UserAvatarStyle>
  );
}
