import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiMail, FiInstagram, FiTwitch, FiTwitter, FiPhone } from 'react-icons/fi';
import '../footer.css'; 
import logo from '../components/images/feedHope2.png';

const Footer = () => {
  return (
    <footer className="footer bg-light text-dark py-5">
      <Container>
        <Row>
        <Col md={4} className="mb-4 mb-md-0">
          <p>
          <img src={logo} alt="Logo" className="logo-img mr-2" />
          </p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Contact Us</h5>
            <p>
              <FiMail className="icon" /> info@feedhope.association.org
            </p>
            <p>
              <FiInstagram className="icon" /> feedhope
            </p>
            <p>
              <FiTwitter className="icon"/> feedhope
            </p>
            <p>
              <FiTwitch className="icon"/> feedhope
            </p>
            <FiPhone className="icon"/> +216 23 123 987
          </Col>

          <Col md={4}>
          <h5>Our Location</h5>
            <p>
              04, MontPlaisir, route Khaiereddine Pacha
              <br />
              Tunisia
            </p>
          
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.111202266459!2d10.179065614873628!3d36.832937579941474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f472d1ef3eb5ed%3A0xe4ef4eaf2894d8c7!2sMonplaisir%2C%20Tunis!5e0!3m2!1sen!2stn!4v1665769972752!5m2!1sen!2stn"
              width="100%"
              height="200"
              allowFullScreen
              loading="lazy"
              className="map"
            ></iframe>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>© 2023 All rights reserved.</p>
          </Col>
        </Row>
      </Container>

    </footer>
  );
};

export default Footer;
