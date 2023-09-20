import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import loading from "../images/loading.gif"
import Cookies from 'js-cookie';

const DonersDashboard = (props) => {
  const [doner, setDoner] = useState()
  const [givenFoodData, setGivenFoodData] = useState(null)

  useEffect(()=>{
    axios.get("http://localhost:8000/api/doners/loggedIn", { withCredentials: true })
    .then((res)=>{
      setDoner(res.data)
    })
    .catch((err)=>console.log("this is an :",err))
  },[])
  console.log(doner);
  useEffect(() => {
    if (doner && doner._id) {
      axios.get(`http://localhost:8000/api/givenFood/${doner._id}/oneDoner`, { withCredentials: true })
        .then((res) => {
          console.log(res);
          setGivenFoodData(res.data);
        })
        .catch((err) => console.log("this is an :", err));
    }
  }, [doner]);


  const nav = useNavigate()

  const logout = ()=>{
    axios.post("http://localhost:8000/api/doners/logout")
    .then((res)=>{
      Cookies.remove('donerToken');
      nav('/')
    })
    .catch((err)=>console.log(err))
  }

  const handleUpdateStatus = (givenFoodId) => {
    axios.put(`http://localhost:8000/api/givenFood/pickedup/${givenFoodId}`)
      .then((res) => {
        // Handle the success response if needed
        console.log(res.data);
        // Optionally, you can update the UI or show a success message to the donor
      })
      .catch((err) => {
        // Handle the error response if needed
        console.error(err.response.data);
      });
  };

  return (
    <div>

      {!doner? <center><img src={loading} alt="loading" /></center> : 
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container d-inline-flex">
          <div className='container d-inline-flex align-items-center'>
          <Link to={doner.website} className="navbar-brand">
            <img className="navbar-brand" src={doner.logo} alt="Logo" height={80}/>
          </Link>
              <h2>Welcome "<b>{doner.donerName}</b>" and thanks for your participation! 💗</h2>
          </div>
            <Link to="/">
              <button className="btn btn-outline-warning">Home</button>
            </Link>
            <Link to="/doners/giveMore">
              <button className="btn btn-outline-success">GiveMore</button>
            </Link>
          <button className='btn btn-outline-danger' onClick={()=>{logout()}}>Logout</button>
        </div>
      </nav>

      <div className="container mt-4">
        <h2>Given Food</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Description</th>
              <th>Transported</th>
              <th>Promised to</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(givenFoodData)? givenFoodData.map((givenFood)=>{
              return <tr key={givenFood._id}>
                          <td>{givenFood.qty}</td>
                          <td>{givenFood.title}</td>
                          <td>{givenFood.status}</td>
                          <td>{givenFood.volunteerAble=== null ? "" : 
                          <Link to = {`/agency/show/${givenFood.volunteerAble._id}`}>
                            {givenFood.volunteerAble.agencyName}
                          </Link>
                          
                          }</td>
                          <td>
                          {givenFood.status==="Promised"?
                            <button className='btn btn-success' onClick={() => handleUpdateStatus(givenFood._id)}>PickedUp</button>
                          :(givenFood.status==="Picked Up" ? "👍"  : "Not checked yet")}
                          </td>
                          
                    </tr>
            }):
            <tr>
              <td className='d-flex justify-content-center' colSpan='3'>
                <img src={loading} alt="loading" height={120}/>
              </td>
            </tr>}
          </tbody>
        </table>
      </div>
      </div>
      }
    </div>
  )
}

export default DonersDashboard