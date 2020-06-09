import React from 'react';
import { Modal } from 'react-bootstrap';
import WorkshopModalForm from './WorkshopModalForm';

const WorkshopModal = ({ t, coaches, show, handleClose, handleSubmit }) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('common.newWorkshop')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <WorkshopModalForm
          t={t}
          coaches={coaches}
          handleSubmit={handleSubmit}
        />
      </Modal.Body>
    </Modal>
  );
};

export default WorkshopModal;
