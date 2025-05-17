import React, { useContext, useState } from "react";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { UserContext } from "../data/UserContext";
import Moodify from "../../assets/MoodifyWhite.png";
import "../../styles/navbar.css";

export default function Navbar() {
    const { modelUser } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }
    const handleLogout = () => {
        navigate("/");
    }

    function CustomLink({ to, children, ...props }) {
        const resolvedPath = useResolvedPath(to);
        const isActive = useMatch({ path: resolvedPath.pathname, end: true });
        return (
            <li className={ isActive ? "active" : "" }>
                <Link to={to} { ...props }>
                    {children}
                </Link>
            </li>
        );
    }

    return (
        <>
            <navbar className="nav">
                <img src={Moodify} className="logo" alt="Moodify" />
                <button className="menu-toggle" onClick={toggleMenu}>
                    ☰
                </button>
                <ul className={menuOpen ? "nav-links open" : "nav-links"}>
                    <li><CustomLink to="/history">History</CustomLink></li>
                    <li><CustomLink to="/home">Home</CustomLink></li>
                    <li><CustomLink to="/dashboard">Dashboard</CustomLink></li>
                </ul>
                <div className="profile" onClick={toggleDropdown}>
                    <div className="profilePic-container">
                        <img src={modelUser.profilePicture} className="profilePic" alt="Profile" />
                    </div>
                    <p className="username">{modelUser.user}</p>
                    {dropdownOpen && (
                        <div className="dropdown">
                            <button className="logout-button" onClick={handleLogout}>Log out</button>
                        </div>
                    )}
                </div>
            </navbar>
        </>
    );
}
