import React, { useContext } from 'react'
import { AuthContext } from "../../utils/authcontext"
import { useTheme } from '../../utils/themeContext'
import { Link } from "react-router-dom"
const Navbar = ({ openLogin, openRegister }) => {
    const { isLoggedin, loggedinUser, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    return (
        <div className="flex items-center justify-between px-10 py-4 dark:bg-gray-900 dark:text-gray-200 bg-white shadow-md transition-colors">

            <div className="text-2xl font-semibold cursor-pointer">
                Blogs
            </div>

            <div className="flex gap-6 text-sm font-medium">
                <Link to="/" className="hover:text-blue-500">Home</Link>
                <Link to="/blogs" className="hover:text-blue-500">Blogs</Link>
                <Link to="/categories" className="hover:text-blue-500">Categories</Link>
            </div>

            <div className="hidden md:block">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border rounded-md px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 dark:border-gray-700 focus:outline-none"
                />
            </div>

            <div className="flex gap-4">
                {
                    isLoggedin ? (
                        <>
                            <Link to="/create-blog" className="px-4 py-1 border rounded-md hover:bg-green-500 hover:text-white transition">Create</Link>
                            <Link href="/profile" className="px-4 py-1 border rounded-md hover:bg-gray-700 hover:text-white transition">{loggedinUser}</Link>
                            <button onClick={logout} className="px-4 py-1 border rounded-md hover:bg-red-500 hover:text-white transition">Logout</button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={openLogin}
                                className="px-4 py-1 border rounded-md hover:bg-blue-500 hover:text-white transition"
                            >
                                Login
                            </button>

                            <button
                                onClick={openRegister}
                                className="px-4 py-1 border rounded-md hover:bg-blue-500 hover:text-white transition"
                            >
                                Register
                            </button>
                        </>
                    )
                }
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg 
                       bg-gray-200 dark:bg-gray-800 
                       text-gray-800 dark:text-gray-200 
                       hover:bg-gray-300 dark:hover:bg-gray-700 
                       transition-all"
                >
                    {theme === "dark" ? (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 3v1.5m6.364 1.136l-1.061 1.061M21 12h-1.5M19.364 17.364l-1.061-1.061M12 19.5V21m-4.303-4.697l-1.061 1.061M4.5 12H3m2.136-4.364l1.061 1.061M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </>
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                                />
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </div>

    )
}

export default Navbar
