import React from "react";
import { AuthContext } from "../../utils/authcontext";

const Home = () => {
  const { isLoggedin, loggedinUser } = React.useContext(AuthContext);

  return (
    <div className="p-10 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors">

      <h1 className="text-3xl font-semibold">
        {isLoggedin
          ? `Welcome, ${loggedinUser?.name || loggedinUser || "User"}`
          : "Welcome to the Blog Platform"}
      </h1>

      <p className="mt-4 text-gray-600 dark:text-gray-300">
        {isLoggedin
          ? "You can explore blogs, create posts, and manage your profile."
          : "Login or register to create blogs and access your account."}
      </p>

    </div>
  );
};

export default Home;
