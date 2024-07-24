const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const emptyBlogList = [];

const listWithOneBlog = [
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
  },
];

const blogs = [
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
test("dummy function returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("Total Likes", () => {
  test("returns zero for an empty list", () => {
    const result = listHelper.totalLikes(emptyBlogList);
    assert.strictEqual(result, 0);
  });

  test("returns the likes of a single blog when list has only one blog", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("calculates the total likes correctly for a larger list", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36);
  });
});

describe("Favorite Blog", () => {
  test("returns null for an empty list", () => {
    const answer = null;
    const result = listHelper.favouriteBlog(emptyBlogList);
    assert.deepStrictEqual(answer, result);
  });

  test("returns the only blog when list has only one blog", () => {
    const answer = {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
    };
    const result = listHelper.favouriteBlog(listWithOneBlog);
    assert.deepStrictEqual(answer, result);
  });

  test("returns the blog with most likes from a larger list", () => {
    const answer = {
      id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    };
    const result = listHelper.favouriteBlog(blogs);
    assert.deepStrictEqual(answer, result);
  });
});

describe("Most frequient author", () => {
  test("Most Blogs", () => {
    const answer = { author: "Robert C. Martin", blogs: 3 };
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(answer, result);
  });
  test("Most Likes", () => {
    const answer = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(answer, result);
  });
});
