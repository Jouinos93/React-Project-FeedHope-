import React from 'react';
import { Container, Row, Col, Card, Carousel } from 'react-bootstrap';
import Navbar from "../Navbar";
import Footer from "../Footer";
import image1 from "../images/fooddon.jpg"; // Update the import paths for local images
import image2 from "../images/fooddon.jpg";
import image3 from "../images/hoteldon.jpg";
import image4 from "../images/hoteldon2.jpg";

// const fakeSponsors = [
//   { id: 1, name: 'Sponsor 1', logo: 'sponsor1.png' },
//   { id: 2, name: 'Sponsor 2', logo: 'sponsor2.png' },
//   { id: 3, name: 'Sponsor 3', logo: 'sponsor3.png' },
// ];

const customCardStyle = {
  backgroundColor: '#e6ccff', // Light peach color
  color: '#333', // Dark text color
  padding: '1.25rem', // Adjust padding as needed
  borderRadius: '1rem', // Rounded corners
};
const cardStyle = {
  backgroundColor: '#cce6ff', // Light peach color
  color: '#333', // Dark text color
  padding: '1.25rem', // Adjust padding as needed
  borderRadius: '1rem', // Rounded corners
};

const AboutUs = () => {
  // Local images for charityActivityImages array
  const charityActivityImages = [image1, image2, image3, image4];

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <Row>
          <Col>
            <Card style={customCardStyle}>
              <Card.Title className="text-center mb-4">
                <h2>Who We Are?</h2>
              </Card.Title>
              <Card.Text>
                Welcome to FeedHope, an innovative organization dedicated to reducing food waste and
                alleviating hunger in our community. At FeedHope, we have partnered with local
                restaurants and hotels to collect surplus food that would otherwise go to waste. Our
                passionate team of volunteers works tirelessly to ensure that this excess food is
                rescued, sorted, and carefully packaged. Through our well-established distribution
                network, we deliver these nutritious meals to shelters, food banks, and disadvantaged
                communities, reaching those who are most in need. By harnessing the power of
                collaboration and compassion, Nourish & Share not only addresses the pressing issue of
                food waste but also fosters a sense of unity, sharing, and hope within our community.
                Together, we can make a positive impact, one meal at a time.
              </Card.Text>
            </Card>
          </Col>
        </Row> <br />
        <br />

        <Row>
          <Col md={6}>
            <Card style={cardStyle }>
              <Card.Body>
                <h2 className="text-center">Our Activities</h2>
                <p>
                  Food bank staff and volunteers are on the front lines of helping millions of families make ends meet.
                  They're working around the clock to keep food banks, pantries, and meal programs running.
                  They know that food on the table means so much more than just a meal — it is hope.
                  Thank you to these heroes feeding our neighbors for your dedication, courage, and sacrifice.
                </p>
              </Card.Body>
            </Card> <br />

            <Card style={cardStyle}>
              <Card.Body>
                <h2 className="text-center"> Our Collaborators</h2>
                <p>
                As food bank staff and volunteers continue their tireless efforts to help struggling families put food on the table, we invite you to join the fight against hunger. Your generous donations of surplus food can make a significant impact in diminishing hunger and offering hope to those in need. Together, we can ensure that no one goes to bed hungry and create a brighter, more compassionate future for all. Stand with us as we feed our neighbors and make a lasting difference, one meal at a time.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Carousel interval={2000} pause={false} /* interval set to 2 seconds (2000 ms) and pause set to false */>
              {charityActivityImages.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    src={image}
                    alt={`Activity ${index + 1}`}
                    style={{ width: '100%', height: '600px' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default AboutUs;