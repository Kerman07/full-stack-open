import { useSelector, useDispatch } from "react-redux";
import { castVote } from "../reducers/anecdoteReducer";
import { notifyReset, notifyVote } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    let tmp = state.anecdotes.sort((a, b) => b.votes - a.votes);
    if (state.filter !== "") {
      tmp = tmp.filter((note) => note.content.includes(state.filter));
    }
    return tmp;
  });
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(castVote(id));
    dispatch(notifyVote(content));
    setTimeout(() => dispatch(notifyReset()), 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
