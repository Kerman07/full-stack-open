import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import NewBlogForm from "./components/NewBlogForm";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = window.localStorage.getItem("loggedUser");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await loginService.login({ username, password });
    if (user) {
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      setUser(user);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const createBlog = async (event) => {
    event.preventDefault();
    blogService.setToken(user.token);
    const result = await blogService.create({ title, author, url });
    blogService.setToken(user.token);
    setTitle("");
    setAuthor("");
    setUrl("");
    setBlogs(blogs.concat(result));
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <LogoutForm handleLogout={handleLogout} />
      </p>
      <h2>create new</h2>
      <NewBlogForm
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        createBlog={createBlog}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
