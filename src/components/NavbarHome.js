import React from 'react';

import '../index.css';

import Navbar from './Navbar';

const NavbarHome = () => {
  const links = [
    'workshops',
    'coaches',
    // 'simulation',
    'ressources',
    // 'participants',
  ];
  return <Navbar links={links} />;
};

export default NavbarHome;
