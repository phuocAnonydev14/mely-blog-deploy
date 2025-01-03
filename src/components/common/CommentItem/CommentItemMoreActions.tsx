import { Comment } from '@/common/@types/blog.type';
import useUser from '@/hooks/useUser';
import { DeleteOutlined, EditOutlined, FlagOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';

interface CommentItemMoreActionsProps {
  comment: Comment;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onReportClick?: () => void;
  disabled?: boolean;
}

export default function CommentItemMoreActions({
  comment,
  onEditClick,
  onDeleteClick,
  onReportClick,
  disabled,
}: CommentItemMoreActionsProps) {
  const { user } = useUser();

  const items: MenuProps['items'] = [
    ...(comment.userId === user?.userId
      ? [
          {
            key: '1',
            icon: <EditOutlined size={1} onClick={onEditClick} />,
            label: 'Edit',
            onClick: onEditClick,
          },
          {
            key: '2',
            icon: <DeleteOutlined size={1} onClick={onDeleteClick} />,
            label: 'Delete',
            onClick: onDeleteClick,
          },
        ]
      : []),
    ...(comment.userId !== user?.userId
      ? [
          {
            key: '3',
            icon: <FlagOutlined size={1} />,
            label: 'Report',
            onClick: onReportClick,
          },
        ]
      : []),
  ];

  return (
    <Dropdown placement='bottomRight' menu={{ items }} disabled={disabled}>
      <MoreOutlined
        rotate={90}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1 }}
      />
    </Dropdown>
  );
}
