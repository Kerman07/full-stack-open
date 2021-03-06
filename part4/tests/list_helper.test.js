const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list should be zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(36);
  });
});

describe("most liked blog tests", () => {
  const mostLiked = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  };

  test("most liked of empty blog list returns null", () => {
    expect(listHelper.favoriteBlog([])).toEqual(null);
  });

  test("most liked of one blog returns that blog", () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(
      listWithOneBlog[0]
    );
  });

  test("most liked of many blogs is returned correctly", () => {
    expect(listHelper.favoriteBlog(listWithManyBlogs)).toEqual(mostLiked);
  });
});

describe("author with most blogs tests", () => {
  test("most blogs author of empty blog list returns null", () => {
    expect(listHelper.mostBlogs([])).toEqual(null);
  });

  test("most blogs author of one blog returns that author", () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
      author: listWithOneBlog[0].author,
      blogs: 1,
    });
  });

  test("most blogs author of many blogs is returned correctly", () => {
    expect(listHelper.mostBlogs(listWithManyBlogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("author with most likes tests", () => {
  test("most liked author of empty blog list returns null", () => {
    expect(listHelper.mostLiked([])).toEqual(null);
  });

  test("most liked author of one blog returns that author", () => {
    expect(listHelper.mostLiked(listWithOneBlog)).toEqual({
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    });
  });

  test("most liked author of many blogs is returned correctly", () => {
    expect(listHelper.mostLiked(listWithManyBlogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
