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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
