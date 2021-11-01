import React, { useState } from "react";

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await createBlog({ title, author, url });
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (e) {}
  };

  return (
    <>
      <h2>create new</h2>
      <div>
        title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        ></input>
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
      </div>
      <div>
        url:
        <input
          type="text"
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
