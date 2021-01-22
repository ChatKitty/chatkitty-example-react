import { Loader } from '@chatscope/chat-ui-kit-react';
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { AuthContext } from '../navigation/AuthProvider';

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading } = useContext(AuthContext);

  return (
    <Card className="login">
      <Card.Body>
        <Form>
          <h1 className="mb-3">Login to your account</h1>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="username"
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </Form.Group>
          <Button
            size="sm"
            className="w-100"
            onClick={() => login(username, password)}
            disabled={username.length === 0 || password.length === 0}
          >
            Login
          </Button>
        </Form>
      </Card.Body>
      {loading === true && (
        <>
          <div
            className="w-100 h-100 position-absolute d-flex align-items-center justify-content-center bg-light"
            style={{ zIndex: '10', opacity: '0.4' }}
          />
          <div
            className="w-100 h-100 position-absolute d-flex align-items-center justify-content-center"
            style={{ zIndex: '11' }}
          >
            <Loader />
          </div>
        </>
      )}
    </Card>
  );
};

LoginScreen.displayName = 'Login';

export default LoginScreen;
