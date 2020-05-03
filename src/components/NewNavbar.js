import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navbar, Nav, Image } from "react-bootstrap";
import { COLORS } from "../vars";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExitIcon from "../assets/ExitIcon";
import "../index.css";

const NewNavbar = ({ avatarUrl, links }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? `${COLORS.BROWN.DARK}` : null;

  return (
    <Navbar variant="light" expand="lg" className="mb-4 navbar">
      <Navbar.Brand href="/home" className="badge badge-light p-2">
        {t("common.caplc")}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="">
<<<<<<< HEAD
          <Nav.Link
            href="/coaches"
            style={{
              color: isActive("/coaches"),
            }}
          >
            {t("common.coaches")}
          </Nav.Link>
          <Nav.Link
            href="/workshops"
            style={{
              color: isActive("/workshops"),
            }}
          >
            {t("common.workshops")}
          </Nav.Link>
          <Nav.Link
            href="/simulation"
            style={{
              color: isActive("/simulation"),
            }}
          >
            {t("common.simulation")}
          </Nav.Link>
          <Nav.Link
            style={{
              color: isActive("/manage_participants")
            }}
            href='/manage_participants'>
            {t('common.manageParticipants')}
          </Nav.Link>
          <Nav.Link
            disabled
            href="/model"
            style={{
              color: isActive("/model"),
            }}
          >
            {t("common.model")}
          </Nav.Link>
=======
          {links.map((link) => {
            if (link === "exit") {
              console.log("Exit");
              return (
                <Nav.Link
                  href={"/workshops"}
                  style={{
                    color: isActive("/workshops"),
                  }}
                >
                  <ExitIcon height={30} width={30} />
                </Nav.Link>
              );
            } else {
              return (
                <Nav.Link
                  href={"/" + link}
                  style={{
                    color: isActive("/" + link),
                  }}
                >
                  {t("common." + link)}
                </Nav.Link>
              );
            }
          })}
>>>>>>> 040c3c14dea9c33127b5b1ec5cc57cf8bb4d95b0
        </Nav>
        <Image className="ml-auto" src={avatarUrl} roundedCircle />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NewNavbar;
