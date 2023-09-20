import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import '../MainSection.css';
import { Link } from 'react-router-dom';


const MainSection = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
        <h1>Let's reduce food waste and ensure that everyone has an opportunity to nourish themselves</h1>
          <p>Addressing food waste is crucial as it can have a profound impact on those who lack access to nutritious meals!</p>
      
          <Card className="mt-4">
            <div className="video-background">
              <iframe
                title="Charity Video"
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/ishA6kry8nc?autoplay=1"
                allowFullScreen
              ></iframe>
            </div>
            <Card.Body>
              {/* Add other content that you want to display over the video background */}
              <Link to="/donate-money">
              <Button variant="danger" className="ml-2">
                <FaHeart className="mr-2" /> Donate Now
              </Button>
            </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MainSection;
