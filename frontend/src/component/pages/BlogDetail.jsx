import React, { useEffect, useState, useContext } from "react";
import { api } from "../../utils/fetchWrapper";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/authcontext";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loggedinUser } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchOneBlog();
  }, []);

  const fetchOneBlog = async () => {
    const res = await api.get(`/blogs/getBlogById/${id}`);
    if (res.Code === 200) {
      const found = res.data;
      setBlog(found);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    const res = await api.post(`/blogs/deleteBlog`, { blogId: blog.id });
    console.log(res);

    if (res.Code === 200) {
      console.log("Blog deleted successfully");
      alert("Blog deleted successfully");
      setTimeout(() => {
        navigate("/blogs");
      }, 2000);
    } else {
      alert("Failed to delete blog");
    }
  };

  if (!blog)
    return (
      <p className="text-center mt-10 text-gray-700 dark:text-gray-300">
        Loading...
      </p>
    );

  const isOwner = loggedinUser === blog.author?.email;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-60 object-cover rounded-xl mb-5 shadow"
        />
      )}

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        {blog.title}
      </h1>

      <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
        By <span className="font-medium">{blog.author?.name}</span> •{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-3">
        <span className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 
                         text-blue-700 dark:text-blue-200 rounded-full">
          {blog.Category?.name}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {blog.tags?.map((tag) => (
          <span
            key={tag.id}
            className="text-xs bg-gray-200 dark:bg-gray-700 
                       text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <div className="mt-6 text-lg leading-relaxed whitespace-pre-line 
                      text-gray-800 dark:text-gray-200">
        {blog.content}
      </div>

      {isOwner && (
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate(`/blogs/edit/${blog.id}`)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          >
            Edit Blog
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Delete Blog
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;