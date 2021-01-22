import React from 'react';
import Card from 'react-bootstrap/Card';

export const HomeScreen = () => (
  <Card className="home">
    <Card.Body>
      <p>Hello</p>
    </Card.Body>
  </Card>
);

HomeScreen.displayName = 'Home';

export default HomeScreen;
