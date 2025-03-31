import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/MoodifyBlack.png";
import "../styles/forgotPassword.css";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailSent(true);
    navigate("/restorePassword");
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
