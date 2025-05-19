import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "./data/UserContext";
import ModalPage from './components/ModalPage.jsx';
import axios from 'axios';

import Logo from '../assets/MoodifyWhite.png';
import Defaulticon from '../assets/profilePics/Man1.png';
import '../styles/signUp.css';


export default function SignUp() {
  const { setModelUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({
    idProfilePicture: 1,
    profilePicture: Defaulticon
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    user: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };  

  const handleProfileSelect = (image) => {
    setSelectedProfile(image);
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    try {
      const {
        user,
        name,
        lastname,
        email,
        password,
        confirmPassword,
        birthdate
      } = formData;

      //Validar que los campos estén llenos
      if (!user || !name || !lastname || !email || !password || !confirmPassword || !birthdate || !selectedProfile || !termsAccepted) {
        alert("Please fill in all required fields");
        return;
      }
    
      //Confirmación de contraseña
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      const newUser = {
        user,
        name,
        lastname,
        email,
        password,
        birthdate,
        idProfilePicture: selectedProfile.idProfilePicture
      }
      console.log(newUser);

      axios.post('http://localhost:5000/user/registerUser', newUser)
      .then((response) => {
        sessionStorage.setItem('token', response.data.data.token);

        setModelUser(prev => ({
          ...prev,
          profilePicture: selectedProfile.profilePicture,
          user: response.data.data.user
        }));

        navigate("/home");
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(error.response.data.message);
      });
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred while creating the user.");
    }
  };

  return (
    <div className="signup-container">
      <Link to="/" className="back-button"> ← Back </Link>

      <form className="signup-form">
        <img src={Logo} alt="Face Scan" className="logo-image"/>
        <br/>

        <div className="form-grid">
          <div className="form-column">
            <label>User <span className="required">*</span></label>
            <input type="text" name="user" value={formData.user} onChange={handleChange} required />

            <label>Name <span className="required">*</span></label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Email <span className="required">*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Password <span className="required">*</span></label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="form-column">
            <label>Profile Picture</label>
            <div className="profile-pic-section">
              <button type="button" className="upload-button" onClick={() => setShowModal(true)}>Select</button>
              {selectedProfile ? (
                <img src={selectedProfile.profilePicture} alt="Selected" className="profile-preview" />
              ) : (
                <img src={Defaulticon} alt="Default" className="profile-preview" />
              )}
            </div>

            <label>Last Name <span className="required">*</span></label>
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />

            <label>birthdate <span className="required">*</span></label>
            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />

            <label>Confirm Password <span className="required">*</span></label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
        </div>

        <div className="terms">
          <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}/>
          <label htmlFor="terms">
            I have read and agree to the security and privacy policies of this site.
          </label>
        </div>

        <button className="submit-button" onClick={handleSubmit} disabled={!termsAccepted}>
          Create User
        </button>
      </form>

      {showModal && (
        <ModalPage
          onClose={() => setShowModal(false)}
          onSelect={handleProfileSelect}
        />
      )}
    </div>
  );
}
