const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const assert = require("node:assert");
const Blog = require("../models/blog");

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

beforeEach(async () => {
  await Blog.deleteMany({});
  await Promise.all(
    initialBlogs.map(async (blogData) => {
      const blogObject = new Blog(blogData);
      await blogObject.save();
    }),
  );
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
test("there are two notes", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;

  blogs.forEach((blog) => {
    assert(blog.id !== undefined, "Blog should have an id property");
    assert(blog._id === undefined, "Blog should not have an _id property");
  });
});

test("a valid blog can be added", async () => {
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
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const blogs = response.body;

  assert.strictEqual(blogs.length, initialBlogs.length + 1);
  const titles = blogs.map((blog) => blog.title);
  assert(titles.includes(newBlog.title), "New Blog");
});

test("if the likes property is missing, it will default to 0", async () => {
  const newBlog = {
    title: "New Blog Title",
    author: "New Blog Author",
    url: "URL",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const blogs = response.body;

  const addedBlog = blogs.find((blog) => blog.title === "New Blog Title");
  // const blogsAtEnd = await helper.blogsInDb();
  // const addedBlog = blogsAtEnd.find((blog) => blog.title === "New Blog Title");
  assert.strictEqual(
    addedBlog.likes,
    0,
    "The likes property should default to 0",
  );
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "New Blog Author",
    url: "URL",
    likes: 5,
  };
  const response = await api.post("/api/blogs").send(newBlog).expect(400);

  assert.strictEqual(
    response.body.error,
    "Blog validation failed: title: Path `title` is required.",
  );
});

test("blog without url is not added", async () => {
  const newBlog = {
    title: "New Blog Title",
    author: "New Blog Author",
    likes: 5,
  };

  const response = await api.post("/api/blogs").send(newBlog).expect(400);

  assert.strictEqual(
    response.body.error,
    "Blog validation failed: url: Path `url` is required.",
  );
});

test("deleting a single blog post", async () => {
  // Get all blogs
  let response = await api.get("/api/blogs");
  // console.log("response body", response.body);
  const blogsAtStart = response.body;
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
});

test("updating the likes of a single blog post", async () => {
  // Get all blogs
  let response = await api.get("/api/blogs");
  // console.log("response body", response.body);
  const blogs = response.body;
  const blogToUpdate = blogs[0];

  // Prepare updated blog data
  const updatedBlogData = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 1,
  };

  // Send PUT request to update the blog
  response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlogData)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

after(async () => {
  await mongoose.connection.close();
});
