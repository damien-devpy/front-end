import React from "react";
import "../index.css";

import NewNavbar from "./NewNavbar.js";

const NavbarHome = ({ avatarUrl }) => {
  const links = ["coaches", "workshops", "simulation", "ressources"];
  return <NewNavbar links={links} avatarUrl={avatarUrl} />;
};

export default NavbarHome;
