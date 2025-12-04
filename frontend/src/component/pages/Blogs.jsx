import React, { useEffect, useState, useContext } from "react";
import { api } from "../../utils/fetchWrapper";
import BlogCard from "../reuseble/BlogCard";
import { AuthContext } from "../../utils/authcontext";

const Blogs = ({ openLogin }) => {
  const { isLoggedin } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("all");
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);

  const LIMIT = 9;

  useEffect(() => {
    fetchBlogs();
  }, [activeTab, isLoggedin]);

  useEffect(() => {
    if (!isLoggedin && activeTab === "my") {
      setActiveTab("all");
      setBlogs([]);
    }
  }, [isLoggedin]);

  const fetchBlogs = async () => {
    if (activeTab === "all") {
      const res = await api.get("/blogs/allBlog");
      if (res.Code === 200) setBlogs(res.data);
    }

    if (activeTab === "my") {
      if (!isLoggedin) {
        openLogin();
        return;
      }

      const res = await api.get("/blogs/myBlogs");
      if (res.Code === 200) setBlogs(res.data);
    }

    setPage(1);
  };

  const paginatedBlogs = blogs.slice(
    (page - 1) * LIMIT,
    (page - 1) * LIMIT + LIMIT
  );

  const totalPages = Math.ceil(blogs.length / LIMIT);

  return (
    <div className="p-8 max-w-7xl mx-auto bg-white dark:bg-gray-900 min-h-screen">

      <div className="flex gap-4 border-b pb-2 mb-6 border-gray-300 dark:border-gray-700">
        <button
          className={`pb-2 font-medium ${
            activeTab === "all"
              ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Blogs
        </button>

        <button
          className={`pb-2 font-medium ${
            activeTab === "my"
              ? "border-b-2 border-green-600 text-green-600 dark:text-green-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => {
            if (!isLoggedin) return openLogin();
            setActiveTab("my");
          }}
        >
          My Blogs
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 text-sm border rounded dark:bg-gray-800 dark:text-gray-300"
          >
            Prev
          </button>

          <span className="px-3 py-1 text-sm dark:text-gray-300">
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 text-sm border rounded dark:bg-gray-800 dark:text-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;