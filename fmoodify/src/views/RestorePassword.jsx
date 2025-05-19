import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import Logo from "../assets/MoodifyWhite.png";
import "../styles/restorePassword.css";

export default function RestorePassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!password || !confirmPassword) {
        alert("Please fill in both fields.");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords don't match.");
        return;
      }

      console.log(token);

      axios.post('http://localhost:5000/user/restoreNewPassword', { token, newPassword: password })
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        navigate("/signIn");
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(error.response.data.message);
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred during password restoration. Please try again.');
    }
  };

  return (
    <div className="restore-container">
      <Link to="/signIn" className="back-button">← Back</Link>

      <form onSubmit={handleSubmit} className="restore-form">
        <img src={Logo} alt="Moodify" className="logo-restore" />

        <p className="restore-text">Restore your password</p>

        <label htmlFor="new-password"> New password <span>*</span></label>
        <input
          id="new-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="confirm-password"> Confirm your new password <span>*</span></label>
        <input
          id="confirm-password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
        <button type="submit" className="restore-button">Restore Password</button>
      </form>
    </div>
  );
}
