import { Modal } from 'react-bootstrap';
import React from 'react';

import CoachModalForm from './CoachModalForm';

const CoachModal = ({ t, show, handleClose, handleSubmit }) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('common.newCoach')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CoachModalForm t={t} handleSubmit={handleSubmit} />
      </Modal.Body>
    </Modal>
  );
};

export default CoachModal;
