import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Logo from "../assets/MoodifyWhite.png";
import "../styles/forgotPassword.css";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailSent(true);

    try {
      if (!email) {
        alert("Please fill all fields.");
        return;
      }

      axios.post('https://api.moodifyproject.click/user/restorePasswordRequest', { email })
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        navigate("/");
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

  return (
    <>
        <div className="forgot-container">
            <Link to="/signin" className="back-button"> ⭠ Back </Link>

            <form onSubmit={handleSubmit} className="forgot-form">
                <img src={Logo} alt="Moodify" className="logo-forgot" />
                <p className="question">Did you forget your password?</p>

                <label className="label-email">Enter your registered email <span>*</span></label>
                <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <p className="info">
                If the email is registered, you will receive a link to reset your password.
                </p>

                <button type="submit" className="send-button">Send Email</button>

                {emailSent && (
                <p className="sent-msg">
                    An email was sent to your account, check your spam folder if you don't see the email.
                </p>
                )}
            </form>
        </div>
    </>
  );
}
