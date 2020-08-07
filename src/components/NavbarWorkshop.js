import React from 'react';
import { useSelector } from 'react-redux';

import Navbar from './Navbar';
import { selectUser } from '../selectors/currentUser';

const NavbarWorkshop = ({ match: { params: { workshopId } = {} } = {} }) => {
  const { role: currentUserRole } = useSelector((state) =>
    selectUser(state.currentUser)
  );

  const links = [
    { id: 'exit', link: '/exit' },
    { id: 'participants', link: `/workshop/${workshopId}/participants` },
    { id: 'data', link: `/workshop/${workshopId}/data` },
    { id: 'simulation', link: `/workshop/${workshopId}/simulation` },
    { id: 'results', link: `/workshop/${workshopId}/results` },
  ];
  const debugLinks =
    currentUserRole === 'admin'
      ? [
          {
            id: 'workshopEditor',
            link: `/workshop/${workshopId}/workshopEditor`,
          },
        ]
      : [];
  return <Navbar links={links} debugLinks={debugLinks} type="workshop" />;
};
export default NavbarWorkshop;
