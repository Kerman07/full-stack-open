import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

let config = {
  headers: {
    Authorization: token,
  },
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  config["headers"]["Authorization"] = token;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const updateLikes = async (blogObject) => {
  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    { ...blogObject, likes: blogObject.likes + 1, user: blogObject.user._id },
    config
  );
  return response.data;
};

const remove = async (blogObject) => {
  await axios.delete(`${baseUrl}/${blogObject.id}`, config);
};

const blogService = { create, getAll, setToken, updateLikes, remove };
export default blogService;
