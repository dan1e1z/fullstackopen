const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogList) => {
  return blogList.reduce((total, item) => total + item.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
};
