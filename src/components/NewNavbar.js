import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navbar, Nav, Image, Container } from "react-bootstrap";
import { COLORS } from "../vars";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExitIcon from "../assets/ExitIcon";
import "../index.css";

const NewNavbar = ({ avatarUrl, links }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = path =>
    location.pathname === path ? `badge rounded-lg navbar-link` : null;

  return (
    <Navbar
      style={{ backgroundColor: `${COLORS.BROWN.LIGHT}` }}
      variant="light"
      expand="lg"
      className="mb-4"
    >
      <Container>
        <Navbar.Brand href="/home">
          <span className="font-weight-bold">2tons</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {links.map(link =>
              link === "exit" ? (
                <Nav.Link href={"/workshops"}>
                  <ExitIcon height={30} width={30} />
                </Nav.Link>
              ) : (
                <Nav.Link
                  href={"/" + link}
                  className={isActive("/" + link)}
                  style={{
                    backgroundColor: isActive("/" + link)
                      ? COLORS.PRIMARY
                      : null
                  }}
                >
                  <small className="font-weight-bold">
                    {t("common." + link)}
                  </small>
                </Nav.Link>
              )
            )}
          </Nav>
          <Image className="ml-auto rounded-lg border" src={avatarUrl} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NewNavbar;
