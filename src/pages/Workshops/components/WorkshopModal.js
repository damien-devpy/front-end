import React from "react";
import { Modal } from "react-bootstrap";
import WorkshopModalForm from "./WorkshopModalForm";

const WorkshopModal = ({ t, show, handleClose, handleSubmit }) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("common.newCoach")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <WorkshopModalForm t={t} handleSubmit={handleSubmit} />
      </Modal.Body>
    </Modal>
  );
};

export default WorkshopModal;
