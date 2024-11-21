import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageType, setErrorMessageType] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setErrorMessageType("error");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const createBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(createdBlog));
      setErrorMessage(
        `A new blog "${createdBlog.title}" by ${createdBlog.author} added`,
      );
      setErrorMessageType("success");
      setTimeout(() => setErrorMessage(null), 5000);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      setErrorMessage(error.response.data.error || "Failed to create blog");
      setErrorMessageType("error");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      await blogService.update(blogObject.id, blogObject);
      setBlogs((blogs) =>
        blogs.map((blog) => (blog.id === blogObject.id ? blogObject : blog)),
      );
    } catch (error) {
      setMessage(error.response.data.error);
      setMessageType("error");
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const removeBlog = async (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id);

    if (
      !window.confirm(
        `Remove Blog: ${blogToRemove.title} by ${blogToRemove.author}?`,
      )
    ) {
      return;
    }
    try {
      await blogService.remove(id);
      setBlogs((blogs) => blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      setMessage(error.response.data.error);
      setMessageType("error");
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const LogoutButton = () => <button onClick={handleLogout}>Logout</button>;

  const Notification = ({ message, className }) => {
    if (!message) return null;
    return <div className={className}>{message}</div>;
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} className={errorMessageType} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in <LogoutButton />
          </p>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
