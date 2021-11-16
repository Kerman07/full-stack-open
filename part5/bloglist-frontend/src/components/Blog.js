import React, { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div style={blogStyle} className="blog">
      <div className="title-author">
        {blog.title} {blog.author}{" "}
      </div>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      <div style={showWhenVisible} className="blog-detail">
        <div className="url">{blog.url}</div>
        <div className="likes">
          likes {blog.likes}{" "}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>{blog.user.username}</div>
        {blog.user.username === user.username && (
          <div>
            <button onClick={() => handleDelete(blog)}>remove</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
