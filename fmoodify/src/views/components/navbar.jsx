import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../data/UserContext";
import Moodify from "../../assets/MoodifyWhite.png";
import "../../styles/navbar.css";

export default function Navbar() {
    const { user } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <>
        <navbar className="nav">
            <img src={Moodify} className="logo" alt="Moodify" />
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <ul className={menuOpen ? "nav-links open" : "nav-links"}>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/home" className="active">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
            <div className="profile">
                <div className="profilePic-container">
                    <img src={user.profilePicture} className="profilePic" alt="Profile" />
                </div>
                <p className="username">{user.username}</p>
            </div>
        </navbar>
        </>
    );
}