const { describe, test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const assert = require("node:assert");
const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

describe("Addition of a new blog", () => {
  let headers;
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    // Insert initial blogs
    await Blog.insertMany(initialBlogs);

    // Create a new user
    const newUser = {
      username: "root",
      name: "root",
      password: "password",
    };

    await api.post("/api/users").send(newUser);

    // Log in to get the token
    const result = await api.post("/api/login").send(newUser);

    headers = {
      Authorization: `bearer ${result.body.token}`,
    };

    console.log("Headers set for tests:", headers);
  });
test("a valid blog can be added", async () => {
  console.log("Using headers:", headers);
  const newBlog = {
    title: "New Blog",
    author: "John Doe",
    url: "http://example.com",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .set(headers)
    .expect("Content-Type", /application\/json/);

  // const response = await api.get("/api/blogs");
  // const blogs = response.body;
  //
  // assert.strictEqual(blogs.length, initialBlogs.length + 1);
  // const titles = blogs.map((blog) => blog.title);
  // assert(titles.includes(newBlog.title), "New Blog");
});
});


after(async () => {
  await mongoose.connection.close();
});
