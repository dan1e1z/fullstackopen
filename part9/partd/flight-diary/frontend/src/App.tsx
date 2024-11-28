import { useState, useEffect } from "react";
import axios from "axios";
import { DiaryEntry } from "./types";
import DiaryEnteries from "./components/DiaryEnteries";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then((response) => {
        setDiaries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching diaries:", error);
      });
  }, []);

  console.log(diaries);

  return (
    <div>
      <h1>Add new entry</h1>
      {/* <Notification /> */}
      <div>
        date <input />
      </div>
      <div>
        visibility <input />
      </div>
      <div>
        weather <input />
      </div>
      <div>
        comment <input />
      </div>
      <button type="submit">add</button>
      <DiaryEnteries entries={diaries} />
    </div>
  );
}

export default App;
