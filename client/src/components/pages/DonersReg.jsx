import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AppNavbar from '../Navbar';

const DonerReg = (props) => {
    const nav = useNavigate()
    const [donerName, setDonerName] = useState()
    const [website, setWebsite] = useState()
    const [logo, setLogo] = useState("")
    const [phone, setPhone] = useState()
    const [num, setNum] = useState()
    const [street, setStreet] = useState()
    const [city, setCity] = useState()
    const [zipcode, setZipcode] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    function convertToBase64(file){
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result)
          };
          fileReader.onerror = (error) => {
            reject(error)
          }
        })
      }

    const hundleLogo = async (e)=>{
        e.preventDefault()
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setLogo(base64);
    }

    const hundleReg = (e)=>{
        e.preventDefault()
        const newAdress = {
            num,
            street,
            city,
            zipcode
        }
        const newDoner = {
          donerName,
          website,
          logo,
          phone,
          address: newAdress,
          email,
          password,
          confirmPassword
        }
        axios.post("http://localhost:8000/api/doners/register", newDoner)
        .then((res)=>{

          // Save the token in cookies after successful login or registration
          if (res.data.donerToken) {
            Cookies.set('donerToken', res.data.donerToken, { expires: 1, sameSite: 'strict' });
          }

          nav("/doners/dashboard");
        })
        .catch((err)=>{
          console.log("Something went wrong ! "+ err);
        })
    }
  return (
    <>
    <AppNavbar />
    <div className="container mt-4">
      <div className="row justify-content-center">
     <div className="col-10 m-2">
        <div className="card" style={{ background: 'rgba(211, 211, 211, 0.7)' }}>
            <div className="card-header text-black" style={{ background: 'rgba(211, 211, 211, 0.7)' }}>
              <h2>Registration</h2>
            </div>
            <div className="card-body">
         <form onSubmit={(e)=>{hundleReg(e)}}>
           <div className="form-group">
             <label>Your Name</label>
             <input className='form-control' onChange={(e)=>{setDonerName(e.target.value)}} value={donerName}/>
           </div>
           <div className="form-group">
             <label>Your website</label>
             <input className='form-control' type='url' onChange={(e)=>{setWebsite(e.target.value)}}  value={website}/>
           </div>
           <div className="form-group">
             <label>Your logo</label>
             <input className='form-control' type='file' accept='.jpeg, .png, .jpg' onChange={(e)=>{hundleLogo(e)}}/>
           </div>
           <div className="form-group">
             <label>Your phone</label>
             <input className='form-control' type='number' onChange={(e)=>{setPhone(e.target.value)}}  value={phone}/>
           </div> <br />
             <label className='form-label'>Your address</label><br />
           <div className="input-group mb-4">
             <input className='col-md-1 form-control m-2' placeholder='Number' type='number' onChange={(e)=>{setNum(e.target.value)}} value={num}/>
             <input className='col-md-2 form-control m-2' placeholder='Street' onChange={(e)=>{setStreet(e.target.value)}}  value={street}/>
             <input className='col-md-2 form-control m-2' placeholder='City' onChange={(e)=>{setCity(e.target.value)}} value={city}/>
             <input className='col-md-1 form-control m-2' placeholder='Zipcode' type='number' onChange={(e)=>{setZipcode(e.target.value)}} value={zipcode}/>
           </div>
           <div className="form-group">
            <label>Email</label>
             <input type='email' className='form-control' onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
           </div>
           <div className="form-group">
             <label>Password</label>
             <input type='password' className='form-control'  onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
           </div>
           <div className="form-group">
             <label>Confirm password</label>
             <input type='password' className='form-control'  onChange={(e)=>{setConfirmPassword(e.target.value)}} value={confirmPassword}/>
           </div>
          <center>
                    <button className="btn btn-danger btn-xl"> 
                      Submit
                    </button>
                  </center>
        </form>
        </div>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default DonerReg