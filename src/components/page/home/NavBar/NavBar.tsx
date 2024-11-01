import React from 'react';
import NavbarStyle from './NavBar.style';
import { navbarTabs } from './Routes';
import Link from 'next/link';

const BlogNav = () => {
  return (
    <NavbarStyle>
      <div className='navbar'>
        <div className='navbar_avatar'></div>
        {navbarTabs.map((tab) => {
          const { title, routes } = tab;
          return (
            <div className='navbar_item' key={title}>
              <h3>{title}</h3>
              <div>
                {routes.map((route) => {
                  const { name, reference, icon } = route;
                  return (
                    <div className='navbar_item__route' key={name}>
                      <Link href={reference}>
                        {icon} {name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </NavbarStyle>
  );
};

export default BlogNav;
