import React from 'react';
import { Container, Image, Nav, Navbar as NavigBar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Avatar from './Avatar';
import { COLORS } from '../vars';
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import '../index.css';
import ExitIcon from '../assets/ExitIcon';

const Navbar = ({ links }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user: { firstName, lastName } = {} } = useSelector(
    (state) => state.currentUser
  );

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
          <Avatar className="ml-auto" name={`${firstName} ${lastName}`} />
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
