// FoodPartnersSection.jsx

import React from 'react';
import { Container, Row, Col, Carousel, Card } from 'react-bootstrap';
import charity1Logo from "./images/charity1.png";
import charity2Logo from "./images/charity2.jpg";
import charity5Logo from "./images/charity5.png";
import charity7Logo from "./images/charity7.jpg";
import charity8Logo from "./images/charity8.jpg";
import '../food-partner.css';

const FoodPartnersSection = () => {
  const foodPartners = [
    { id: 1, name: 'Food Bank', logo: charity1Logo },
    { id: 2, name: 'VECTOR EMBLEM', logo: charity2Logo },
    { id: 5, name: 'Food For Thought', logo: charity5Logo },
    { id: 7, name: 'Royal Hotel', logo: charity7Logo },
    { id: 8, name: 'KFC', logo: charity8Logo },
  ];

  return (
    <Container className="mt-5">
      <Row className="mt-5">
        <Col>
          <h3 className="text-center mb-4">Our Partners</h3> 
          <Card className="food-partners-card">
            <Card.Body>
              <h6>
                Thanks to the generous support of our valued partners, the FeedHope network is making a significant
                difference in the lives of families nationwide. By addressing their needs, we are actively contributing
                to the creation of a brighter and more promising future for these families.
              </h6>
              <Carousel interval={3000} pause="hover">
                {foodPartners.map((partner) => (
                  <Carousel.Item key={partner.id}>
                    <div className="food-partner">
                      <img src={partner.logo} alt={`${partner.name} Logo`} className="food-partner-logo" />
                      <h4>{partner.name}</h4>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FoodPartnersSection;
