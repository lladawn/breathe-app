// Complete and corrected Breathe app with preserved pages and working private chat flow
import React, { useState, useEffect } from "react";

const pages = [
  { id: "home", label: "Home" },
  { id: "reflect", label: "Reflect" },
  { id: "ai-response", label: "AI Response" },
  { id: "archive", label: "Thread Archive" },
  { id: "peer-room", label: "Peer Connection" },
  { id: "moments", label: "Moments" },
  { id: "private-chat", label: "Private Chat" },
  { id: "volunteer", label: "Volunteer Room" },
];

const BreatheLandingPage = () => (
  <div className="p-10 text-center">
    <h1 className="text-4xl font-serif font-semibold mb-4">Breathe.</h1>
    <p className="text-lg text-[#5e5a55] mb-2">
      A gentle corner of the digital world. For hearts that feel deeply.
    </p>
    <p className="text-base text-[#7c766f] italic">
      A safe digital village for the emotional life.
    </p>
  </div>
);

const ReflectionPage = ({
  userInput,
  setUserInput,
  handleReflect,
  handleSavePrivate,
}) => (
  <div className="p-10 max-w-2xl mx-auto">
    <h2 className="text-3xl font-serif mb-4">Take a breath…</h2>
    <textarea
      placeholder="What’s been building up inside? Type anything that comes."
      className="w-full min-h-[160px] p-4 border border-[#ddd] rounded-lg text-base"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
    />
    <div className="flex justify-between mt-4">
      <button className="text-sm text-gray-600" onClick={handleSavePrivate}>
        Save as private
      </button>
      <button
        onClick={handleReflect}
        className="bg-[#ece8e1] px-4 py-2 rounded text-sm"
      >
        Reflect with AI
      </button>
    </div>
  </div>
);

const AIResponsePage = ({ userInput, setActivePage }) => (
  <div className="p-10 max-w-2xl mx-auto">
    <h2 className="text-3xl font-serif mb-4 text-center">
      Here’s what came back…
    </h2>
    <div className="bg-white p-6 rounded-xl border border-[#eee] shadow-sm">
      <p className="text-gray-700 mb-4 italic">You wrote:</p>
      <blockquote className="text-gray-800 border-l-4 border-[#ece8e1] pl-4 mb-4">
        {userInput}
      </blockquote>
      <p className="text-gray-700">
        It sounds like you’re carrying something tender. It’s okay to feel that
        weight. Sometimes we don’t need answers—we just need space to breathe
        through it.
      </p>
    </div>
    <div className="mt-6 flex gap-4 justify-center">
      <button
        className="px-4 py-2 border rounded text-sm"
        onClick={() => setActivePage("home")}
      >
        Stay with myself
      </button>
      <button
        className="bg-[#ece8e1] px-4 py-2 rounded text-sm"
        onClick={() => setActivePage("peer-room")}
      >
        Gently connect me
      </button>
    </div>
  </div>
);

const ThreadArchivePage = ({ archive, setActivePage }) => (
  <div className="p-10 max-w-2xl mx-auto">
    <h2 className="text-3xl font-serif mb-6 text-center">Your Thread</h2>
    <ul className="space-y-4">
      {archive.map((entry, index) => (
        <li key={index} className="bg-white p-4 rounded-xl shadow border">
          {entry.date} — {entry.text}
        </li>
      ))}
    </ul>
    <div className="text-center mt-8">
      <button
        className="bg-[#ece8e1] px-4 py-2 rounded"
        onClick={() => setActivePage("reflect")}
      >
        Write Something New
      </button>
    </div>
  </div>
);

const TransitionScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="p-10 text-center">
      <p className="text-xl font-serif mb-2">One breath at a time…</p>
      <div className="w-6 h-6 mx-auto bg-green-100 rounded-full animate-pulse blur-sm" />
    </div>
  );
};

