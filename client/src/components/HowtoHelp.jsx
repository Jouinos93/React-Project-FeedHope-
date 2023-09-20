import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../HowtoHelp.css'; // Import your custom CSS file for styling if needed

const HowtoHelp = () => {
  return (
   
    <Container className="how-to-help mt-5">
         <h2>How to Help ?</h2> <br />
      <Row>
        <Col md={6}>
          <Card className="donate-food-card">
            <Card.Body>
              <Card.Title>Donate Food</Card.Title>
              <Card.Text>
             <p>Each year, we save nearly 2 tons of food from restaurants,hotels and various other sources. If you share our commitment to reducing food waste and helping those less fortunate, consider joining our cause by making a valuable donation.</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="be-volunteer-card">
            <Card.Body>
              <Card.Title>Volunteer</Card.Title>
              <Card.Text>
               <p>Join us in combating hunger in our community! We are offering various in-person volunteer opportunities suitable for individuals, families, and groups. Come be a part of the effort to fight hunger and make a positive impact in the lives of those in need.</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HowtoHelp;
