import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export const HomeScreen = () => (
  <Card className="home">
    <Card.Body>
      <p>Home</p>
    </Card.Body>
    <Link to="/chat">Chat</Link>
  </Card>
);

HomeScreen.displayName = 'Home';

export default HomeScreen;