const MomentsPage = ({ moments }) => (
  <div className="p-10 max-w-3xl mx-auto">
    <h2 className="text-3xl font-serif font-semibold mb-6 text-center">
      Moments of Connection
    </h2>
    {moments.length === 0 ? (
      <p className="text-center text-gray-500">
        No moments yet. Try sending warmth or relating to someone.
      </p>
    ) : (
      <ul className="space-y-4">
        {moments.map((m, idx) => (
          <li key={idx} className="bg-white p-4 rounded-xl shadow border">
            {m.type === "relate" && `You related to "${m.text}" — ${m.alias}`}
            {m.type === "warmth" &&
              `You sent warmth to "${m.text}" — ${m.alias}`}
            {m.type === "walk" &&
              `You asked to walk with "${m.alias}" — waiting...`}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const PrivateChatRoom = ({ partner }) => {
  const [chatLog, setChatLog] = useState([]);
  const [msg, setMsg] = useState("");

  const sendMessage = () => {
    if (msg.trim()) {
      setChatLog([...chatLog, { sender: "You", text: msg }]);
      setMsg("");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-serif font-semibold mb-2">
        You and {partner} are walking together 🤝
      </h2>
      <div className="border rounded-xl p-4 h-64 overflow-y-auto bg-white shadow mb-4">
        {chatLog.map((entry, idx) => (
          <p
            key={idx}
            className={`${
              entry.sender === "You" ? "text-right" : "text-left"
            } text-sm text-gray-700 mb-1`}
          >
            <span className="font-medium">{entry.sender}:</span> {entry.text}
          </p>
        ))}
        {chatLog.length === 0 && (
          <p className="text-gray-400 italic">
            Start your gentle walk with a message…
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 border rounded"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Say something kind..."
        />
        <button
          onClick={sendMessage}
          className="bg-[#ece8e1] px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

const PeerConnectionRoom = ({ setMoments, setActivePage, setChatPartner }) => {
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
    <div className="p-10 max-w-4xl mx-auto">
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
            className="bg-white border rounded-xl p-5 shadow-sm space-y-3"
          >
            <p className="text-gray-700 italic">“{card.reflection}”</p>
            <div className="text-sm text-gray-500">
              — {card.alias} · feeling: {card.feeling}
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleReaction(card, "relate")}
                className="text-sm bg-gray-100 hover:bg-gray-200 rounded px-3 py-1"
              >
                ✨ Relate
              </button>
              <button
                onClick={() => handleReaction(card, "warmth")}
                className="text-sm bg-gray-100 hover:bg-gray-200 rounded px-3 py-1"
              >
                🌿 Send Warmth
              </button>
              <button
                onClick={() => handleReaction(card, "walk")}
                className="text-sm bg-[#ece8e1] hover:bg-[#e4e0d6] rounded px-3 py-1"
              >
                🤝 Walk Together
              </button>
            </div>
            {walkRequested === card.id && !acceptedWalks.includes(card.id) && (
              <div className="text-sm text-green-700 mt-2">
                Waiting to see if they feel the same... 🌱
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const VolunteerRoom = ({ setActivePage, setChatPartner }) => {
  const volunteers = [
    {
      id: 1,
      name: "Still Lake",
      status: "available",
      bio: "Here to listen with care.",
    },
    {
      id: 2,
      name: "Open Arms",
      status: "offline",
      bio: "Always nearby in spirit.",
    },
    {
      id: 3,
      name: "Quiet Meadow",
      status: "available",
      bio: "I hold space for gentle conversations.",
    },
  ];

  const handleTalkNow = (name) => {
    setChatPartner(name);
    setActivePage("private-chat");
  };

  const handleLeaveMessage = (name) => {
    alert(`You can leave a message for ${name} (feature coming soon).`);
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-serif font-semibold mb-6 text-center">
        Volunteer Room
      </h2>
      <p className="text-center text-gray-600 italic mb-8">
        Sometimes we just need a kind human presence. Reach out to someone who’s
        here with care.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {volunteers.map((volunteer) => (
          <div
            key={volunteer.id}
            className="bg-white border rounded-xl p-5 shadow-sm space-y-3"
          >
            <h3 className="text-xl font-serif">{volunteer.name}</h3>
            <p className="text-sm text-gray-600 italic">{volunteer.bio}</p>
            <div className="text-sm">
              {volunteer.status === "available" ? (
                <span className="text-green-600">🟢 Available</span>
              ) : (
                <span className="text-red-500">🔴 Offline</span>
              )}
            </div>
            <div>
              {volunteer.status === "available" ? (
                <button
                  onClick={() => handleTalkNow(volunteer.name)}
                  className="bg-[#ece8e1] px-4 py-2 rounded text-sm mt-2"
                >
                  🌸 Talk Now
                </button>
              ) : (
                <button
                  onClick={() => handleLeaveMessage(volunteer.name)}
                  className="border px-4 py-2 rounded text-sm mt-2"
                >
                  🤍 Leave a Message
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function BreatheAppLayout() {
  const [activePage, setActivePage] = useState("home");
  const [userInput, setUserInput] = useState("");
  const [archive, setArchive] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [moments, setMoments] = useState([]);
  const [chatPartner, setChatPartner] = useState("");

  const saveToArchive = (entry) => setArchive([entry, ...archive]);

  const handleReflect = () => {
    const newEntry = { date: new Date().toLocaleDateString(), text: userInput };
    saveToArchive(newEntry);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setActivePage("ai-response");
    }, 2500);
  };

  const handleSavePrivate = () => {
    if (userInput.trim()) {
      const newEntry = {
        date: new Date().toLocaleDateString(),
        text: userInput,
      };
      saveToArchive(newEntry);
      setUserInput("");
      setActivePage("archive");
    }
  };

  const renderPage = () => {
    if (isTransitioning) return <TransitionScreen onComplete={() => {}} />;
    switch (activePage) {
      case "home":
        return <BreatheLandingPage />;
      case "reflect":
        return (
          <ReflectionPage
            userInput={userInput}
            setUserInput={setUserInput}
            handleReflect={handleReflect}
            handleSavePrivate={handleSavePrivate}
          />
        );
      case "ai-response":
        return (
          <AIResponsePage userInput={userInput} setActivePage={setActivePage} />
        );
      case "archive":
        return (
          <ThreadArchivePage archive={archive} setActivePage={setActivePage} />
        );
      case "peer-room":
        return (
          <PeerConnectionRoom
            setMoments={setMoments}
            setActivePage={setActivePage}
            setChatPartner={setChatPartner}
          />
        );
      case "moments":
        return <MomentsPage moments={moments} />;
      case "private-chat":
        return <PrivateChatRoom partner={chatPartner} />;
      case "volunteer":
        return (
          <VolunteerRoom
            setActivePage={setActivePage}
            setChatPartner={setChatPartner}
          />
        );
      default:
        return <BreatheLandingPage />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="w-full md:w-56 bg-[#f9f7f3] border-b md:border-b-0 md:border-r border-[#e4dfd8] p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-6">Breathe 🌿</h2>
        <nav className="space-y-3">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className={`w-full text-left px-4 py-2 rounded-md transition ${
                activePage === page.id
                  ? "bg-[#ece8e1] text-[#3c3a37] font-medium"
                  : "text-gray-600 hover:bg-[#f0ebe6]"
              }`}
            >
              {page.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">{renderPage()}</main>
    </div>
  );
}
