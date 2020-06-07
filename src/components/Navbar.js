import React from 'react';
import { Container, Image, Nav, Navbar as NavigBar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { COLORS } from '../vars';
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import '../index.css';
import ExitIcon from '../assets/ExitIcon';
// import styled from 'styled-components';

const Navbar = ({ avatarUrl, links }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? `badge rounded-lg navbar-link` : null;

  return (
    <NavigBar
      style={{ backgroundColor: `${COLORS.BROWN.LIGHT}` }}
      variant="light"
      expand="lg"
      className="mb-4"
    >
      <Container>
        <Link to="/workshops">
          <NavigBar.Brand>
            <span className="font-weight-bold">2tons</span>
          </NavigBar.Brand>
        </Link>
        <NavigBar.Toggle aria-controls="basic-navbar-nav" />
        <NavigBar.Collapse id="basic-navbar-nav">
          <Nav>
            {links.map((link) =>
              link === 'exit' ? (
                <Link to="/workshops">
                  <ExitIcon height={20} width={20} />
                </Link>
              ) : (
                <Nav.Link
                  to={`/${link}`}
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
          <Image className="ml-auto rounded-lg border" src={avatarUrl} />
        </NavigBar.Collapse>
      </Container>
    </NavigBar>
  );
};
// const StyledLink = styled(Nav.Link)`
//   &:hover {
//     background-color: ${COLORS.BROWN.STANDARD};
//     color: white;
//   }
// `;
export default Navbar;
