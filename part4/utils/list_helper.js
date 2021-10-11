const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (suma, cur) => suma + cur.likes;
  return blogs.reduce(reducer, 0);
};

module.exports = { dummy, totalLikes };
