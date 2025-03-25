import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signIn.css';
import FaceImage from '../assets/face.png';
import Logo from '../assets/MoodifyBlack.png';

export default function SignIn() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = credentials;

    if (!username || !password) {
      alert("Please fill all fields.");
      return;
    }

    navigate("/home");
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
              name="username"
              placeholder="Enter your username..."
              value={credentials.username}
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
              <Link to="/forgot-password">I forgot my password</Link>
              <Link to="/signup">I don’t have an account</Link>
            </div>

            <button type="submit" className="submit-button">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}