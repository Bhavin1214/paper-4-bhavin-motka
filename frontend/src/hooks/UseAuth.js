import { useEffect, useState } from "react";

export const UseAuth = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loggedinUser, setLoggedinUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("email");

    if (token && user) {
      setIsLoggedin(true);
      setLoggedinUser(user);
    }
  }, []);

  return { isLoggedin, setIsLoggedin, loggedinUser, setLoggedinUser };
};
