import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

const GivenFoodForm = () => {

  // State to hold the Socket.IO client instance
  const [socket] = useState(() => io(':8000'));

    // Establish the connection to the Socket.IO server upon component mounting
    useEffect(() => {
      const newSocket = io('http://localhost:8000'); // Replace this URL with your Socket.IO server URL
  
      // Clean up the socket connection on component unmount
      return () => newSocket.disconnect();
    }, []);
  
    
  const nav = useNavigate();
  const currentDate = new Date();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [qty, setQty] = useState(1);
  const [canWait, setCanWait] = useState(false);
  const [toDeliverBefore, setToDeliverBefore] = useState(
    currentDate.toISOString().slice(0, 10) // Set the initial date to today in YYYY-MM-DD format
  );
  const doner = Cookies.get();
  const handleDonate = (e) => {
    e.preventDefault();
    // Handle the donation logic here, e.g., send the form data to the backend API
    const newGivenFood = {
      title,
      type,
      qty,
      canWait,
      toDeliverBefore,
      doner: doner.donerToken,
    };
    // Emit the newGivenFood data to the Socket.IO server
    socket.emit('newGivenFood', newGivenFood);


    axios
      .post('http://localhost:8000/api/givenFood', newGivenFood)
      .then((res) => {
        console.log(res);
        nav('/doners/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
    // Clear the form fields after donation
    setTitle('');
    setType('');
    setQty(1);
    setCanWait(false);
    setToDeliverBefore(currentDate.toISOString().slice(0, 10)); // Reset the date to today
  };
return (
  <div className="container mt-4">
  <div className="row justify-content-center">
 <div className="col-10 m-2">
    <div className="card" style={{ background: 'rgba(211, 211, 211, 0.7)' }}>
        <div className="card-header text-black" style={{ background: 'rgba(211, 211, 211, 0.7)' }}>
          <h2>Given Food, Give Hope</h2>
        </div>
        <div className="card-body">
      <form onSubmit={handleDonate}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
<div className="mb-3">
          <label className="form-label">Type of food</label>
          <input
            type="text"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <div className="input-group">
            <span className="input-group-text">For</span>
            <input
              type="number"
              className="form-control"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
            <span className="input-group-text">person(/s)</span>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={canWait}
              onChange={(e) => setCanWait(e.target.checked)}
            />
<label className="form-check-label">Can wait?</label>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Expire date</label>
          <input
            type="date"
            className="form-control"
            value={toDeliverBefore}
            onChange={(e) => setToDeliverBefore(e.target.value)}
          />
        </div>
        <center>
          <button type="submit" className="btn btn-info">
            Donate
          </button>
          <button type="button" className="btn btn-success" onClick={() => nav('/doners/dashboard')}>
            Go Back
          </button>
        </center>
      </form>
      </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default GivenFoodForm;