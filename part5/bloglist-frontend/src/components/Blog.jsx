import { useState } from "react";
const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlog(updatedBlog);
  };

  return (
    <div style={blogStyle}>
      <div>
        {"Title: "}
        <span data-testid="blog-title">{blog.title}</span>
        {" Author: "}
        <span data-testid="blog-author">{blog.author}</span>
        <br />
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>
      {visible && (
        <div>
          <span data-testid="blog-url">{blog.url}</span> <br />
          <span data-testid="blog-likes">{blog.likes}</span> likes{" "}
          <button onClick={handleLike}>like</button> <br />
          <span data-testid="blog-user-name">{blog.user.name}</span> <br />
          <button onClick={() => removeBlog(blog.id)}>remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
