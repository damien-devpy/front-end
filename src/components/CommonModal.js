import React from 'react';
import { Button, Modal } from 'react-bootstrap';

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
      <Modal.Header closeButton={handleClose !== undefined}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {handleAcknowledge && (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('common.close')}
          </Button>
          <Button variant="primary" onClick={handleAcknowledge}>
            {t('common.confirm')}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CommonModal;
