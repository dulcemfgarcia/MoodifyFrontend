import React, { useContext, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { UserContext } from "../data/UserContext";
import Moodify from "../../assets/MoodifyWhite.png";
import "../../styles/navbar.css";

export default function Navbar() {
    const { user } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
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