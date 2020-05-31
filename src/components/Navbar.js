import React from 'react';
import styled from 'styled-components';
import {
  Container,
  Nav,
  NavDropdown,
  Navbar as NavigBar,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Avatar from './Avatar';
import { COLORS } from '../vars';
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import '../index.css';
import ExitIcon from '../assets/ExitIcon';
import { logout } from '../utils/auth';
import { logoutCurrentUser } from '../actions/user';

const Navbar = ({ links = [] }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user: { firstName = '', lastName = '' } = {} } = useSelector(
    (state) => state.currentUser
  );
  const avatarName =
    firstName || lastName ? `${firstName} ${lastName}` : undefined;
  const dispatch = useDispatch();

  const isActive = (path) =>
    location.pathname === path ? `badge rounded-lg navbar-link` : null;

  const handleLogout = () => {
    logout();
    dispatch(logoutCurrentUser());
  };

  return (
    <NavigBar
      style={{ backgroundColor: `${COLORS.BROWN.LIGHT}` }}
      variant="light"
      expand="lg"
      className="mb-4"
    >
      <Container>
        <NavigBar.Brand href="/home">
          <span className="font-weight-bold">2tons</span>
        </NavigBar.Brand>
        <NavigBar.Toggle aria-controls="basic-navbar-nav" />
        <NavigBar.Collapse id="basic-navbar-nav">
          <Nav>
            {links.map((link) =>
              link === 'exit' ? (
                <Nav.Link href="/workshops">
                  <ExitIcon height={20} width={20} />
                </Nav.Link>
              ) : (
                <Nav.Link
                  key={link}
                  href={`/${link}`}
                  className={isActive(`/${link}`)}
                  style={{
                    backgroundColor: isActive(`/${link}`)
                      ? COLORS.PRIMARY
                      : null,
                    color: isActive(`/${link}`) ? 'white' : '#616162',
                  }}
                >
                  <small className="font-weight-bold">
                    {t(`common.${link}`)}
                  </small>
                </Nav.Link>
              )
            )}
          </Nav>
          <StyledNavDropDown
            className="ml-auto"
            title={
              <div style={{ display: 'inline-block' }}>
                <Avatar name={avatarName} />
              </div>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Header>{t('common.admins')}</NavDropdown.Header>
            <NavDropdown.Item href="/coaches">
              {t('common.coaches')}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey={3.2} onClick={handleLogout}>
              {t('common.logout')}
            </NavDropdown.Item>
          </StyledNavDropDown>
        </NavigBar.Collapse>
      </Container>
    </NavigBar>
  );
};

const StyledNavDropDown = styled(NavDropdown)`
  .dropdown-toggle::after {
    content: none;
  }
`;
export default Navbar;
