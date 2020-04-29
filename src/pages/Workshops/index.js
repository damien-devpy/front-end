import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";

import { useDispatch } from "react-redux";
import WorkshopTable from "./components/WorkshopTable";
import WorkshopModal from "./components/WorkshopModal";
import { useTranslation } from "react-i18next";
import { Button, Spinner } from "react-bootstrap";

const Workshops = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <StyledHeader>
        <h3>{t("common.workshops")}</h3>
        <Button variant="secondary" onClick={handleShow}>
          {t("common.newWorkshop")}
        </Button>
      </StyledHeader>

      <WorkshopTable t={t} workshops={fetchedWorkshops} />
      <WorkshopModal t={t} show={show} handleClose={handleClose} />
    </div>
  );
};

export default Workshops;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const fetchedWorkshops = [
  {
    date: moment().subtract(3, "days"),
    name: "DataForGood",
    status: "En cours",
    coachName: "François"
  },
  {
    date: moment().subtract(12, "days"),
    name: "L’Elysée",
    status: "En préparation",
    coachName: "Noé"
  },
  {
    date: moment().subtract(1, "month"),
    name: "LLL",
    status: "Mail de fin à envoyer",
    coachName: "Léa"
  },
  {
    date: moment().subtract(2, "months"),
    name: "Devant les enfants",
    status: "Clôturé",
    coachName: "François"
  }
];
