const _ = require("lodash");

const dummy = (blogList) => {
  return 1;
};

const totalLikes = (blogList) => {
  return blogList.reduce((total, item) => total + item.likes, 0);
};

const favouriteBlog = (blogList) => {
  if (blogList.length === 0) {
    return null;
  }

  return blogList.reduce((favourite, current) => {
    return current.likes > favourite.likes ? current : favourite;
  });
};

const mostBlogs = (blogList) => {
  const blogsByAuthor = _.groupBy(blogList, "author");

  // Count the number of blogs per author
  const authorBlogCounts = _.mapValues(blogsByAuthor, (blogs) => blogs.length);

  // Transform the authorBlogCounts object into an array of objects
  const authorsArray = _.map(authorBlogCounts, (count, author) => ({
    author,
    blogs: count,
  }));

  // Find the author with the most blogs
  const topAuthor = _.maxBy(authorsArray, "blogs");

  return topAuthor;
};

const mostLikes = (blogList) => {
  // Group the blogs by author
  const blogsByAuthor = _.groupBy(blogList, "author");

  // Sum the likes for each author
  const authorLikes = _.mapValues(blogsByAuthor, (blogs) =>
    _.sumBy(blogs, "likes"),
  );

  // Transform the authorLikes object into an array of objects
  const authorsArray = _.map(authorLikes, (likes, author) => ({
    author,
    likes,
  }));

  // Find the author with the most likes
  const topAuthor = _.maxBy(authorsArray, "likes");

  return topAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
