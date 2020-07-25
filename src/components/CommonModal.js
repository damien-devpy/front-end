import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import PrimaryButton from './PrimaryButton';

const CommonModal = ({
  t,
  title,
  show,
  handleClose,
  handleAcknowledge,
  children,
}) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton={handleClose !== undefined} className="alert-primary">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {handleAcknowledge && (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('common.close')}
          </Button>
          <PrimaryButton onClick={handleAcknowledge}>
            {t('common.confirm')}
          </PrimaryButton>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CommonModal;
