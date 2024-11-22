import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";
import { useMemo, useCallback } from "react";

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector((state) => state);
  const dispatch = useDispatch();

  // Memoize filtered anecdotes to prevent recalculation on every render
  const filteredAnecdotes = useMemo(() => {
    if (filter === "") return anecdotes;
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [anecdotes, filter]);

  // Memoize the vote function to avoid re-creating it on every render
  const vote = useCallback(
    (id) => {
      const anecdote = anecdotes.find((a) => a.id === id);
      dispatch(addVote(id));
      dispatch(displayNotification(`you voted '${anecdote.content}' !`, 5));
    },
    [dispatch, anecdotes],
  );

  return (
    <div>
      {[...filteredAnecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
