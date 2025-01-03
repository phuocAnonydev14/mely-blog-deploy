'use client';

import { useMediaQuery } from 'usehooks-ts';
import { breakpoints } from '@/common/constants/constants';
import useUser from '@/hooks/useUser';
import { Avatar, AvatarFallback } from '@/components/common/Avatar';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function UserAvatar() {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md})`);
  const { user } = useUser();

  return (
    <div className='flex items-center gap-6 px-2 py-3 cursor-pointer w-max'>
      <p className={cn('text-white', { hidden: isMobile })}>{user!.fullName}</p>
      <Avatar className='h-12 w-12'>
        <AvatarFallback>
          <User className='h-8 w-8' />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
