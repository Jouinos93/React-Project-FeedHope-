import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import logo from '../components/images/feedHope2.png'; 
import { Link } from 'react-router-dom';

const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" className="logo-img mr-2" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/aboutus">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/doners">
              Donors
            </Nav.Link>
            <Nav.Link as={Link} to="/agencies">
              Volunteers
            </Nav.Link>
            <Link to="/donate-money">
              <Button variant="danger" className="ml-2">
                <FaHeart className="mr-2" /> Donate Now
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style jsx>{`
        .navbar {
          border-bottom: 2px solid #eaeaea;
        }

        .navbar-brand {
          font-size: 1.5rem;
          align-items: center;
          display: flex;
        }

        .logo-img {
          height: 150px; 
        }

        .nav-link {
          font-size: 1.1rem;
          text-transform: uppercase;
          color: #333;
        }

        .nav-link:hover {
          color: indianred; 

        .donor-button {
          background-color: indianred !important; 
          border-color: indianred !important;
          font-size: 1.5rem !important; 
          text-transform: uppercase;
        }

        .donor-button:hover {
          background-color: #8b0000; 
          border-color: #8b0000;
        }

        .donor-button:focus,
        .donor-button.focus {
          box-shadow: 0 0 0 0.2rem rgba(205, 92, 92, 0.5); 
        }

        .donor-button:not(:disabled):not(.disabled):active,
        .donor-button:not(:disabled):not(.disabled).active,
        .show > .donor-button.dropdown-toggle {
          background-color: #8b0000; 
          border-color: #8b0000;
        }
      `}</style>
    </Navbar>
  );
};

export default AppNavbar;