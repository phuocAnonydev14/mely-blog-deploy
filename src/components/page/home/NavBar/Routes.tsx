import {
  FireOutlined,
  MessageOutlined,
  SearchOutlined,
  TeamOutlined,
  ToTopOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

export const navbarTabs = [
  {
    title: 'Squads',
    routes: [
      {
        name: 'Public Squads',
        reference: '/',
        icon: <TeamOutlined />,
      },
      {
        name: 'New Squad',
        reference: '/',
        icon: <UsergroupAddOutlined />,
      },
    ],
  },
  {
    title: 'Discover',
    routes: [
      {
        name: 'Popular',
        reference: '/',
        icon: <FireOutlined />,
      },
      {
        name: 'Most upvoted',
        reference: '/',
        icon: <ToTopOutlined />,
      },
      {
        name: 'Best discussions',
        reference: '/',
        icon: <MessageOutlined />,
      },
      {
        name: 'Search',
        reference: '/',
        icon: <SearchOutlined />,
      },
    ],
  },
  {
    title: 'Contribute',
    routes: [
      {
        name: 'Submit article',
        reference: '/',
        icon: <FireOutlined />,
      },
      {
        name: 'Suggest new source',
        reference: '/',
        icon: <ToTopOutlined />,
      },
    ],
  },
  {
    title: 'Manage',
    routes: [
      {
        name: 'Bookmarks',
        reference: '/',
        icon: <FireOutlined />,
      },
      {
        name: 'Reading history',
        reference: '/',
        icon: <FireOutlined />,
      },
      {
        name: 'Customize',
        reference: '/',
        icon: <FireOutlined />,
      },
    ],
  },
  {
    title: '',
    routes: [
      {
        name: 'Docs',
        reference: '/',
        icon: <FireOutlined />,
      },
      {
        name: 'Changelog',
        reference: '/',
        icon: <FireOutlined />,
      },
      {
        name: 'Feedback',
        reference: '/',
        icon: <FireOutlined />,
      },
      {
        name: 'Invite people',
        reference: '/',
        icon: <FireOutlined />,
      },
    ],
  },
];
