import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // If you're using React Router, import the Link component
import Cookies from 'js-cookie';

const AdminLog = (props) => {
  const nav = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const hundleForm = (e)=>{
    e.preventDefault()
    const login = {
      email,
      password
    }
    axios.post("http://localhost:8000/admin/login",login)
    .then((res)=>{
      // Save the token in cookies after successful login or registration
      if (res.data.volunteerToken) {
        Cookies.set('volunteerToken', res.data.volunteerToken, { expires: 1, sameSite: 'strict' });
      }

      nav("/MyAdmin/Dashboard");
    })
    .catch((err)=>{
      console.log("Something went wrong ! "+ err);
    })
  }

  return (
    <>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-white" style={{backgroundColor:"#FF9F92"}}>
              <h3 className="mb-0">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={hundleForm}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Enter your password"  onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <center>
                  <button type="submit" className="btn btn-warning">Login</button>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminLog;