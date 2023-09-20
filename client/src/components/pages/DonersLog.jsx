import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AppNavbar from '../Navbar';

const DonersLog = (props) => {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const login = {
      email,
      password,
    };
    axios
      .post('http://localhost:8000/api/doners/login', login)
      .then((res) => {
        // Save the token in cookies after successful login or registration
        if (res.data.donerToken) {
          Cookies.set('donerToken', res.data.donerToken, { expires: 1, sameSite: 'strict' });
        }
        nav('/doners/dashboard');
      })
      .catch((err) => {
        console.log('Something went wrong! ' + err);
      });
  };

  return (
    <>
      <AppNavbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card" style={{ background: 'rgba(211, 211, 211, 0.7)' }}>
              <div className="card-header text-black" style={{ background: 'rgba(211, 211, 211, 0.7)' }}>
                <h3 className="mb-0" style={{ color: 'black' }}>Donor Login</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  <center>
                    <button type="submit" className="btn btn-danger btn-xl"> 
                      Login
                    </button>
                  </center>
                </form>
              </div>
              <div className="card-footer text-center">
                <p className="mb-0">
                  Don't have an account yet? <Link to="/doners/register">Register Here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonersLog;
