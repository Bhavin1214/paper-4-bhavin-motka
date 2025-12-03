import React, { useContext } from 'react'
import { AuthContext } from "../../utils/authcontext"
import { Link } from "react-router-dom"
const Navbar = ({ openLogin, openRegister }) => {
    const { isLoggedin, loggedinUser } = useContext(AuthContext);

    const handleLogOut = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("email")
    }

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
                            <button onClick={handleLogOut} className="px-4 py-1 border rounded-md hover:bg-red-500 hover:text-white transition">Logout</button>
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

            </div>
        </div>

    )
}

export default Navbar
