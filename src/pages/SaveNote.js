// src/pages/SaveNotePage.js
import React, { useState, useEffect } from "react";
import LottieAnimation from "../components/LottieAnimation";
import savenote from "../assets/animations/laying.json";

const SaveNotePage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("breatheNotes")) || [];
  });

  useEffect(() => {
    localStorage.setItem("breatheNotes", JSON.stringify(notes));
  }, [notes]);

  const handleSave = () => {
    if (!body.trim()) return;
    const newNote = {
      date: new Date().toISOString(),
      title: title.trim(),
      body: body.trim(),
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setBody("");
    alert("🌱 Thought saved into your gentle archive.");
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this note?")) {
      const updated = [...notes];
      updated.splice(index, 1);
      setNotes(updated);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <LottieAnimation animation={savenote} scale={1.5} opacity={0.3} />
      <h2 className="text-2xl font-serif mb-6 text-center text-[#3c3a37]">
        Save a Note
        <p className="text-sm text-[#7c766f] italic mt-1">
          Sometimes a single thought is enough.
        </p>
      </h2>

      <div className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Optional title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          placeholder="Write your thought here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border px-4 py-2 rounded min-h-[100px]"
        />
        <button
          onClick={handleSave}
          className="bg-[#ece8e1] px-4 py-2 rounded shadow-sm hover:shadow"
        >
          Save Note
        </button>
      </div>

      <h3 className="text-lg font-medium text-[#5e5a55] mb-3">Your Notes</h3>
      <ul className="space-y-4">
        {notes.map((note, idx) => (
          <li
            key={idx}
            className="bg-white border border-gray-200 rounded-lg shadow p-4 relative"
          >
            <p className="text-xs text-gray-400 mb-1">
              {new Date(note.date).toLocaleString()}
            </p>
            {note.title && (
              <p className="text-lg font-semibold text-[#3c3a37]">
                {note.title}
              </p>
            )}
            <p className="text-[#5e5a55] whitespace-pre-wrap mt-1">
              {note.body}
            </p>
            <button
              onClick={() => handleDelete(idx)}
              className="absolute top-2 right-3 text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaveNotePage;
