import React, { createContext } from "react";
import { UseAuth } from "../hooks/UseAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const {
    isLoggedin,
    setIsLoggedin,
    loggedinUser,
    setLoggedinUser
  } = UseAuth();

  const login = (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);

    setIsLoggedin(true);
    setLoggedinUser(email);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    setIsLoggedin(false);
    setLoggedinUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedin, loggedinUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
