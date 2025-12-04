import React, { useState, useEffect, useContext } from "react";
import { api } from "../../utils/fetchWrapper";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/authcontext";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { isLoggedin } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [tagsList, setTagsList] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);
  const [tagSearch, setTagSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!isLoggedin) navigate("/blogs");
    fetchMeta();
  }, []);

  const fetchMeta = async () => {
    const c = await api.get("/category/allCategories");
    const t = await api.get("/tags/allTags");
    
    if (c.Code === 200) setCategories(c.data);
    if (t.Code === 200) setTagsList(t.data);
  };

  const handleTagClick = (tag) => {
    if (!selectedTags.includes(tag.id)) {
      setSelectedTags([...selectedTags, tag.id]);
    }
  };

  const removeTag = (id) => {
    setSelectedTags(selectedTags.filter((t) => t !== id));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content || !form.categoryId) {
      alert("Please fill all required fields");
      return;
    }

    const fd = new FormData();

    fd.append("title", form.title);
    fd.append("content", form.content);
    fd.append("CategoryId", form.categoryId);

    selectedTags.forEach((tagId) => {
      fd.append("tags", tagId);
    });

    if (imageFile) {
      fd.append("images", imageFile);
    }

    const res = await api.post("/blogs/createBlog", fd);

    if (res.Code === 200) {
      alert("Blog created successfully");

      setTimeout(() => {
      navigate(`/blog/${res.data.id}`);        
      },2000);
    } else {
      alert("Failed to create blog");
    }
  };

  const filteredTags = tagsList.filter((t) =>
    t.name.toLowerCase().includes(tagSearch.toLowerCase())
  );

  return (
    <div className="p-8  bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">

      <h1 className="text-3xl font-bold mb-6">Create Blog</h1>

      <label className="block mb-2">Title</label>
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 mb-4"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <label className="block mb-2">Content</label>
      <textarea
        rows="6"
        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 mb-4"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />

      <label className="block mb-2">Image</label>
      <input
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      <label className="block mb-2">Category</label>
      <select
        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 mb-4"
        value={form.categoryId}
        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <label className="block mb-2">Tags</label>

      <div className="flex flex-wrap gap-2 mb-3">
        {selectedTags.map((id) => {
          const tag = tagsList.find((t) => t.id === id);
          return (
            <span
              key={id}
              className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2"
            >
              {tag?.name}
              <button
                onClick={() => removeTag(id)}
                className="text-white text-sm"
              >
                ✕
              </button>
            </span>
          );
        })}
      </div>

      <input
        type="text"
        placeholder="Search tags..."
        className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700"
        value={tagSearch}
        onChange={(e) => setTagSearch(e.target.value)}
      />

      <div className="max-h-40 overflow-y-auto border dark:border-gray-700 rounded mb-4 p-2 bg-gray-100 dark:bg-gray-800">
        {filteredTags.length === 0 ? (
          <p className="text-gray-500 text-sm">No tags found</p>
        ) : (
          filteredTags.map((tag) => (
            <div
              key={tag.id}
              onClick={() => handleTagClick(tag)}
              className="p-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              {tag.name}
            </div>
          ))
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create Blog
      </button>
    </div>
  );
};

export default CreateBlog;
