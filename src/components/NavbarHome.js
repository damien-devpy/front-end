import React from 'react';
import '../index.css';

import Navbar from './Navbar.js';

const NavbarHome = ({ avatarUrl }) => {
  const links = [
    'workshops',
    'coaches',
    // 'simulation',
    'ressources',
    // 'participants',
  ];
  return <Navbar links={links} avatarUrl={avatarUrl} />;
};

export default NavbarHome;
