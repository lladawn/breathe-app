// Clean version with Tailwind-only classes and working background animation
import { useState } from "react";

export const PeerConnectionRoom = ({
  setMoments,
  setActivePage,
  setChatPartner,
}) => {
  const [walkRequested, setWalkRequested] = useState(null);
  const [acceptedWalks, setAcceptedWalks] = useState([]);

  const sampleCards = [
    {
      id: 1,
      alias: "Quiet Lantern",
      reflection: "I’m learning to be okay with slow days.",
      feeling: "Soft fatigue",
    },
    {
      id: 2,
      alias: "Willow Wind",
      reflection: "I wish I knew how to stop overthinking.",
      feeling: "Wistful",
    },
    {
      id: 3,
      alias: "Threadwalker",
      reflection: "Some days I just miss someone I never got closure with.",
      feeling: "Tender ache",
    },
  ];

  const handleReaction = (card, type) => {
    setMoments((prev) => [
      ...prev,
      { type, alias: card.alias, text: card.reflection },
    ]);
    if (type === "walk") {
      setWalkRequested(card.id);
      setTimeout(() => {
        setAcceptedWalks((prev) => [...prev, card.id]);
        setChatPartner(card.alias);
        setActivePage("private-chat");
      }, 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f4f1eb] via-[#f0ede7] to-[#f9f7f3] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#ffffff40,transparent_70%)] bg-no-repeat bg-cover animate-cloud-float opacity-60 blur-2xl pointer-events-none" />
      <div className="relative z-10 p-10 max-w-4xl mx-auto animate-fade-in">
        <h2 className="text-3xl font-serif font-semibold mb-6 text-center">
          Peer Connection Room
        </h2>
        <p className="text-center text-gray-600 italic mb-8">
          These are reflections from others feeling something like you. Choose
          with kindness.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {sampleCards.map((card) => (
            <div
              key={card.id}
              className="bg-white border rounded-xl p-5 shadow-sm transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-md space-y-3"
            >
              <p className="text-gray-700 italic">“{card.reflection}”</p>
              <div className="text-sm text-gray-500">
                — {card.alias} · feeling: {card.feeling}
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleReaction(card, "relate")}
                  className="text-sm bg-gray-100 hover:bg-gray-200 rounded px-3 py-1 transition transform hover:scale-105"
                >
                  ✨ Relate
                </button>
                <button
                  onClick={() => handleReaction(card, "warmth")}
                  className="text-sm bg-gray-100 hover:bg-green-100 rounded px-3 py-1 transition transform hover:scale-105"
                >
                  🌿 Send Warmth
                </button>
                <button
                  onClick={() => handleReaction(card, "walk")}
                  className="text-sm bg-[#ece8e1] hover:bg-[#e4e0d6] rounded px-3 py-1 transition transform hover:scale-105 focus:ring-2 focus:ring-yellow-200"
                >
                  🤝 Walk Together
                </button>
              </div>
              {walkRequested === card.id &&
                !acceptedWalks.includes(card.id) && (
                  <div className="text-sm text-green-700 mt-2">
                    Waiting to see if they feel the same... 🌱
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* CSS to be added to your global stylesheet:
@keyframes cloud-float {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-cloud-float {
  background-size: 200% 200%;
  animation: cloud-float 40s ease-in-out infinite;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.6s ease-out both;
}
*/
