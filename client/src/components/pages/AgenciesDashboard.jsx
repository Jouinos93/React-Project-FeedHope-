import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import loading from "../images/loading.gif"
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

const AgenciesDashboard = (props) => {

  const [socket] = useState(() => io(':8000'));
  useEffect(() => {
    // we need to set up all of our event listeners
    // in the useEffect callback function
    console.log('Is this running?');
    socket.on('Welcome', data => console.log(data));
 
    // note that we're returning a callback function
    // this ensures that the underlying socket will be closed if App is unmounted
    // this would be more critical if we were creating the socket in a subcomponent
    return () => socket.disconnect(true);
  }, []);

  const [volunteer, setVolunteer] = useState()
  const [givenFoodData, setGivenFoodData] = useState([]);

  
  useEffect(()=>{
    axios.get("http://localhost:8000/api/volunteers/loggedIn", { withCredentials: true })
    .then((res)=>{
      setVolunteer(res.data)
    })
    .catch((err)=>console.log("this is an :",err))
  },[])
  
  useEffect(()=>{
    axios.get("http://localhost:8000/api/givenFood", { withCredentials: true })
    .then((res)=>{
      setGivenFoodData(res.data)
    })
    .catch((err)=>console.log("this is an :",err))
  },[])
  
  const [successGiven, setSuccessGiven] = useState([])
  useEffect(()=>{
    if (volunteer ) {
      axios.get(`http://localhost:8000/api/givenFood/success/${volunteer._id}`, { withCredentials: true })
      .then((res)=>{
        console.log(res.data)
        setSuccessGiven(res.data.givenSuccessfully)
      })
      .catch((err)=>console.log("this is an :",err))
    }else{
      console.log("still loading volunteer", volunteer);
    }
  },[volunteer])

  const handlePickup = (food, volunteer) => {
    // Make a PUT request to the backend API to pick up the donated food

    if ( food && volunteer ) {
      axios.put(`http://localhost:8000/api/givenFood/pickup/${food._id}`,{volunteerId: volunteer._id}, { withCredentials: true })
        .then((res) => {
          // Handle the success response if needed
          console.log(res.data);
        })
        .catch((err) => {
          // Handle the error response if needed
          console.error(err.response.data);
        });
    }else{
      console.log("still loading food", food, " volunteer", volunteer);
    }
  };
  const nav = useNavigate()
  const logout = ()=>{
    axios.post("http://localhost:8000/api/volunteers/logout")
    .then((res)=>{
      Cookies.remove('volunteerToken');
      nav('/')
    })
    .catch((err)=>console.log(err))
  }
  return (
    <div>

      {!volunteer? <center><img src={loading} alt="loading" /></center> : 
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container d-inline-flex">
          <div className='container d-inline-flex align-items-center'>
          <Link to={volunteer.website} className="navbar-brand">
            <img className="navbar-brand" src={volunteer.logo} alt="Logo" height={80}/>
          </Link>
              <h2>Welcome "<b>{volunteer.agencyName}</b>" and thanks for your participation! 💗</h2>
          </div>
            <Link to="/">
              <button className="btn btn-outline-warning">Home</button>
            </Link>
          <button className='btn btn-outline-danger' onClick={()=>{logout()}}>Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-4">
        <h2>GivenFood waiting list:</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Doner</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Transported</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Wanna get it?!</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(givenFoodData) ? givenFoodData.filter((givenFood) => givenFood.status !== "Picked Up")
            .map((food) => (
              <tr key={food._id}>
                <td>
                  <Link to = {`/doner/show/${food.doner._id}`}>
                    {food.doner.donerName}
                  </Link>
                </td>
                <td>{food.title}</td>
                <td>{food.qty}</td>
                <td>{food.status}</td>
                <td>{food.doner.address.num}, {food.doner.address.street}, {food.doner.address.city}, {food.doner.address.zipcode}</td>
                <td>{food.doner.phone}</td>
                <td>
                {food.status==="Pending"?
                  <button className="btn btn-success" onClick={() => handlePickup(food, volunteer)}>Pick-It</button>
                : (food.volunteerAble===volunteer._id ? "Waiting for you" : "Sorry! Try next one")}  
                </td>
                </tr>
                  ))
                :<tr>
                    <td className='d-flex justify-content-center' colSpan='3'>
                      <img src={loading} alt="loading" height={120}/>
                    </td>
                  </tr>}
          </tbody>
        </table>
        </div>
        <br /><hr /><br />
        <div className="container mt-4">
        <h2>GivenFood successfully delivred:</h2>
        <div className="container">
        <table className="table table-success table-striped-bordered border-success">
          <thead>
            <tr>
              <th>Doner</th>
              <th>Phone</th>
              <th>Description</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(successGiven) ? successGiven.map((food) => (
              <tr key={food._id}>
                <td>
                <Link to = {`/doner/show/${food.doner._id}`}>
                  {food.doner.donerName}
                </Link>
                </td>
                <td>{food.doner.phone}</td>
                <td>{food.title}</td>
                <td>{food.qty}</td> 
              </tr>)):<tr>
                    <td className='d-flex justify-content-center' colSpan='3'>
                      <img src={loading} alt="loading" height={120}/>
                    </td>
                  </tr>
            }
          </tbody>
        </table>
        </div>
      </div>
      </div>
      }
    </div>
  )
}

export default AgenciesDashboard