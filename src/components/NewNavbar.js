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
        </Nav>
        <Image className="ml-auto" src={avatarUrl} roundedCircle />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NewNavbar;
