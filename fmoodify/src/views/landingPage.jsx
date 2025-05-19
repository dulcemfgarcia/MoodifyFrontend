import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landingPage.css';
import logo from '../assets/MoodifyWhite.png';

export default function LandingPage() {
  return (
    <div className="landingpage-container">
        <header className="landingpage-header">
            <img src={logo} alt="Moodify Logo" className="logo-image" />
        </header>

        <div className="card-container">
            <div className="card">
                <p>You are new on Moodify</p>
                <Link to="/signup" className="button-link">Sign Up</Link>
            </div>
            <div className="card">
                <p>You already have an account</p>
                <Link to="/signin" className="button-link">Sign In</Link>
            </div>
      </div>
      <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>
    </div>
  );
}
