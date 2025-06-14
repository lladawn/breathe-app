import React, { useState, useEffect, useRef } from "react";
import {
  callOpenAI,
  generateHighlight,
  generateDetailedSummary,
  generateMetadataFromReflection,
} from "../functions/openai.js";
import LottieAnimation from "../components/LottieAnimation.js";
import reflect from "../assets/animations/reflect.json";
import reflecting from "../assets/animations/reflect.json";
import { ReflectHeading } from "../components/ReflectHeading";
import { useNavigate } from "react-router-dom";
import { createReflection } from "../functions/api";
import ShareReflectionModal from "../components/ShareReflectionModal";
import { reflectSystemPrompt } from "../utils/openAiPrompt";
import { trackAction } from "../utils/umami";

const ReflectChatPage = () => {
  const navigate = useNavigate();
  const userId =
    localStorage.getItem("breatheUserId") || /* rare */ "unknown_user";

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
  const [hasTyped, setHasTyped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasStarted, setHasStarted] = useState(messages.length > 1);
  const [showShareModal, setShowShareModal] = useState(false);
  const [reflectionMetadata, setReflectionMetadata] = useState({
    reflection: "",
    alias: "",
    feeling: "",
    tags: [],
  });
  const [loadingMetadata, setLoadingMetadata] = useState(false);
  const [submittingReflection, setSubmittingReflection] = useState(false);

  const endRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("breatheChatHistory", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    trackAction("Reflect - Send to Chat")
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");
    setLoading(true);
    setHasStarted(true);

    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    const systemPrompt = reflectSystemPrompt;

    const finalMessages = [systemPrompt, ...newMessages.slice(-4)];

    const aiText = await callOpenAI(finalMessages);
    if (aiText) trackAction("Reflect - AI Replied")
    const updatedMessages = [
      ...newMessages,
      { role: "assistant", content: aiText },
    ];
    setMessages(updatedMessages);
    setLoading(false);
  };

  const handleStartFresh = () => {
    trackAction("Reflect - Start Fresh")
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
    trackAction("Reflect - Save Reflection")
    setSaving(true);
    const convoMessages = messages.filter((m) => m.role === "user");
    const highlight = await generateHighlight(convoMessages);
    const aiSummary = await generateDetailedSummary(convoMessages);

    if (highlight && aiSummary) trackAction("Reflect - AI Reflection Saved")

    const newSummary = {
      date: new Date().toISOString(),
      highlight,
      aiSummary,
    };

    const stored = JSON.parse(localStorage.getItem("breatheArchive")) || [];
    const updated = [newSummary, ...stored];
    localStorage.setItem("breatheArchive", JSON.stringify(updated));

    // alert(
    //   "Your reflection is safely held 🌿 You’ll find it resting in the archive."
    // );
    setSaving(false);
    navigate("/archive");
  };

  const handleShareWithPeers = async () => {
    trackAction("Reflect - Share with Peers")
    const convoMessages = messages.filter((m) => m.role === "user");
    setShowShareModal(true);
    setLoadingMetadata(true);
    const metadata = await generateMetadataFromReflection(convoMessages);
    trackAction("Reflect - Metadata generated")
    setReflectionMetadata(metadata);
    setLoadingMetadata(false);
    // setShowShareModal(true);
  };

  const handleShareSubmit = async () => {
    trackAction("Reflect - Submit Reflection clicked")
    setSubmittingReflection(true);
    try {
      const { reflection, alias, feeling, tags } = reflectionMetadata;
      const reflectionData = {
        userId,
        alias,
        feeling,
        reflection,
        tags,
      };

      await createReflection(reflectionData);
      trackAction("Reflect - Submit Reflection success")

      // alert("Your reflection has been shared with peers. 🌱");
      setSubmittingReflection(false);
      setShowShareModal(false);
      navigate("/connect?section=your-reflections"); // Navigate to Peer Room -- Your Reflections section
    } catch (error) {
      console.error("Error sharing reflection:", error);
      alert(`Failed to share reflection. Please try again.`);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!hasTyped && value.trim() !== "") {
      trackAction("Reflect - User started typing");
      setHasTyped(true);
    }
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
              className={`px-4 py-1 text-sm rounded-full border border-[#ddd] bg-white text-gray-600 hover:bg-[#f9f7f3] shadow-sm transition ${saving ? "opacity-50 cursor-not-allowed" : ""
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
            <button
              onClick={handleShareWithPeers}
              disabled={loadingMetadata}
              className="px-4 py-1 text-sm rounded-full border border-[#ddd] bg-white text-gray-600 hover:bg-[#f9f7f3] shadow-sm transition"
            >
              {loadingMetadata ? "Loading metadata..." : "🌿 Share with Peers"}
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
                  className={`max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-line ${msg.role === "user"
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
                onChange={(e) => handleInputChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) handleSend();
                }}
                className="flex-1 border px-4 py-2 rounded"
              />
              <button
                onClick={handleSend}
                disabled={loading}
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
              onChange={(e) => handleInputChange(e)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) handleSend();
              }}
              className="flex-1 border px-4 py-2 rounded text-base focus:outline-none focus:ring-2 focus:ring-[#d4cec5] transition"
            />
            <button
              onClick={handleSend}
              disabled={loading}
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
          onClick={() => {
            trackAction("Reflect - Back to Story");
            navigate("/storybook");
          }}
          className="bg-[#f1ece4] hover:bg-[#e7e2db] text-[#3c3a37] font-medium px-6 py-2 rounded-md transition shadow-sm hover:shadow-md"
        >
          👈 Take me back to the story
        </button>
      </div>

      {/* Share Modal */}
      <ShareReflectionModal
        isOpen={showShareModal}
        onClose={() => {
          trackAction("Share with Peers - Cancel");
          setShowShareModal(false)
        }}
        onSubmit={handleShareSubmit}
        submitting={submittingReflection}
        reflectionMetadata={reflectionMetadata}
        setReflectionMetadata={setReflectionMetadata}
        loadingMetadata={loadingMetadata}
      />
    </div>
  );
};

export default ReflectChatPage;
