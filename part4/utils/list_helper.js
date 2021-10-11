const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (suma, cur) => suma + cur.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  blogs.sort((a, b) => b.likes - a.likes);
  return blogs[0];
};

module.exports = { dummy, totalLikes, favoriteBlog };
