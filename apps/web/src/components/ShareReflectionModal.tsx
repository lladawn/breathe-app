import React, { useState, useEffect } from "react";
import { trackAction } from "../utils/umami";

const getRandomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70;
  const lightness = 85;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const ShareReflectionModal = ({
  isOpen,
  onClose,
  onSubmit,
  submitting = false,
  reflectionMetadata,
  setReflectionMetadata,
  loadingMetadata = false
}) => {
  const [newTag, setNewTag] = useState("");
  const [tagColors, setTagColors] = useState({});
  const [hasTypedReflection, setHasTypedReflection] = useState(false);
  const [hasTypedAlias, setHasTypedAlias] = useState(false);
  const [hasTypedFeeling, setHasTypedFeeling] = useState(false);
  const [hasTypedTag, setHasTypedTag] = useState(false);

  useEffect(() => {
    setTagColors((prevColors) => {
      const newColors = { ...prevColors };
      reflectionMetadata.tags.forEach((tag) => {
        if (!newColors[tag]) {
          newColors[tag] = getRandomPastelColor();
        }
      });
      return newColors;
    });
  }, [reflectionMetadata.tags]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg relative max-h-[90vh] overflow-y-auto">
        {loadingMetadata && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 rounded-2xl">
            <div className="text-center flex flex-col items-center justify-items">
              <div className="text-[#5e5a55] text-sm mb-2">Generating metadata from your reflection..  </div>
              <div className="text-[#5e5a55] text-sm mb-2">Please wait...</div>
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#d4cec5] border-opacity-70"></div>
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold mb-4 text-center">
          🌿 Share with Peers
        </h2>

        {/* Reflection Text */}
        <textarea
          value={reflectionMetadata.reflection}
          onChange={(e) => {
            const value = e.target.value;
            setReflectionMetadata((prev) => ({
              ...prev,
              reflection: value,
            }))
            if (!hasTypedReflection && value.trim() !== "") {
              trackAction("Share with Peers: Typing Reflection");
              setHasTypedReflection(true);
            }
          }
          }
          rows={4}
          className="w-full border px-4 py-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#d4cec5]"
          placeholder="Write a note from your reflection or your heart..."
        />

        {/* Alias */}
        <label className="text-sm font-semibold mb-1 block">Alias:</label>
        <input
          type="text"
          value={reflectionMetadata.alias}
          onChange={(e) => {
            const value = e.target.value;
            setReflectionMetadata((prev) => ({
              ...prev,
              alias: value,
            }))
            if (!hasTypedAlias && value.trim() !== "") {
              trackAction("Share with Peers: Typing Alias");
              setHasTypedAlias(true);
            }
          }
          }
          className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#d4cec5]"
          placeholder="Choose an alias that feels right..."
        />

        {/* Feeling */}
        <label className="text-sm font-semibold mb-1 block">Feeling:</label>
        <input
          type="text"
          value={reflectionMetadata.feeling}
          onChange={(e) => {
            const value = e.target.value;
            setReflectionMetadata((prev) => ({
              ...prev,
              feeling: value,
            }))
            if (!hasTypedFeeling && value.trim() !== "") {
              trackAction("Share with Peers: Typing Feeling");
              setHasTypedFeeling(true);
            }
          }
          }
          className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#d4cec5]"
          placeholder="How do you feel in one phrase?"
        />

        {/* Tags */}
        <label className="text-sm font-semibold mb-1 block">Tags:</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {reflectionMetadata.tags.map((tag, idx) => (
            <span
              key={idx}
              style={{
                backgroundColor: tagColors[tag],
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
              className="text-sm text-[#3c3a37] px-3 py-1 rounded-full flex items-center gap-2 transition-colors"
            >
              {tag}
              <button
                onClick={() => {
                  trackAction("Share with Peers - Tag removed")
                  setReflectionMetadata((prev) => ({
                    ...prev,
                    tags: prev.tags.filter((t) => t !== tag),
                  }));
                }}
                className="ml-1 text-[#9a958f] hover:text-[#6e6861] transition-colors"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Tag Input */}
        <input
          type="text"
          value={newTag}
          onChange={(e) => {
            const value = e.target.value;
            setNewTag(value)
            if (!hasTypedTag && value.trim() !== "") {
              trackAction("Share with Peers: Typing Tag");
              setHasTypedTag(true);
            }
          }}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === ",") && newTag.trim() !== "") {
              e.preventDefault();
              setReflectionMetadata((prev) => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()],
              }));
              setNewTag("");
            }
          }}
          className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#d4cec5]"
          placeholder="Add more tags and press Enter or comma"
        />

        {/* Note */}
        <p className="text-sm text-gray-500 italic mb-4">
          Offer a small piece of your reflection, or a gentle note from your
          heart. Let it breathe softly, without trying too hard.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={submitting || loadingMetadata}
            className="px-4 py-2 text-sm rounded bg-[#ece8e1] hover:bg-[#e7e2db] transition"
          >
            {submitting ? "Sharing..." : "Share with Peers"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareReflectionModal;
