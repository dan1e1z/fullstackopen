import { useState, useEffect } from "react";
import { DiaryEntry, Visibility, Weather } from "./types";
import DiaryEnteries from "./components/DiaryEnteries";
import Notification from "./components/Notification";
import { getAllDiaries, createDiary } from "./diaryService";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<Visibility | "">("");
  const [weather, setWeather] = useState<Weather | "">("");
  const [comment, setComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!date || !visibility || !weather || !comment) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const newDiary = {
      date,
      visibility,
      weather,
      comment,
    };

    console.log("Sending the following data:", newDiary);

    try {
      const data = await createDiary(newDiary);
      setDiaries((prevDiaries) => [...prevDiaries, data]);
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
      setErrorMessage("");
    } catch (error) {
      console.error("Error creating diary:", error);
      setErrorMessage("Failed to create the diary entry. Please try again.");
    }
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <Notification message={errorMessage} />
      <form onSubmit={diaryCreation}>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label>Visibility</label>
          {Object.values(Visibility).map((vis) => (
            <div key={vis}>
              <label>
                <input
                  type="radio"
                  value={vis}
                  checked={visibility === vis}
                  onChange={() => setVisibility(vis)}
                />
                {vis}
              </label>
            </div>
          ))}
        </div>

        <div>
          <label>Weather</label>
          {Object.values(Weather).map((w) => (
            <div key={w}>
              <label>
                <input
                  type="radio"
                  value={w}
                  checked={weather === w}
                  onChange={() => setWeather(w)}
                />
                {w}
              </label>
            </div>
          ))}
        </div>

        <div>
          <label>Comment</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button type="submit">Add</button>
      </form>

      <DiaryEnteries entries={diaries} />
    </div>
  );
}

export default App;
