import Navbar from './Navbar.js';
import React from 'react';

const NavbarWorkshop = ({ avatarUrl }) => {
  const links = ['exit', 'participants', 'data_tab', 'simulation', 'results'];
  return <Navbar links={links} avatarUrl={avatarUrl} />;
};
export default NavbarWorkshop;
