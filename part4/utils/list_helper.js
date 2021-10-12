const _ = require("lodash/collection");

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  let grouped = _.countBy(blogs, "author");
  let group_array = Object.keys(grouped).map((key) => [key, grouped[key]]);
  group_array.sort((a, b) => b[1] - a[1]);
  return { author: group_array[0][0], blogs: group_array[0][1] };
};

const mostLiked = (blogs) => {
  if (blogs.length === 0) return null;
  let grouped = _.groupBy(blogs, "author");
  let authorsWithLikes = [];
  for (const author in grouped) {
    authorsWithLikes.push([
      author,
      grouped[author].reduce((suma, cur) => suma + cur.likes, 0),
    ]);
  }
  authorsWithLikes.sort((a, b) => b[1] - a[1]);
  return { author: authorsWithLikes[0][0], likes: authorsWithLikes[0][1] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLiked };
