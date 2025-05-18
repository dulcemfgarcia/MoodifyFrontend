import React, { createContext, useState } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [modelUser, setModelUser] = useState({
        user: "",
        profilePicture: undefined,
    });

    return (
        <UserContext.Provider value={{ modelUser, setModelUser }}>
            {children}
        </UserContext.Provider>
    );
};