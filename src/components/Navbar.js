import React from 'react';
import styled from 'styled-components';
import {
  Alert,
  Container,
  Nav,
  NavDropdown,
  Navbar as NavigBar,
} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Avatar from './Avatar';
import CloudDone from '../assets/CloudDone';
import CloudUpload from '../assets/CloudUpload';
import ExitIcon from '../assets/ExitIcon';
import { COLORS } from '../vars';
import { logout } from '../utils/auth';
import { logoutCurrentUser } from '../actions/user';
import { resetError } from '../actions/errors';

const Navbar = ({ links = [], type = 'home' }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { msg } = useSelector((state) => state.error);
  const { isSynchronized } = useSelector((state) => state.workshop);
  const { user: { firstName = '', lastName = '' } = {} } = useSelector(
    (state) => state.currentUser
  );
  const avatarName =
    firstName || lastName ? `${firstName} ${lastName}` : undefined;
  const dispatch = useDispatch();
  const isActive = (path) =>
    location.pathname.endsWith(path) ? `badge rounded-lg navbar-link` : null;

  const handleLogout = () => {
    logout();
    dispatch(logoutCurrentUser());
  };
  return (
    <>
      <NavigBar
        style={{ backgroundColor: `${COLORS.BROWN.LIGHT}` }}
        variant="light"
        expand
        className="mb-4"
      >
        <Container>
          <NavigBar.Brand as={Link} to="/workshops">
            <span className="font-weight-bold">
              <img src="/monogramme_1.png" height={100} alt="logo" />
            </span>
          </NavigBar.Brand>
          <NavigBar.Toggle aria-controls="basic-navbar-nav" />
          <NavigBar.Collapse id="basic-navbar-nav">
            <Nav>
              {links.map(({ id, link }) =>
                id === 'exit' ? (
                  <Nav.Link
                    as={Link}
                    to="/workshops"
                    style={{
                      margin: 5,
                    }}
                  >
                    <ExitIcon height={25} width={25} />
                  </Nav.Link>
                ) : (
                  <Nav.Link
                    key={id}
                    as={Link}
                    to={link}
                    className={isActive(id)}
                    style={{
                      margin: 5,
                      fontSize: 18,
                      backgroundColor: isActive(id) ? COLORS.PRIMARY : null,
                      color: isActive(id) ? 'white' : '#616162',
                    }}
                  >
                    <small className="font-weight-bold">
                      {t(`common.${id}`)}
                    </small>
                  </Nav.Link>
                )
              )}
            </Nav>
            <div className="d-flex ml-auto align-items-center">
              {type === 'workshop' &&
                (isSynchronized ? (
                  <CloudDone width="40" height="40" />
                ) : (
                  <CloudUpload width="40" height="40" />
                ))}
              <StyledNavDropDown
                className="ml-auto"
                title={
                  <div style={{ display: 'inline-block' }}>
                    <Avatar name={avatarName} />
                  </div>
                }
                id="basic-nav-dropdown"
              >
                {/* <NavDropdown.Header>{t('common.admins')}</NavDropdown.Header> 
                <NavDropdown.Item href="/coaches">
                  {t('common.coaches')}
                </NavDropdown.Item>
                <NavDropdown.Divider /> */}
                <NavDropdown.Item eventKey={3.2} onClick={handleLogout}>
                  {t('common.logout')}
                </NavDropdown.Item>
              </StyledNavDropDown>
            </div>
          </NavigBar.Collapse>
        </Container>
      </NavigBar>
      {msg && (
        <Container>
          <Alert
            variant="danger"
            onClose={() => dispatch(resetError())}
            dismissible
          >
            <p style={{ margin: '0px' }}>{msg}</p>
          </Alert>
        </Container>
      )}
    </>
  );
};
const StyledNavDropDown = styled(NavDropdown)`
  .dropdown-toggle::after {
    content: none;
  }
`;

export default Navbar;
