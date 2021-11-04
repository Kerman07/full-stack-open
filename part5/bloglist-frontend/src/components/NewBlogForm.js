import React, { useState } from "react";

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = (event) => {
    event.preventDefault();
    try {
      createBlog({ title, author, url });
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch {}
  };

  return (
    <>
      <h2>create new</h2>
      <div>
        title:
        <input
          type="text"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        ></input>
      </div>
      <div>
        author:
        <input
          type="text"
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
      </div>
      <div>
        url:
        <input
          type="text"
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        ></input>
      </div>
      <button type="submit" onClick={handleCreate}>
        Create
      </button>
    </>
  );
};

export default NewBlogForm;
