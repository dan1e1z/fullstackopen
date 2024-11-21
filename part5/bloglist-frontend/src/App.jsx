import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null, type: "" });
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  // Fetch blogs on mount
  useEffect(() => {
    blogService.getAll().then(setBlogs);
  }, []);

  // Handle login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      showNotification("Login successful", "success");
    } catch (error) {
      showNotification("Wrong username or password", "error");
    }
  };

  // Handle blog creation
  const addBlog = async (event) => {
    event.preventDefault();
    const { title, author, url } = newBlog;

    if (!title || !author || !url) {
      showNotification("All fields are required", "error");
      return;
    }

    try {
      const createdBlog = await blogService.create({ title, author, url });
      setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);
      setNewBlog({ title: "", author: "", url: "" });
      showNotification(`A new blog "${title}" by ${author} added`, "success");
    } catch (error) {
      showNotification(
        error?.response?.data?.error || "An error occurred",
        "error",
      );
    }
  };

  // Handle logout
  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    blogService.setToken(null);
    showNotification("Logged out successfully", "success");
  };

  // Show notification helper
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: "" }), 5000);
  };

  // Controlled input handlers for blog form
  const handleInputChange = ({ target }) => {
    setNewBlog((prev) => ({ ...prev, [target.name]: target.value }));
  };

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      {user ? (
        <LoggedInView
          user={user}
          blogs={blogs}
          handleLogout={handleLogout}
          newBlog={newBlog}
          handleInputChange={handleInputChange}
          addBlog={addBlog}
        />
      ) : (
        <LoginView
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

const Notification = ({ message, type }) => {
  if (!message) return null;
  return <div className={`notification ${type}`}>{message}</div>;
};

const LoginView = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
);

const LoggedInView = ({
  user,
  blogs,
  handleLogout,
  newBlog,
  handleInputChange,
  addBlog,
}) => (
  <div>
    <h2>Blogs</h2>
    <p>
      {user.name} logged in <button onClick={handleLogout}>Logout</button>
    </p>
    <BlogForm
      newBlog={newBlog}
      handleInputChange={handleInputChange}
      addBlog={addBlog}
    />
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

const BlogForm = ({ newBlog, handleInputChange, addBlog }) => (
  <form onSubmit={addBlog}>
    <div>
      Title:
      <input
        type="text"
        name="title"
        value={newBlog.title}
        onChange={handleInputChange}
      />
    </div>
    <div>
      Author:
      <input
        type="text"
        name="author"
        value={newBlog.author}
        onChange={handleInputChange}
      />
    </div>
    <div>
      URL:
      <input
        type="text"
        name="url"
        value={newBlog.url}
        onChange={handleInputChange}
      />
    </div>
    <button type="submit">Create</button>
  </form>
);

export default App;
