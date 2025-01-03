import { IPagination } from '@/common/@types/pagination.type';

export type ResponseData<T> = T extends any[] ? { data: T; meta: { pagination: IPagination } } : { data: T };
