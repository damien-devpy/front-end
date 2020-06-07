import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar as NavigBar, Nav, Image, Container } from 'react-bootstrap';
import { COLORS } from '../vars';
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExitIcon from '../assets/ExitIcon';
import '../index.css';
// import styled from 'styled-components';

const Navbar = ({ avatarUrl, links }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const logo = process.env.PUBLIC_URL + 'monogramme_1.png';
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
        <NavigBar.Brand href="/workshops">
          <span className="font-weight-bold">
            <img src={logo} height={100} />
          </span>
        </NavigBar.Brand>
        <NavigBar.Toggle aria-controls="basic-navbar-nav" />
        <NavigBar.Collapse id="basic-navbar-nav">
          <Nav>
            {links.map((link) =>
              link === 'exit' ? (
                <Nav.Link
                  href={'/workshops'}
                  style={{
                    margin: 5,
                  }}
                >
                  <ExitIcon height={25} width={25} />
                </Nav.Link>
              ) : (
                <Nav.Link
                  href={'/' + link}
                  className={isActive('/' + link)}
                  style={{
                    margin: 5,
                    fontSize: 18,
                    backgroundColor: isActive('/' + link)
                      ? COLORS.PRIMARY
                      : null,
                    color: isActive('/' + link) ? 'white' : '#616162',
                  }}
                >
                  <small className="font-weight-bold">
                    {t('common.' + link)}
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
