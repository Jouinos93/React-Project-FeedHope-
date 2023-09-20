import React, { useState } from 'react';
import Navbar from '../Navbar';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import Footer from '../Footer';

const DonationForm = () => {
  const [amount, setAmount] = useState('');
  const [monthlyDonation, setMonthlyDonation] = useState(false);
  const [cardType, setCardType] = useState('Visa');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiryDate, setCardExpiryDate] = useState('');
  const [authorizedSignature, setAuthorizedSignature] = useState('');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleMonthlyDonationChange = (event) => {
    setMonthlyDonation(event.target.checked);
  };

  const handleCardTypeChange = (event) => {
    setCardType(event.target.value);
  };

  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleCardExpiryDateChange = (event) => {
    setCardExpiryDate(event.target.value);
  };

  const handleAuthorizedSignatureChange = (event) => {
    setAuthorizedSignature(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Form submitted!');
  };

  return (
<>
<Navbar/>
    <Container>
       
      <div className="donation-form">
        <h3 className="text-center mt-4 mb-4">You are about to become a FeedHope supporter</h3> <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Choose the amount to donate:</Form.Label> <br />
            <Form.Control as="select" value={amount} onChange={handleAmountChange}>
              <option value="">Select amount</option>
              <option value="10">10.000Dt</option>
              <option value="25">250.000Dt</option>
              <option value="50">500.000Dt</option>
              <option value="100">100.0000Dt</option>
            </Form.Control>
          </Form.Group> <br />

          <Form.Group>
          <div className="mb-3">
            <Form.Check
              type="checkbox"
              label="Donate monthly"
              checked={monthlyDonation}
              onChange={handleMonthlyDonationChange}
            />
            </div>
          </Form.Group> <br />

          <Form.Group>
            <Form.Label>Choose the payment method:</Form.Label>
            <Form.Check
              type="radio"
              label="Visa"
              name="cardType"
              value="Visa"
              checked={cardType === 'Visa'}
              onChange={handleCardTypeChange}
            />
            <Form.Check
              type="radio"
              label="MasterCard"
              name="cardType"
              value="MasterCard"
              checked={cardType === 'MasterCard'}
              onChange={handleCardTypeChange}
            />
          </Form.Group> <br />

          <Form.Group>
            <Form.Label>Name on card:</Form.Label>
            <Form.Control type="text" value={cardName} onChange={handleCardNameChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Card number:</Form.Label>
            <Form.Control type="text" value={cardNumber} onChange={handleCardNumberChange} />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Expiration Date:</Form.Label>
                <Form.Control type="date" value={cardExpiryDate} onChange={handleCardExpiryDateChange} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label>Authorized Signature:</Form.Label>
            <Form.Control type="text" value={authorizedSignature} onChange={handleAuthorizedSignatureChange} />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Donate Now <FaHeart className="ml-2" />
          </Button>
        </Form>
      </div>

      <style jsx>{`
        .donation-form {
          padding: 40px;
    
        }

        .donation-form h3 {
          text-align: center;
          margin-bottom: 30px;
          color: black
        }

        .donation-form form {
          margin-bottom: 10;
        }
        .donation-form .mb-3 {
            margin-bottom: 15px; 
          }

        .donation-form .form-group {
          margin-bottom: 20px;
        }

        .donation-form .form-check-input {
          margin-right: 10px;
        }

        .donation-form .btn-primary {
          background-color: #dc3545;
          border-color: #dc3545;
        }

        .donation-form .btn-primary:hover,
        .donation-form .btn-primary:focus {
          background-color: #c82333;
          border-color: #c82333;
        }

        .donation-form .btn-primary:active,
        .donation-form .btn-primary.active {
          background-color: #bd2130;
          border-color: #bd2130;
        }

        .donation-form .btn-primary:disabled,
        .donation-form .btn-primary.disabled {
          background-color: #dc3545;
          border-color: #dc3545;
        }

        .donation-form .btn-primary:not(:disabled):not(.disabled):active,
        .donation-form .btn-primary:not(:disabled):not(.disabled).active,
        .donation-form .show>.btn-primary.dropdown-toggle {
        }
      `}</style>
  
    </Container>
    <Footer/>
    </>
  );
 
};

export default DonationForm;
