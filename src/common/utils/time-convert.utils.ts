import { format } from 'date-fns';
import { format as format_tz } from 'date-fns-tz';

export const dateToMMMMDYYYY = (dateStr: string) => {
  return format(dateStr, 'MMMM d, yyyy');
};

export const dateTo_yyyyMMdd = (dateStr: string) => {
  console.log(dateStr);
  return format(dateStr, 'yyyyMMdd');
};

export const getTimeUpdated = () => {
  const date = new Date();
  return format_tz(date, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", {
    timeZone: 'Asia/Ho_Chi_Minh',
  });
};
