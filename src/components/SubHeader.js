import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

const SubHeader = ({ t, isActive }) => {
  return (
    <Container>
      <Navbar bg='light' expand='lg' className='rounded-lg my-3 p-1'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link
              href='/coaches'
              style={{
                color: isActive('/coaches'),
              }}
            >
              {t('common.coaches')}
            </Nav.Link>
            <Nav.Link
              href='/workshops'
              style={{
                color: isActive('/workshops'),
              }}
            >
              {t('common.workshops')}
            </Nav.Link>
            <Nav.Link
              href='/simulation'
              style={{
                color: isActive('/simulation'),
              }}
            >
              {t('common.simulation')}
            </Nav.Link>
            <Nav.Link
              disabled
              href='/model'
              style={{
                color: isActive('/model'),
              }}
            >
              {t('common.model')}
            </Nav.Link>
            <Nav.Link
              href="/workshop"
              style={{
                color: isActive("/workshop")
              }}
            >
              {t("common.workshop")}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default SubHeader;
 