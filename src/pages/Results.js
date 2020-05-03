import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import NavbarHome from "../components/NavbarHome";

const Results = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <NavbarHome
        avatarUrl="https://img.icons8.com/doodle/48/000000/user.png"
        firstName="Xavier"
        role="Animateur"
      ></NavbarHome>
      <StyledResults>{t("common.results")}</StyledResults>
    </React.Fragment>
  );
};
const StyledResults = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin: 10px 0;
`;

export default Results;
