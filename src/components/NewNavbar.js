import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navbar, Nav, Image } from "react-bootstrap";
import { COLORS } from "../vars";

const NewNavbar = ({ avatarUrl }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = path =>
    location.pathname === path ? `${COLORS.BROWN.DARK}` : null;

  return (
    <Navbar bg="light" expand="lg" bg="light" className="mb-4">
      <Navbar.Brand href="#home">
        <a href="/home" className="badge badge-light">
          {t("common.caplc")}
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link
            href="/coaches"
            style={{
              color: isActive("/coaches")
            }}
          >
            {t("common.coaches")}
          </Nav.Link>
          <Nav.Link
            href="/workshops"
            style={{
              color: isActive("/workshops")
            }}
          >
            {t("common.workshops")}
          </Nav.Link>
          <Nav.Link
            disabled
            href="/model"
            style={{
              color: isActive("/model")
            }}
          >
            {t("common.model")}
          </Nav.Link>
        </Nav>
        <Image src={avatarUrl} roundedCircle />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NewNavbar;
