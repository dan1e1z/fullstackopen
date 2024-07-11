import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ stats }) => {
  return (
    <>
      {stats[3] > 0 ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={stats[0]} />
            <StatisticLine text="neutral" value={stats[1]} />
            <StatisticLine text="bad" value={stats[2]} />
            <StatisticLine text="all" value={stats[3]} />
            <StatisticLine text="average" value={stats[4]} />
            <StatisticLine text="positive" value={stats[5]} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = all ? (good * 1 + neutral * 0 + bad * -1) / all : 0;
  const positive = all ? `${(good / all) * 100} %` : "0 %";

  const stats = [good, neutral, bad, all, average, positive];

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics stats={stats} />
    </div>
  );
};

export default App;
