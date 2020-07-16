import React from 'react';

import Navbar from './Navbar';

const NavbarHome = ({ currentUser }) => {
  const currentUserRole = currentUser && currentUser.role;
  const links =
    currentUserRole === 'admin'
      ? [
          { id: 'workshops', link: '/workshops' },
          { id: 'coaches', link: '/coaches' },
          // { id: 'resources', link: '/resources' },
        ]
      : [
          { id: 'workshops', link: '/workshops' },
          // { id: 'resources', link: '/resources' },
        ];
  return <Navbar links={links} />;
};

export default NavbarHome;
