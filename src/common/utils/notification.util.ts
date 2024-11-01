import { notification } from 'antd';
import { GlobalConfigProps } from 'antd/es/notification/interface';

export enum ENotification {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export interface INotificationProps extends GlobalConfigProps {
  type: ENotification;
  message: string;
  description?: string;
}

// notification.config({
//   duration: 3,
// });

export const openNotification = (props: INotificationProps) => {
  const type: ENotification = props.type;
  notification[type]({
    message: props.message,
    description: props.description,
  });
};
