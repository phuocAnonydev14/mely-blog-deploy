import { IPagination } from '@/common/@types/pagination.type';

export interface ResponseData<T> {
  data: T;
  meta?: {
    pagination: IPagination;
  };
}
