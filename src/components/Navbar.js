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
    location.pathname.endsWith(path) ? `badge rounded-lg navbar-link` : null;

  return (
    <NavigBar
      style={{ backgroundColor: `${COLORS.BROWN.LIGHT}` }}
      variant="light"
      expand="lg"
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
            {links.map((link) =>
              link === 'exit' ? (
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
                  as={Link}
                  to={`/${link}`}
                  className={isActive(`/${link}`)}
                  style={{
                    margin: 5,
                    fontSize: 18,
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
          <Image
            height={80}
            className="ml-auto rounded-lg border"
            src={avatarUrl}
          />
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
