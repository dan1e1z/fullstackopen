const { describe, test, beforeEach, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const assert = require("node:assert");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

let headers;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  // Insert initial blogs
  await Blog.insertMany(helper.initialBlogs);

  // Create a new user
  const newUser = {
    username: "root",
    name: "root",
    password: "password",
  };

  // Update new root user into database
  await api.post("/api/users").send(newUser);

  // Log in to get the token
  const result = await api.post("/api/login").send(newUser);

  headers = {
    Authorization: `Bearer ${result.body.token}`,
  };
  // console.log("headers", headers);
});

test("a valid blog can be added", async () => {
  // console.log("New header", headers);
  const newBlog = {
    title: "New Blog",
    author: "New Author",
    url: "http://example.com",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .set(headers)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const blogs = response.body;
  console.log("blogs", blogs);

  // assert.strictEqual(blogs.length, helper.initialBlogs.length + 1);
  // const titles = blogs.map((blog) => blog.title);
  // assert(titles.includes(newBlog.title), "New Blog");
});

after(async () => {
  await mongoose.connection.close();
});
