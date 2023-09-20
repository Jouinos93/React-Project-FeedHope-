import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';


const ShowOneDoner = () => {
  const [doner, setDoner] = useState(null);
  const [address, setAddress] = useState("B31, TechnoPark, Ariana 2083");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/doner/${id}`)
      .then(res => {
        console.log(res.data);
        setDoner(res.data);
      })
      .catch(err => console.error(err));
  }, [id]);


  useEffect(() => {
    // Set address when donor data is available
    if (doner) {
      console.log(doner.Doner.address);
      setAddress(`${doner.Doner.address.num} ${doner.Doner.address.street} ${doner.Doner.address.city} ${doner.Doner.address.zipcode}`);
      geocodeAddress();
    }
  }, [doner]);

  const geocodeAddress = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = response.data;

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setLatitude(parseFloat(lat));
        setLongitude(parseFloat(lon));
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };

  if (!doner) {
    return <div>Loading...</div>;
  }


  return (
    <div className="p-3 mb-2 bg-dark-subtle text-emphasis-dark">
     <center>
     <div className='d-flex justify-content-between p-4' >
        <h1> Donor info </h1>
        <Link to={`/agencies/dashboard`}> Back</Link>
      </div>
     </center>
      {!doner ? "loading" :
        <div className='container'>
          <h2>{doner.donerName}</h2>
          <p>{doner.address}</p>
          <p>{doner.phone}</p>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: '300px', height: '300px' }}>
            <MapContainer center={[latitude, longitude]} zoom={13} style={{ width: '100%', height: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[latitude, longitude]}>
                <Popup>{doner.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
          <div>
            {/* Other donor information can be placed here */}
          </div>
        </div>
        </div>
      }
    </div>
  )
}

export default ShowOneDoner