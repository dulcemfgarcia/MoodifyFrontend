import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from "../assets/MoodifyBlack.png";
import "../styles/restorePassword.css";

export default function RestorePassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Please fill in both fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    navigate("/signIn");
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
