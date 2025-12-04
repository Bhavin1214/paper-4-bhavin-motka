
import React, { useContext, useEffect } from "react";
import { AuthContext } from "./authcontext";

const PrivateRoute = ({ children, openLogin }) => {
  const { isLoggedin } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedin && openLogin) {
      openLogin(); 
    }
  }, [isLoggedin]);

  if (!isLoggedin) return null;

  return <>{children}</>;
};

export default PrivateRoute;