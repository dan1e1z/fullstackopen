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

const Statistics = ({ stats }) => {
  return (
    <div>
      {stats[3] > 0 ? (
        <>
          <StatisticLine text="good " value={stats[0]} />
          <StatisticLine text="neutral " value={stats[1]} />
          <StatisticLine text="bad " value={stats[2]} />
          <StatisticLine text="all " value={stats[3]} />
          <StatisticLine text="average " value={stats[4]} />
          <StatisticLine text="positive " value={stats[5]} />
        </>
      ) : (
        <>
          <p>No feedback given</p>
        </>
      )}
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  // console.log(props);
  return (
    <>
      <p>
        {text}
        {value}
      </p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own value
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = all ? `${(good / all) * 100} %` : "0 %";

  const stats = [good, neutral, bad, all, average, positive];

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics stats={stats} />
    </div>
  );
};

export default App;
