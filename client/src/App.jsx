import { useState } from "react";
import axios from "axios";

function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/analyze", {
        jobDescription,
        skills,
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">AI Skill Gap Analyzer</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="space-y-4">
          <textarea
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:outline-none"
            placeholder="Paste Job Description..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <textarea
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:outline-none"
            placeholder="Your Skills..."
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <button
            onClick={handleAnalyze}
            className="bg-white text-black px-5 py-2 rounded hover:opacity-80 transition"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {/* RIGHT */}
        <div>
          {result ? (
            <div className="space-y-6">
              <h2 className="text-2xl">
                Match Score:{" "}
                <span className="font-bold text-green-400">
                  {result.match_score}%
                </span>
              </h2>

              <div>
                <h3 className="font-semibold text-lg mb-1">Required Skills</h3>
                <ul className="list-disc ml-5 text-gray-300">
                  {result.required_skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-red-400 mb-1">
                  Missing Skills
                </h3>
                <ul className="list-disc ml-5">
                  {result.missing_skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-1">Learning Plan</h3>
                <ul className="list-disc ml-5 text-gray-300">
                  {result.learning_plan.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              Results will appear here after analysis.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
