import React from 'react';

import '../index.css';
import Navbar from './Navbar';

const NavbarHome = () => {
  const links = [
    { id: 'workshops', link: '/workshops' },
    { id: 'coaches', link: '/coaches' },
    { id: 'resources', link: '/resources' },
  ];
  return <Navbar links={links} />;
};

export default NavbarHome;
