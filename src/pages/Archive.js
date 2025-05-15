import React, { useEffect, useState } from "react";
import LottieAnimation from "../components/LottieAnimation";
import reflect from "../assets/animations/breathe.json";

const ArchivePage = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("breatheArchive")) || [];
    setEntries(stored);
  }, []);

  const exportEntry = (entry) => {
    const content = `Date: ${new Date(entry.date).toLocaleString()}
  \n ${entry.highlight}
  \n ${entry.aiSummary}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `breathe-reflection-${new Date(
      entry.date
    ).toISOString()}.txt`;
    link.click();
  };

  const deleteEntry = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
    localStorage.setItem("breatheArchive", JSON.stringify(updated));
  };

  const clearArchive = () => {
    if (window.confirm("Are you sure you want to clear your archive?")) {
      localStorage.removeItem("breatheArchive");
      setEntries([]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex-1">
      <LottieAnimation animation={reflect} opacity={0.3} scale={1.5} />
      <h2 className="text-3xl font-serif font-semibold mb-6 text-center">
        Your Reflections
      </h2>

      {entries.length === 0 ? (
        <p className="text-center text-gray-500">No saved reflections yet.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {entries.map((entry, idx) => (
              <li
                key={idx}
                className="bg-white border border-gray-200 rounded-lg shadow p-4"
              >
                <p className="text-sm text-gray-500 mb-1">
                  {new Date(entry.date).toLocaleString()}
                </p>
                <p className="text-gray-800 mb-2">{entry.highlight}</p>
                <p className="text-gray-700 whitespace-pre-line">
                  {entry.aiSummary}
                </p>
                <div className="mt-3 flex justify-between text-sm">
                  <button
                    onClick={() => exportEntry(entry)}
                    className="text-blue-600 hover:underline"
                  >
                    📤 Export
                  </button>
                  <button
                    onClick={() => deleteEntry(idx)}
                    className="text-red-500 hover:underline"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-center mt-8">
            <button
              onClick={clearArchive}
              className="text-sm text-red-500 hover:underline"
            >
              Clear All
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ArchivePage;
