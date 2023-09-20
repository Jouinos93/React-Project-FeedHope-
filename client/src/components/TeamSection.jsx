import React from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import teamMember1 from '../components/images/mariem.jpg'; // Replace with actual image paths
import teamMember2 from '../components/images/mohamed.jpg';
import teamMember3 from '../components/images/aymen.jpg';
import '../TeamSection.css'; // Import the CSS file

const TeamSection = () => {
  const teamMembers = [
    { id: 1, name: 'Mariem Jouini', photo: teamMember1, description: 'The lawyer of the association.' },
    { id: 2, name: 'Mohamed ElKahla', photo: teamMember2, description: 'The owner of the foodcar company.' },
    { id: 3, name: 'Aymen Ben Moussa', photo: teamMember3, description: 'The manager of the association.' },
  ];

  const smallerImageStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8}>
          <Card className="team-section-card p-4">
            <Row>
              <Col md={6}>
                <Carousel interval={3000} pause="hover" indicators={false}>
                  {teamMembers.map((member) => (
                    <Carousel.Item key={member.id}>
                      <Card.Img variant="top" src={member.photo} alt={member.name} style={smallerImageStyle} />
                      <Card.Body>
                        <Card.Title>{member.name}</Card.Title>
                        <Card.Text>{member.description}</Card.Text>
                      </Card.Body>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
              <Col md={6} className="d-flex flex-column justify-content-center align-items-center">
                <div className="orange-title">
                  <h3>Our Team</h3>
                </div>
                <p className="text-center mt-3">
                  Thanks to our dedicated team members for their hard work and commitment. Together, we are making a
                  difference and helping those in need.
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TeamSection;


