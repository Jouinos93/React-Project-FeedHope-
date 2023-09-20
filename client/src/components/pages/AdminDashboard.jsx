import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



const AdminDashboard = () => {
  const [volunteerCount, setVolunteerCount] = useState(0);

  useEffect(() => {
    // Fetch the volunteer count from the backend API
    axios.get('http://localhost:8000/api/volunteers/count')
      .then((res) => {
        // Update the state with the fetched count
        setVolunteerCount(res.data.count);
      })
      .catch((err) => {
        console.error('Error fetching volunteer count:', err);
      });
  }, []);

  const [donerCount, setDonerCount] = useState(0);

  useEffect(() => {
    // Fetch the doner count from the backend API
    axios.get('http://localhost:8000/api/doners/count')
      .then((res) => {
        // Update the state with the fetched count
        setDonerCount(res.data.count);
      })
      .catch((err) => {
        console.error('Error fetching doner count:', err);
      });
  }, []);

  const [givenFoodCount, setGivenFoodCount] = useState(0);

  useEffect(() => {
    // Fetch the givenFood count from the backend API
    axios.get('http://localhost:8000/api/givenFood/count')
      .then((res) => {
        // Update the state with the fetched count
        setGivenFoodCount(res.data.count);
      })
      .catch((err) => {
        console.error('Error fetching givenFood count:', err);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2 d-md-block bg-dark sidebar position-sticky">
          <div className="position-sticky"  style={{ height: '100vh' }}>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin/volunteers">
                  Volunteers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin/doners">
                  Doners
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin/given-food">
                  Given Food
                </Link>
              </li>
              {/* Add more sidebar items as needed */}
            </ul>
          </div>
        </nav>

        {/* Main content area */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="pt-3 pb-2 mb-3">
            <h1 className="text-primary">Admin Dashboard</h1>
          </div>

          {/* Statistics blocks */}
          <div className="row">
            <div className="col-md-4">
              <div className="card bg-primary text-white mb-4">
                <div className="card-body">
                  <h5 className="card-title">Registered Volunteers</h5>
                  <p className="card-text">{volunteerCount}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-success text-white mb-4">
                <div className="card-body">
                  <h5 className="card-title">Total Doners</h5>
                  <p className="card-text">{donerCount}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-info text-white mb-4">
                <div className="card-body">
                  <h5 className="card-title">Total Given Food Quantity</h5>
                  <p className="card-text">{givenFoodCount}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;