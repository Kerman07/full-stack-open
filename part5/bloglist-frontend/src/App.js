import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import NewBlogForm from "./components/NewBlogForm";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(["", ""]);

  const blogFormRef = useRef();

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
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      setUser(user);
    } catch (exception) {
      setNotification(["wrong username or password", "failure"]);
      setTimeout(() => {
        setNotification(["", ""]);
      }, 6000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const createBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token);
      const result = await blogService.create(blogObject);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(result));
      setNotification([
        `a new blog ${result.title} by ${result.author} added`,
        "success",
      ]);
      setTimeout(() => {
        setNotification(["", ""]);
      }, 6000);
    } catch (exception) {
      setNotification(["title and url are required", "failure"]);
      setTimeout(() => {
        setNotification(["", ""]);
      }, 6000);
    }
  };

  const handleLike = async (blogObject) => {
    const returned = await blogService.updateLikes(blogObject);
    setBlogs(blogs.map((blog) => (blog.id === returned.id ? returned : blog)));
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <Notification notification={notification} />
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
      <Notification notification={notification} />
      <p>
        {user.name} logged in <LogoutForm handleLogout={handleLogout} />
      </p>
      <Togglable ref={blogFormRef}>
        <NewBlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      ))}
    </div>
  );
};

export default App;
