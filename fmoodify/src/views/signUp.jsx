import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signUp.css';
import ModalPage from './components/ModalPage.jsx';
import Logo from '../assets/MoodifyBlack.png';
import Defaulticon from '../assets/profilePics/Man1.png';


export default function SignUp() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    user: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: ''
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
  
    const {
      user,
      name,
      lastName,
      email,
      password,
      confirmPassword,
      birthday
    } = formData;
  
    //Validar que los campos estén llenos
    if (!user || !name || !lastName || !email || !password || !confirmPassword || !birthday || !selectedProfile || !termsAccepted) {
      alert("Please fill in all required fields");
      return;
    }
  
    //Confirmación de contraseña
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    navigate("/home");
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

            <label>email <span className="required">*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Password <span className="required">*</span></label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="form-column">
            <label>Profile Picture</label>
            <div className="profile-pic-section">
              <button type="button" className="upload-button" onClick={() => setShowModal(true)}>Select</button>
              {selectedProfile ? (
                <img src={selectedProfile} alt="Selected" className="profile-preview" />
              ) : (
                <img src={Defaulticon} alt="Default" className="profile-preview" />
              )}
            </div>

            <label>Last Name <span className="required">*</span></label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

            <label>Birthday <span className="required">*</span></label>
            <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />

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
