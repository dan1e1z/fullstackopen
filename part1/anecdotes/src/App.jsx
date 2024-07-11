import { useState } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Leaderboard = ({ anecdotes, maxVotes }) => {
  return (
    <div>
      <p>
        {anecdotes[maxVotes[1]]} <br />
        has {maxVotes[0]} votes
      </p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [maxVotes, setMaxVotes] = useState([0, 0]); // (max, index)

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);

    if (newVotes[selected] > maxVotes[0]) {
      setMaxVotes([newVotes[selected], selected]);
    }
  };

  const handleSelected = () => {
    setSelected(getRandomInt(anecdotes.length));
  };

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button text="vote" handleClick={() => handleVote()} />
      <Button text="next anecdote" handleClick={() => handleSelected()} />
      <h1>Anecdote with most votes</h1>
      {maxVotes[0] > 0 && (
        <Leaderboard anecdotes={anecdotes} maxVotes={maxVotes} />
      )}
    </div>
  );
};

export default App;
