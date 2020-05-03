import React, { useState } from "react";
import styled from "styled-components";
import { useWorkshops } from "../../hooks/workshops";
import { addWorkshop, deleteWorkshop } from "../../actions/workshops";
import { useDispatch } from "react-redux";
import WorkshopTable from "./components/WorkshopTable";
import WorkshopModal from "./components/WorkshopModal";
import { useTranslation } from "react-i18next";
import { Button, Spinner } from "react-bootstrap";
import NavbarHome from "../../components/NavbarHome";
const Workshops = () => {
  const { t } = useTranslation();
  const { workshops, isLoading, loadError } = useWorkshops();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (values) => {
    dispatch(addWorkshop(values));
    setShow(false);
  };
  const handleDelete = (workshopKey) => {
    dispatch(deleteWorkshop(workshopKey));
  };

  console.log("workshopssssss", workshops);
  return (
    <React.Fragment>
      <NavbarHome></NavbarHome>
      <div className="container">
        <div>
          <StyledHeader>
            <h3>{t("common.workshops")}</h3>
            {!isLoading && (
              <Button variant="secondary" onClick={handleShow}>
                {t("common.addAWorkshop")}
              </Button>
            )}
          </StyledHeader>

          {loadError && <p>{t("common.loadError")}</p>}
          {isLoading && <Spinner animation="border"></Spinner>}

          {workshops && (
            <WorkshopTable
              t={t}
              workshops={workshops}
              handleDelete={handleDelete}
            />
          )}

          <WorkshopModal
            t={t}
            show={show}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Workshops;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
