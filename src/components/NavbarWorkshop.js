import NewNavbar from "./NewNavbar.js";
import React from "react";
const NavbarWorkshop = ({ avatarUrl }) => {
  const links = ["participants", "data_tab", "simulation", "results"];
  return <NewNavbar links={links} avatarUrl={avatarUrl} />;
};
export default NavbarWorkshop;
