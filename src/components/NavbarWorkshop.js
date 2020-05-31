import React from 'react';

import Navbar from './Navbar';

const NavbarWorkshop = () => {
  const links = ['exit', 'participants', 'data_tab', 'simulation', 'results'];
  return <Navbar links={links} />;
};
export default NavbarWorkshop;
