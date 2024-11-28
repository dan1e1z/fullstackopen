import { useState, useEffect } from "react";
import { DiaryEntry, Visibility, Weather } from "./types";
import DiaryEnteries from "./components/DiaryEnteries";
import Notification from "./components/Notification";
import { getAllDiaries, createDiary } from "./diaryService";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  console.log(diaries);

  const diaryCreation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newDiary = {
      date,
      visibility: Visibility[visibility as keyof typeof Visibility],
      weather: Weather[weather as keyof typeof Weather],
      comment,
    };

    createDiary(newDiary)
      .then((data: DiaryEntry) => {
        setDiaries((prevDiaries) => [...prevDiaries, data]);
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
        setErrorMessage(""); // Clear error message if creation succeeds
      })
      .catch((error) => {
        console.error("Error creating diary:", error);
        setErrorMessage("Failed to create the diary entry. Please try again.");
      });
  };

  return (
    <div>
      <h1>Add new entry</h1>

      {/* Show error notification if there's an error */}
      <Notification message={errorMessage} />

      <form>
        <div>
          date <input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          visibility{" "}
          <input
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div>
          weather{" "}
          <input value={weather} onChange={(e) => setWeather(e.target.value)} />
        </div>
        <div>
          comment{" "}
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit" onClick={diaryCreation}>
          add
        </button>
      </form>

      <DiaryEnteries entries={diaries} />
    </div>
  );
}

export default App;
