import { DiaryEntry } from "../types";

interface DiaryEnteriesProps {
  entries: DiaryEntry[];
}

const DiaryEnteries = ({ entries }: DiaryEnteriesProps) => {
  return (
    <div>
      <h1>Diary Entries</h1>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <p>
              <strong>Date:</strong> {entry.date}
            </p>
            <p>
              <strong>Weather:</strong> {entry.weather}
            </p>
            <p>
              <strong>Visibility:</strong> {entry.visibility}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryEnteries;
