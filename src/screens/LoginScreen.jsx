import { Loader } from '@chatscope/chat-ui-kit-react';
import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { AuthContext } from '../navigation/AuthProvider';

export const LoginScreen = () => {
  const [nickname, setNickname] = useState('');

  const { login, loading } = useContext(AuthContext);

  return (
    <Container className="d-flex h-100 flex-column align-items-center justify-content-center">
      <Card className="login">
        <Card.Body>
          <Form>
            <h1 className="mb-3">Enter a nickname</h1>
            <Form.Group>
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                name="nickname"
                type="text"
                placeholder="nickname"
                onChange={(event) => setNickname(event.target.value)}
                autoComplete="username"
              />
            </Form.Group>

            <Button
              size="sm"
              className="w-100"
              onClick={() => login(nickname)}
              disabled={nickname.length === 0}
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
    </Container>
  );
};

LoginScreen.displayName = 'Login';

export default LoginScreen;
