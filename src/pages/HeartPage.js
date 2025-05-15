// src/pages/HeartPage.js
import React from "react";

const HeartPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-br from-[#f4f1eb] via-[#f0ede7] to-[#f9f7f3] text-[#3c3a37] animate-fade-in">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl sm:text-5xl font-serif font-semibold mb-4">
          The Heart Behind Breathe
        </h1>
        {/* <p className="text-lg sm:text-xl text-[#5e5a55] leading-relaxed mb-10 italic">
          A quiet corner of the internet, built with care — for those who feel.
        </p> */}
        <p className="text-[#5e5a55] text-base sm:text-lg leading-relaxed italic">
          This space was born from a quiet longing — to hold the emotions we
          hide, the thoughts we never voice, and the weight we quietly carry.
        </p>
        <p className="text-[#5e5a55] text-base sm:text-lg leading-relaxed mt-6 mb-10">
          I am someone who has walked through the noise — the kind that fills
          the day but empties the soul. I’ve sat with the numbness, the ache
          that comes when life moves too fast to feel. And somewhere in the
          quiet after all that… I found reflection through{" "}
          <span className="italic">writing</span> — not as a luxury, but as a
          lifeline.
          <span className="block mt-2">
            Breathe is my offering — for hearts that{" "}
            <span className="">feel</span> more than they show.
          </span>
        </p>
        <div className="space-y-6">
          <div className="bg-white border border-[#e4dfd8] rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">
              ✍️ Read my reflections
            </h2>
            <p className="text-sm text-[#6b665f] mb-3">
              I write slowly and soulfully on Substack — one quiet thread at a
              time. You’re welcome to read along.
            </p>
            <a
              href="https://theopenthread.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#ece8e1] hover:bg-[#e4e0d6] text-[#3c3a37] font-medium px-4 py-2 rounded transition"
            >
              Open a page, feel held 🫶 →
            </a>
          </div>

          <div className="bg-white border border-[#e4dfd8] rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">
              📹 Feel the story unfold visually
            </h2>
            <p className="text-sm text-[#6b665f] mb-3">
              Some moments turn into visuals — soft films and poetic voiceovers.
              I’ve been pouring pieces of the journey on YouTube too, gently.
            </p>
            <a
              href="https://youtube.com/@theopenthread"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#ece8e1] hover:bg-[#e4e0d6] text-[#3c3a37] font-medium px-4 py-2 rounded transition"
            >
              Watch quietly 🎬 →
            </a>
          </div>

          <div className="bg-white border border-[#e4dfd8] rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">
              🎵 or listen to what I’ve been feeling
            </h2>
            <p className="text-sm text-[#6b665f] mb-3">
              Sometimes, I try to say through melody what words cannot. These
              are little songs I’ve shaped using Suno — fragments of emotion,
              made into sound.
            </p>
            <a
              href="https://suno.com/@theopenthread"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#ece8e1] hover:bg-[#e4e0d6] text-[#3c3a37] font-medium px-4 py-2 rounded transition"
            >
              Listen softly 🎧 →
            </a>
          </div>

          <div className="bg-white border border-[#e4dfd8] rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">🪶 Share a thought</h2>
            <p className="text-sm text-[#6b665f] mb-3">
              Want to share how Breathe made you feel? Or just say hello?
            </p>
            <a
              href="mailto:theopenthreadhub@gmail.com?subject=💌 A soft note from a fellow breather&body=Hey there 🌿,%0A%0AI just wanted to share a thought that came to me…"
              className="inline-block bg-[#ece8e1] hover:bg-[#e4e0d6] text-[#3c3a37] font-medium px-4 py-2 rounded transition"
            >
              Write to Me 💌 →
            </a>
          </div>

          <div className="bg-white border border-[#e4dfd8] rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">
              💛 Wanna Support or Walk With Me?
            </h2>
            <p className="text-sm text-[#6b665f] mb-3">
              If you’d like to support this quiet space — or co-build this
              soulful village with me — I’d love to hear from you.
            </p>
            <a
              href="mailto:theopenthreadhub@gmail.com?subject=🌼 From one quiet heart to another&body=Hey there ☁️,%0A%0AI’d love to walk with you or support what you’re building..."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#ece8e1] hover:bg-[#e4e0d6] text-[#3c3a37] font-medium px-4 py-2 rounded transition"
            >
              Leave a soft echo here 🍃 →
            </a>
          </div>
        </div>

        <p className="mt-10 text-sm text-[#7c766f] italic">
          You can always whisper to me at{" "}
          <a
            href="mailto:theopenthreadhub@gmail.com"
            className="underline text-[#3c3a37] hover:text-[#1d1c1a] transition"
          >
            theopenthreadhub@gmail.com
          </a>
          .
        </p>
        <p className="mt-4 text-sm text-[#9a958f] italic">
          Thank you for being here. 🕊️
        </p>

        {/* <p className="mt-12 text-sm text-[#9a958f] italic">
          Thank you for being here. 🕊️
        </p> */}
      </div>
    </div>
  );
};

export default HeartPage;
