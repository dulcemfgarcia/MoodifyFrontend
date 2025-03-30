import React, { createContext, useState } from "react";
import userProfile from "../../assets/profilePics/woman2.png";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: "Fernanda",
        profilePicture: userProfile,
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};