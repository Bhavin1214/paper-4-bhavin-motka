import React, { useEffect, useState } from "react";
import { api } from "../../utils/fetchWrapper";
import BlogCard from "../reuseble/BlogCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    const res = await api.get("/blogs/allBlog");
    if (res.Code === 200) {
      const sorted = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBlogs(sorted.slice(0, 6)); 
    }
  };

  return (
    <div className="p-8   bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">

      <div className="bg-blue-600 dark:bg-blue-700 text-white rounded-xl p-6 md:p-10 shadow-md transition-colors">
        <h1 className="text-4xl font-bold mb-3">
          Discover Stories, Ideas & Insights
        </h1>

        <p className="text-lg opacity-90">
          A platform where developers and creators share knowledge through blogs.
          Explore trending topics, tech insights, and personal experiences.
        </p>

        <Link to="/blogs">
          <button className="mt-5 px-6 py-2 bg-white text-blue-600 font-medium rounded-md shadow hover:bg-gray-100 transition">
            Explore All Blogs
          </button>
        </Link>
      </div>

      <h2 className="text-3xl font-semibold mt-10 text-gray-900 dark:text-gray-100">
        Latest Blogs
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mt-1">
        Fresh posts from the community
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      <div className="mt-10 text-center text-gray-700 dark:text-gray-400 text-sm">
        Want to read more?
        <Link
          to="/blogs"
          className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
        >
          Browse the full collection →
        </Link>
      </div>
    </div>
  );
};

export default Home;
