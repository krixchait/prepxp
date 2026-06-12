import { useState } from "react";
import axios from "axios";
import ProfileCard from "./components/profileCard.jsx";
import TopicCard from "./components/TopicCard";
import DifficultyCard from "./components/DifficultyCard";
import AnalysisCard from "./components/AnalysisCard.jsx";

function App() {

  const [handle, setHandle] = useState("");
  const [report, setReport] = useState(null);
  const [analysis, setAnalysis] = useState("");

  async function analyzeProfile() {

    const response = await axios.get(
      `http://127.0.0.1:8000/codeforces/${handle}/report`
    );

    setReport(response.data)

    const analysisResponse = await axios.get(
      `http://127.0.0.1:8000/codeforces/${handle}/analysis`
    );

    setAnalysis(analysisResponse.data.analysis);

  }

  
  console.log(report)

  return (
    <div>

      <h1>PrepXP</h1>

      <input
        type="text"
        placeholder="Enter Handle"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />

      <button onClick={analyzeProfile}>
        Analyze
      </button>

      {report && (
        <ProfileCard
          profile={report.summary.profile}
        />
      )}

      {report && (
        <TopicCard
          topics={report.topics}
        />
      )}

      {report && (
        <DifficultyCard
            difficulty={report.difficulty}
        />
      )}      

      {analysis && (
          <AnalysisCard
              analysis={analysis}
          />
      )}

    </div>
  );
}

export default App;