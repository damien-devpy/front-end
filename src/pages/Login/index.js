import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

import { login } from '../../utils/api';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = props;
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const result = await login({ email, password });
      handleLogin(result);
    } catch (e) {}
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" bsSize="large">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" bsSize="large">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </Form.Group>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
