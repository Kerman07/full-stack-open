import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const newAnecdote = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const newVote = async (id) => {
  const objectToModify = await axios.get(`${baseUrl}/${id}`);
  const modified = { ...objectToModify.data, votes: objectToModify.data.votes + 1 };
  const anecdote = await axios.put(`${baseUrl}/${id}`, modified);
  return anecdote.data;
};

const anecdoteService = { getAnecdotes, newAnecdote, newVote };
export default anecdoteService;
