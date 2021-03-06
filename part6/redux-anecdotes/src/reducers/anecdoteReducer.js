import anecdoteService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE": {
      const id = action.data.id;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((a) => (a.id === id ? changedAnecdote : a));
    }
    case "INIT_ANECDOTES":
      return action.data;
    case "NEW_ANECDOTE": {
      return [...state, action.data];
    }
    default:
      return state;
  }
};

export const castVote = (id) => {
  return async (dispatch) => {
    const voted = await anecdoteService.newVote(id);
    dispatch({
      type: "VOTE",
      data: { id: voted.id },
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAnecdotes();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.newAnecdote(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data,
    });
  };
};

export default anecdoteReducer;
