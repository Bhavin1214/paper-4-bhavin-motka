import React, { createContext } from "react";
import { UseAuth } from "../hooks/UseAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isLoggedin, loggedinUser } = UseAuth();

  return (
    <AuthContext.Provider value={{ isLoggedin, loggedinUser }}>
      {children}
    </AuthContext.Provider>
  );
};
