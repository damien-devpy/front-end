import React from 'react';

import Navbar from './Navbar';

const NavbarWorkshop = ({ match: { params: { workshopId } = {} } = {} }) => {
  const links = [
    { id: 'exit', link: '/exit' },
    { id: 'participants', link: `/workshop/${workshopId}/participants` },
    { id: 'data', link: `/workshop/${workshopId}/data` },
    { id: 'simulation', link: `/workshop/${workshopId}/simulation` },
    { id: 'results', link: `/workshop/${workshopId}/results` },
    { id: 'model', link: `/workshop/${workshopId}/model` },
  ];
  return <Navbar links={links} type="workshop" />;
};
export default NavbarWorkshop;
