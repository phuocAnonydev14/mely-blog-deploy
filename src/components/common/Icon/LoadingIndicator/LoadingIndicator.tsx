import { LoadingOutlined } from '@ant-design/icons';
import { ComponentProps } from 'react';

export default function LoadingIndicator(props: Omit<ComponentProps<typeof LoadingOutlined>, 'spin'>) {
  return <LoadingOutlined spin {...props} />;
}
