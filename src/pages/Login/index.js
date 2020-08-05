import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import CommonModal from '../../components/CommonModal';
import PrimaryButton from '../../components/PrimaryButton';
import { login } from '../../utils/api';

const Login = ({ handleLogin }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await login({ email, password });
      handleLogin(result);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  return (
    <CommonModal title={t('common.login')} show>
      <Container className="container-md mx-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label style={{ fontSize: 18 }}>
              {t('common.email_address')}
            </Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
            />
          </Form.Group>
          <Form.Group controlId="password" md={6}>
            <Form.Label style={{ fontSize: 18 }}>
              {t('common.password')}
            </Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {t('common.login')}
            </PrimaryButton>
          </Container>
        </Form>
      </Container>
    </CommonModal>
  );
};

export default Login;
