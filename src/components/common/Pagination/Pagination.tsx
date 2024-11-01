import { Pagination as AntPagination } from 'antd';
import { ComponentProps } from 'react';

export interface IPaginationProps extends ComponentProps<typeof AntPagination> {}

export default function Pagination(props: IPaginationProps) {
  return <AntPagination {...props} />;
}
