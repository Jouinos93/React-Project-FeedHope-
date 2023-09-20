import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


const ShowOneVolunteer = () => {
  const [volunteer, setVolunteer] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:8000/api/volunteer/'+id)
      .then(res => {
        console.log(res.data);
        setVolunteer(res.data)
      })
      .catch(err => console.error(err));
  }, [id]);


  return (
    <div className='container' class="p-3 mb-2 bg-dark-subtle text-emphasis-dark">
     <center>
     <div className='d-flex justify-content-between p-4' >
        <h1>Volunteer info</h1>
        <Link to={`/`}> Back to Home </Link>

      </div>
     </center>
    </div>
  )
}

export default ShowOneVolunteer