import UserSearchResultsStyle from '@/components/page/search/UserSearchResults/UserSearchResults.style';
import Button from '@/components/common/Button/Button';
import { IUser } from '@/services/UserService';
import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Empty, Flex, Row } from 'antd';
import Link from 'next/link';

interface UserSearchResultsProps {
  users: IUser[];
}

export default function UserSearchResults({ users }: UserSearchResultsProps) {
  if (users.length === 0) {
    return (
      <div className='w-full flex flex-col items-center justify-center gap-10'>
        <img src='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg' alt='' />
        <p className='text-muted-foreground'>No users found.</p>
      </div>
    );
  }

  return (
    <UserSearchResultsStyle>
      <Row gutter={[16, 16]}>
        {users.map((user, index) => (
          <Col key={`user-search-result-${index}`} lg={6} sm={24}>
            <Card
              className='user-search-result'
              cover={
                <img
                  alt='bg'
                  className='user-search-result-bg'
                  style={{ filter: 'blur(5px)' }}
                  src={
                    user.avatar ||
                    'https://images.unsplash.com/photo-1731493710740-136a5ce91c57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D'
                  }
                />
              }
            >
              <Flex vertical justify='center' align='center' gap={16} className='user-search-result-content'>
                <Avatar
                  className='user-search-result-avatar'
                  src={
                    user.avatar ||
                    'https://images.unsplash.com/photo-1731493710740-136a5ce91c57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D'
                  }
                  size={80}
                />
                <Link href={`/${user.uid}`} className='user-search-result-username'>
                  <h3>{user.fullName}</h3>
                </Link>
                <p>{user.blogsCount} posts</p>
                <Button icon={<PlusOutlined />}>Follow</Button>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </UserSearchResultsStyle>
  );
}
