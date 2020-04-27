import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Container, NavDropdown, Navbar, Nav } from "react-bootstrap";

import Avatar from "./Avatar";
// import Button from './Button';
import { COLORS } from "../vars";

const Header = ({ name, date, avatarUrl, avatarName, firstName, role }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = path =>
    location.pathname === path ? `${COLORS.BROWN.DARK}` : null;

  return (
    <StyledHeader>
      <StyledTop>
        <StyledTitle>
          <p>{t("common.caplc")}</p>
        </StyledTitle>
        <StyledWorkshop>
          <p>{name}</p>
          <p>{date}</p>
        </StyledWorkshop>
        <StyledRightMenu>
          <StyledNavDropDown
            title={
              <div style={{ display: "inline-block" }}>
                <Avatar src={avatarUrl} name={avatarName}></Avatar>
              </div>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Header>{t("common.admins")}</NavDropdown.Header>
            <NavDropdown.Item href="/coaches">
              {t("common.coaches")}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey={3.2}>Another action</NavDropdown.Item>
          </StyledNavDropDown>
          <StyledWelcome>
            <p>
              {t("common.welcome")} {firstName}
            </p>
            <p>{role}</p>
          </StyledWelcome>
        </StyledRightMenu>
      </StyledTop>
      <Container>
        <Navbar bg="light" expand="lg" className="rounded-lg my-3 p-1">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link
                href="/home"
                style={{
                  color: isActive("/home")
                }}
              >
                {t("common.home")}
              </Nav.Link>
              <Nav.Link
                href="/coaches"
                style={{
                  color: isActive("/coaches")
                }}
              >
                {t("common.coachesManagement")}
              </Nav.Link>
              <Nav.Link
                href="/workshops"
                style={{
                  color: isActive("/workshops")
                }}
              >
                {t("common.workshopsManagment")}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </StyledHeader>
  );
};

const StyledNavDropDown = styled(NavDropdown)`
  .dropdown-toggle::after {
    content: none;
  }
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div, Nav {
    margin: 0.5rem 2rem;
  ${"" /* background: ${COLORS.BROWN.STANDARD}; */}
`;

const StyledWorkshop = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  width: 50%;
  text-align: center;
  & > p {
    margin: 0;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  width: 25%;
  & > p {
    margin: 0;
  }
`;

const StyledWelcome = styled.div`
  text-align: center;
  & > p {
    margin: 0;
  }
`;

const StyledRightMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 25%;
  margin: 0;
  button {
    margin-right: 0.5rem;
  }
`;

export default Header;
