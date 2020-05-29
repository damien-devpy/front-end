import React from 'react';
import '../index.css';

import Navbar from './Navbar.js';

const NavbarHome = ({ avatarUrl }) => {
  const links = [
    'coaches',
    'workshops',
    // 'simulation',
    'ressources',
    // 'participants',
  ];
  return <Navbar links={links} avatarUrl={avatarUrl} />;
};

export default NavbarHome;
