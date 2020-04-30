import React, { useState } from "react";
import styled from "styled-components";

import CoachTable from "./components/CoachTable";
import CoachModal from "./components/CoachModal";

import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Spinner } from "react-bootstrap";
import { useCoaches } from "../../hooks/coaches";
import { addCoach } from "../../actions/coaches";

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
    <div>
      <StyledHeader>
        <h3>{t("common.coaches")}</h3>
        {!isLoading && (
          <Button variant="secondary" onClick={handleShow}>
            {t("common.addACoach")}
          </Button>
        )}
      </StyledHeader>

      {loadError && <p>{t("common.loadError")}</p>}
      {isLoading && <Spinner animation="border"></Spinner>}

      {coaches && <CoachTable t={t} coaches={coaches} />}
      <CoachModal
        t={t}
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
export default Coaches;
