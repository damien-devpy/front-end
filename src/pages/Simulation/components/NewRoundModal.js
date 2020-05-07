import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import NewRoundModalForm from './NewRoundModalForm';
const NewRoundModal = ({ show, handleClose, handleSubmit }) => {
  const { t } = useTranslation();
  return (
    <Modal
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('common.nextRound')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewRoundModalForm handleSubmit={handleSubmit} />
      </Modal.Body>
    </Modal>
  );
};

export default NewRoundModal;
