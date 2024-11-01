'use client';
import React from 'react';
import { SidebarStyle } from './Sidebar.style';
import Image from 'next/image';
import { SIDEBAR } from '@/common/enums/app.enum';

export interface ISidebar {
  title: string;
  subnav: {
    title: string;
    icon: React.FC<any>;
  }[];
}

const Sidebar = () => {
  return (
    <SidebarStyle>
      <div className='sidebar__heading'>
        <Image className='avatar' src='/code_mely_avatar.jpg' height={30} width={30} alt='' />
        <p>My Feed</p>
      </div>
      <div className='sidebar__content'>
        <ul className='navbar'>
          {SIDEBAR.map((item) => (
            <li key={item.title}>
              <p>{item.title}</p>
              <div className='subnav'>
                {item.subnav.map((subnav) => (
                  <div key={subnav.title} className='subnav-item'>
                    <div className='icon'>
                      <subnav.icon />
                    </div>
                    <p>{subnav.title}</p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SidebarStyle>
  );
};

export default Sidebar;
