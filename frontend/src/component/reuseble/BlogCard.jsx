import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  // Preview first 150 characters
  const preview =
    blog.content.length > 150
      ? blog.content.slice(0, 150) + "..."
      : blog.content;

  return (
    <Link to={`/blog/${blog.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 transition-none cursor-pointer">

        {/* Image */}
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-36 object-cover rounded-md mb-3"
          />
        )}

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
          {blog.title}
        </h2>

        {/* Preview Content */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {preview}
        </p>

        {/* Category */}
        <div className="mt-2">
          <span
            className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 
                       text-blue-700 dark:text-blue-200 rounded"
          >
            {blog.Category?.name}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {blog.tags?.map((tag) => (
            <span
              key={tag.id}
              className="text-[10px] bg-gray-200 dark:bg-gray-700 
                         text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
          <span>By {blog.author?.name}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;