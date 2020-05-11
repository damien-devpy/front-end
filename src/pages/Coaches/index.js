import React, { useState } from "react";
import styled from "styled-components";

import CoachTable from "./components/CoachTable";
import CoachModal from "./components/CoachModal";
import { COLORS } from "../../vars";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Spinner, Container, Card } from "react-bootstrap";
import { useCoaches } from "../../hooks/coaches";
import { addCoach } from "../../actions/coaches";
import NavbarHome from "../../components/NavbarHome";

const Coaches = () => {
  const { t } = useTranslation();
  const { coaches, isLoading, loadError } = useCoaches();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = values => {
    dispatch(addCoach(values));
    setShow(false);
  };
  return (
    <>
      <NavbarHome
        avatarUrl="https://img.icons8.com/doodle/48/000000/user.png"
        firstName="Xavier"
        role="Animateur"
      />
      <Container>
        <Card
          className="p-5 border-light shadow-sm"
          style={{ borderRadius: 10 }}
        >
          <StyledHeader>
            <h2>{t("common.coaches")}</h2>
            {!isLoading && (
              <StyledButton onClick={handleShow}>
                {t("common.addACoach")}
              </StyledButton>
            )}
          </StyledHeader>
          <hr style={{ margin: 0 }} />

          {loadError && <p>{t("common.loadError")}</p>}
          {isLoading && (
            <Spinner animation="border" className="pt-3 mx-auto mt-5" />
          )}

          {coaches && <CoachTable t={t} coaches={coaches} />}
          <CoachModal
            t={t}
            show={show}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
          />
        </Card>
      </Container>
    </>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  background-color: ${COLORS.BROWN.STANDARD};
  border-color: ${COLORS.BROWN.STANDARD};
`;
export default Coaches;
