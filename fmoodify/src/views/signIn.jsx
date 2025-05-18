import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "./data/UserContext";
import axios from 'axios';

import FaceImage from '../assets/face.png';
import Logo from '../assets/MoodifyBlack.png';
import icon1 from '../assets/profilePics/Man1.png';
import icon2 from '../assets/profilePics/Man2.png';
import icon3 from '../assets/profilePics/Man3.png';
import icon4 from '../assets/profilePics/man4.png';
import icon5 from '../assets/profilePics/woman1.png';
import icon6 from '../assets/profilePics/woman2.png';
import icon7 from '../assets/profilePics/woman3.png';
import icon8 from '../assets/profilePics/woman4.png';

import '../styles/signIn.css';

export default function SignIn() {
  const { setModelUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    user: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { user, password } = credentials;

      if (!user || !password) {
        alert("Please fill all fields.");
        return;
      }
      axios.post('http://localhost:5000/auth/login', credentials)
      .then((response) => {
        sessionStorage.setItem('token', response.data.data.token);
        const profilePic = getIconByNumber(response.data.data.idProfilePicture);

        setModelUser(prev => ({
          ...prev,
          profilePicture: profilePic,
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
      alert('Error occurred during sign-in. Please try again.');
    }
  };

  const getIconByNumber = (n) => {
    const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8];
    return icons[n - 1] || icon1;
  };

  return (
    <div className="signin-container">
      <Link to="/" className="back-button"> ← Back </Link>

      <div className="signin-content">
        <div className="info-card">
          <img src={FaceImage} alt="Face Scan" className="face-image" />
          <p>
            Moodify detects your emotions through your facial expression.<br />
            We use the Amazon Rekognition API to analyze gestures and suggest songs that match how you feel.
          </p>
        </div>

        <div className="form-card">
          <img src={Logo} alt="Logo" className="logo-image" />
          <h2>Sign In</h2>

          <form onSubmit={handleSubmit}>
            <p>User</p>
            <input
              type="text"
              name="user"
              placeholder="Enter your username..."
              value={credentials.user}
              onChange={handleChange}
              required
            />

            <p>Password</p>
            <input
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={credentials.password}
              onChange={handleChange}
              required
            />

            <div className="links">
              <Link to="/ForgotPassword">I forgot my password</Link>
              <Link to="/signup">I don't have an account</Link>
            </div>

            <button type="submit" className="submit-button">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}