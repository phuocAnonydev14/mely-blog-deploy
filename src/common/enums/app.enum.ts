import {
  BlockOutlined,
  BookOutlined,
  CommentOutlined,
  CopyOutlined,
  DragOutlined,
  EyeOutlined,
  FileAddOutlined,
  FireOutlined,
  PaperClipOutlined,
  RedoOutlined,
  SearchOutlined,
  SettingOutlined,
  ShareAltOutlined,
  UpCircleOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { ISidebar } from '@/components/common/Sidebar/Sidebar';

export enum DeviceMinSize {
  DESKTOP = 1024,
  TABLET = 768,
  MOBILE = 320,
}

export enum SocialLink {
  FACEBOOK_MELY = 'https://www.facebook.com/code.mely',
  DISCORD = 'https://discord.com/servers/code-mely-853907347528220712',
  INSTAGRAM = 'https://www.instagram.com/code.mely/',
  FACEBOOK_GROUP = 'https://www.facebook.com/groups/3059387787464905',
  FACEBOOK_MESEC = 'https://www.facebook.com/mesec.official',
  RULE_GROUP = 'https://docs.google.com/document/d/1N4oEvtXlsYwcAxjBBMspJM17e5hcfrcYzfN9OUYUjdg/view',
}

export const SIDEBAR: ISidebar[] = [
  {
    title: 'Squads',
    subnav: [
      {
        title: 'Public Squads',
        icon: UsergroupAddOutlined,
      },
      {
        title: 'New Squad',
        icon: FileAddOutlined,
      },
    ],
  },
  {
    title: 'Discover',
    subnav: [
      {
        title: 'Popular',
        icon: FireOutlined,
      },
      {
        title: 'New Squad',
        icon: UpCircleOutlined,
      },
      {
        title: 'Best discussions',
        icon: CommentOutlined,
      },
      {
        title: 'Search',
        icon: SearchOutlined,
      },
    ],
  },
  {
    title: 'Contribute',
    subnav: [
      {
        title: 'Submit article',
        icon: PaperClipOutlined,
      },
      {
        title: 'Suggest new source',
        icon: DragOutlined,
      },
    ],
  },
  {
    title: 'Manage',
    subnav: [
      {
        title: 'Bookmarks',
        icon: BlockOutlined,
      },
      {
        title: 'Reading history',
        icon: EyeOutlined,
      },
      {
        title: 'Customize',
        icon: SettingOutlined,
      },
    ],
  },
  {
    title: '',
    subnav: [
      {
        title: 'Docs',
        icon: BookOutlined,
      },
      {
        title: 'Changelog',
        icon: RedoOutlined,
      },
      {
        title: 'Feedback',
        icon: CopyOutlined,
      },
      {
        title: 'Invite people',
        icon: ShareAltOutlined,
      },
    ],
  },
] as const;

export enum EAuthProvider {
  DEFAULT,
  GOOGLE,
  FACEBOOK,
  GITHUB,
}

export enum EToken {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
  USER_TOKEN = 'user',
  USER_ID = 'userId',
}

export enum EHttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
