import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CommonModal from '../../components/CommonModal';
import PrimaryButton from '../../components/PrimaryButton';

const ChangePassword = ({ handleChangePassword }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleClose = () => {
    history.goBack();
  };
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedNewPassword, setConfirmedNewPassword] = useState('');
  function validateForm() {
    return (
      newPassword !== '' &&
      confirmedNewPassword !== '' &&
      newPassword === confirmedNewPassword
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleChangePassword(newPassword);
    history.goBack();
  };

  return (
    <CommonModal
      title={t('common.changePassword')}
      handleClose={handleClose}
      show
    >
      <Container className="container-md mx-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="oldPassword" md={6}>
            <Form.Label style={{ fontSize: 18 }}>
              {t('common.oldPassword')}
            </Form.Label>
            <Form.Control
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              size="lg"
            />
          </Form.Group>
          <Form.Group controlId="newPassword" md={6}>
            <Form.Label style={{ fontSize: 18 }}>
              {t('common.newPassword')}
            </Form.Label>
            <Form.Control
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              size="lg"
            />
          </Form.Group>
          <Form.Group controlId="confirmedNewPassword" md={6}>
            <Form.Label style={{ fontSize: 18 }}>
              {t('common.confirmedNewPassword')}
            </Form.Label>
            <Form.Control
              value={confirmedNewPassword}
              onChange={(e) => setConfirmedNewPassword(e.target.value)}
              type="password"
              size="lg"
            />
          </Form.Group>
          <Container className="center">
            <PrimaryButton
              className="center"
              disabled={!validateForm()}
              type="submit"
              size="lg"
            >
              {t('common.changePasswordConfirmation')}
            </PrimaryButton>
          </Container>
        </Form>
      </Container>
    </CommonModal>
  );
};

export default ChangePassword;
