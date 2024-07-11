import { useState } from "react";

const Header = ({ text }) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  console.log(props);
  return (
    <>
      <p>
        {props.text}
        {props.state}
      </p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      {!isNaN(average) ? (
        <>
          <Statistics text="good " state={good} />
          <Statistics text="neutral " state={neutral} />
          <Statistics text="bad " state={bad} />
          <Statistics text="all " state={all} />
          <Statistics text="average " state={average} />
          <Statistics text="positive " state={positive} />
        </>
      ) : (
        <>
          <p>No feedback given</p>
        </>
      )}
    </div>
  );
};

export default App;
