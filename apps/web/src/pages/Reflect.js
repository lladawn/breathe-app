import React, { useState, useEffect, useRef } from "react";
import {
  callOpenAI,
  generateHighlight,
  generateDetailedSummary,
} from "../functions/openai.js";
import LottieAnimation from "../components/LottieAnimation.js";
import reflect from "../assets/animations/reflect.json";
import reflecting from "../assets/animations/reflect.json";
import { ReflectHeading } from "../components/ReflectHeading.js";
import { useNavigate } from "react-router-dom";

const ReflectChatPage = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("breatheChatHistory")) || [
        {
          role: "assistant",
          content: "Let's open up...",
        },
      ]
    );
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasStarted, setHasStarted] = useState(messages.length > 1);
  const endRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("breatheChatHistory", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");
    setLoading(true);
    setHasStarted(true);

    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    const systemPrompt = {
      role: "system",
      content:
        "You are a warm and kind, emotionally intelligent guide. Reply in under 100 words.",
    };

    const finalMessages = [systemPrompt, ...newMessages.slice(-4)];

    const aiText = await callOpenAI(finalMessages);
    const updatedMessages = [
      ...newMessages,
      { role: "assistant", content: aiText },
    ];
    setMessages(updatedMessages);
    setLoading(false);
  };

  const handleStartFresh = () => {
    const freshStart = [
      {
        role: "assistant",
        content: "Let's open up...",
      },
    ];
    setMessages(freshStart);
    setHasStarted(false);
    setInput("");
    localStorage.setItem("breatheChatHistory", JSON.stringify(freshStart));
  };

  const handleSaveReflection = async () => {
    setSaving(true);
    const convoMessages = messages.filter((m) => m.role === "user");

    const highlight = await generateHighlight(convoMessages);
    const aiSummary = await generateDetailedSummary(convoMessages);

    const newSummary = {
      date: new Date().toISOString(),
      highlight,
      aiSummary,
    };

    const stored = JSON.parse(localStorage.getItem("breatheArchive")) || [];
    const updated = [newSummary, ...stored];
    localStorage.setItem("breatheArchive", JSON.stringify(updated));

    alert(
      "Your reflection is safely held 🌿 You’ll find it resting in the archive."
    );
    setSaving(false);
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto px-2">
      {/* Top Buttons */}
      <div className="flex flex-col justify-between items-center mb-4 flex-wrap gap-4">
        <ReflectHeading />
        {hasStarted && (
          <div className="flex gap-2">
            <button
              onClick={handleSaveReflection}
              disabled={saving}
              className={`px-4 py-1 text-sm rounded-full border border-[#ddd] bg-white text-gray-600 hover:bg-[#f9f7f3] shadow-sm transition ${
                saving ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {saving ? "Saving..." : "🌿 Save Reflection"}
            </button>
            <button
              onClick={handleStartFresh}
              className="px-4 py-1 text-sm rounded-full border border-[#ddd] bg-white text-gray-600 hover:bg-[#f9f7f3] shadow-sm transition"
            >
              ✨ Start Fresh
            </button>
          </div>
        )}
      </div>

      {/* Conditional Content */}
      {hasStarted ? (
        <>
          {/* Chat Container */}
          <div className="flex-1 flex flex-col border rounded-lg bg-white shadow-sm overflow-hidden">
            {/* Scrollable Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[45vh]">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-[#ece8e1] ml-auto text-right"
                      : "bg-white text-left"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {loading && (
                <div className="text-sm text-gray-400 italic">
                  AI is reflecting…
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input Field */}
            <div className="flex gap-2 border-t p-4 bg-[#f9f7f3]">
              <input
                type="text"
                placeholder="Keep sharing here, softly..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                className="flex-1 border px-4 py-2 rounded"
              />
              <button
                onClick={handleSend}
                className="bg-[#ece8e1] px-4 py-2 rounded shadow-sm hover:shadow"
              >
                Reflect
              </button>
              <LottieAnimation animation={reflecting} opacity={0.2} scale={1} />
            </div>
          </div>
        </>
      ) : (
        // Welcome Section
        <div className="flex-1 flex flex-col items-center justify-center space-y-6 py-8">
          <div className="text-center text-gray-600 italic text-lg max-w-md">
            Let's open up...
          </div>
          <div className="w-full max-w-md flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Share your first thought..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              className="flex-1 border px-4 py-2 rounded text-base focus:outline-none focus:ring-2 focus:ring-[#d4cec5] transition"
            />
            <button
              onClick={handleSend}
              className="bg-[#ece8e1] px-4 py-2 rounded shadow-sm hover:shadow text-base transition"
            >
              Reflect
            </button>
          </div>
          <LottieAnimation animation={reflect} opacity={0.3} />
        </div>
      )}

      {/* Back to Storybook Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate("/storybook")}
          className="bg-[#f1ece4] hover:bg-[#e7e2db] text-[#3c3a37] font-medium px-6 py-2 rounded-md transition shadow-sm hover:shadow-md"
        >
          👈 Take me back to the story
        </button>
      </div>
    </div>
  );
};

export default ReflectChatPage;
