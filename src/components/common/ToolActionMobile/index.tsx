import { PropsWithChildren } from 'react';
import { ToolActionMobileStyle } from '@/components/common/ToolActionMobile/ToolActionMobile.style';

export const ToolActionMobile = ({ isMobile, children }: { isMobile: boolean } & PropsWithChildren) => {
  return (
    <ToolActionMobileStyle>
      <div style={{ display: isMobile ? 'flex' : 'none' }} className='responsiveAction'>
        {children}
      </div>
    </ToolActionMobileStyle>
  );
};
