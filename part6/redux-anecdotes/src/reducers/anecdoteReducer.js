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
  return {
    type: "VOTE",
    data: { id },
  };
};

export const initializeAnecdotes = (data) => {
  return {
    type: "INIT_ANECDOTES",
    data,
  };
};

export const createAnecdote = (data) => {
  return {
    type: "NEW_ANECDOTE",
    data,
  };
};

export default anecdoteReducer;
