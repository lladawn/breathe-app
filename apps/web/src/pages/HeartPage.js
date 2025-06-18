// src/pages/HeartPage.js
import { useRef, useEffect, useState } from "react";
import LottieAnimation from "../components/LottieAnimation";
import breathing from "../assets/animations/breathe.json";
import { trackAction } from "../utils/umami";

const HeartPage = () => {
  const substackRef = useRef();
  const youtubeRef = useRef();
  const sunoRef = useRef();
  const shareThoughtRef = useRef();
  const supportRef = useRef();

  const scrollRef = useRef();
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
      if (isAtBottom) setHasScrolledToEnd(isAtBottom);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const seenSections = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !seenSections.has(entry.target)) {
            seenSections.add(entry.target);
            const sectionName = entry.target.getAttribute("data-section");
            // console.log(`Heart - Scrolled to ${sectionName}`);
            trackAction(`Heart - Scrolled to ${sectionName}`);
          }
        });
      },
      {
        threshold: 0.5, // 50% of the section visible
      }
    );

    [substackRef, youtubeRef, sunoRef, shareThoughtRef, supportRef].forEach(
      (ref) => {
        if (ref.current) observer.observe(ref.current);
      }
    );

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-start px-2
      text-[#3c3a37] animate-fade-in"
      // bg-gradient-to-br from-[#f4f1eb] via-[#f0ede7] to-[#f9f7f3]
    >
      <LottieAnimation animation={breathing} scale={1.5} opacity={0.3} />
      <div className="max-w-2xl w-full text-center">
        {/* Header */}
        <h1 className="text-3xl sm:text-5xl font-serif font-semibold mb-4">
          The Heart Behind Breathe
        </h1>

        {/* Scrollable Content */}
        <div className="relative">
          {/* Scrollable content */}
          <div
            ref={scrollRef}
            className="bg-[#f4f1eb] bg-opacity-70 
            rounded-lg p-4 h-[40vh] 
            overflow-y-auto scrollbar-hide  transition-all"
            // style={{
            //   boxShadow: "inset 0 -20px 20px -20px rgba(0,0,0,0.1)", // subtle fade at bottom
            // }}
          >
            <p className="text-[#5e5a55] text-base sm:text-lg leading-relaxed italic mb-8">
              This space was born from a quiet longing — to hold the emotions we
              hide, the thoughts we never voice, and the weight we quietly
              carry.
            </p>
            <p className="text-[#5e5a55] text-base sm:text-lg leading-relaxed mb-6">
              I am someone who has walked through the noise — the kind that
              fills the day but empties the soul. I’ve sat with the numbness,
              the ache that comes when life moves too fast to feel. And
              somewhere in the quiet after all that… I found reflection through{" "}
              <span className="italic">writing</span> — not as a luxury, but as
              a lifeline.
              <span className="block mt-2">
                Breathe is my offering — for hearts that{" "}
                <span className="">feel</span> more than they show.
              </span>
            </p>

            {/* Cards Section */}
            <div className="space-y-6">
              {/* Reflection Card */}
              <div
                ref={substackRef}
                data-section="Substack"
                className="bg-white border border-[#e4dfd8] rounded-xl shadow p-6"
              >
                <h2 className="text-xl font-semibold mb-2">
                  ✍️ Read my reflections
                </h2>
                <p className="text-sm text-[#6b665f] mb-3">
                  I write slowly and soulfully on{" "}
                  <span className="font-semibold italic">Substack</span> — one
                  quiet thread at a time. You’re welcome to read along.
                </p>
                <a
                  href="https://theopenthread.substack.com"
                  onClick={() => trackAction("Heart - Open Substack")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#ece8e1] hover:bg-[#e4e0d6] text-[#3c3a37] font-medium px-4 py-2 rounded transition"
                >
                  Open a page, feel held 🫶 →
                </a>
              </div>

              {/* Visuals Card */}
              <div
                ref={youtubeRef}
                data-section="YouTube"
                className="bg-white border border-[#e4dfd8] rounded-xl shadow p-6"
              >
                <h2 className="text-xl font-semibold mb-2">
                  📹 Feel the story unfold visually
                </h2>
                <p className="text-sm text-[#6b665f] mb-3">
                  Some moments turn into visuals — soft films and poetic
                  voiceovers. I’ve been pouring pieces of the journey on{" "}
                  <span className="font-semibold italic">YouTube </span>
                  too, gently.
                </p>
                <a
                  href="https://youtube.com/@theopenthread"
                  onClick={() => trackAction("Heart - Open Youtube")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#ece8e1] hover:bg-[#e4e0d6] text-[#3c3a37] font-medium px-4 py-2 rounded transition"
                >
                  Watch quietly 🎬 →
                </a>
              </div>

              {/* Music Card */}
              <div
                ref={sunoRef}
                data-section="Suno"
                className="bg-white border border-[#e4dfd8] rounded-xl shadow p-6"
              >
                <h2 className="text-xl font-semibold mb-2">
                  🎵 or listen to what I’ve been feeling
                </h2>
                <p className="text-sm text-[#6b665f] mb-3">
                  Sometimes, I try to say through melody what words cannot.
                  These are little songs I’ve shaped using{" "}
                  <span className="font-semibold italic">Suno </span> —
                  fragments of emotion, made into sound.
                </p>
                <a
                  href="https://suno.com/@theopenthread"
                  onClick={() => trackAction("Heart - Open Suno")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#ece8e1] hover:bg-[#e4e0d6] text-[#3c3a37] font-medium px-4 py-2 rounded transition"
                >
                  Listen softly 🎧 →
                </a>
              </div>

              {/* Share Card */}
              <div
                ref={shareThoughtRef}
                data-section="Share a thought"
                className="bg-white border border-[#e4dfd8] rounded-xl shadow p-6"
              >
                <h2 className="text-xl font-semibold mb-2">
                  🪶 Share a thought
                </h2>
                <p className="text-sm text-[#6b665f] mb-3">
                  Want to share how Breathe made you feel? Or just say hello?
                </p>
                <a
                  href="mailto:theopenthreadhub@gmail.com?subject=💌 A soft note from a fellow breather&body=Hey there 🌿,%0A%0AI just wanted to share a thought that came to me…"
                  onClick={() => trackAction("Heart - Write to Me")}
                  className="inline-block bg-[#ece8e1] hover:bg-[#e4e0d6] text-[#3c3a37] font-medium px-4 py-2 rounded transition"
                >
                  Write to Me 💌 →
                </a>
              </div>

              {/* Support Card */}
              <div
                ref={supportRef}
                data-section="Support"
                className="bg-white border border-[#e4dfd8] rounded-xl shadow p-6"
              >
                <h2 className="text-xl font-semibold mb-2">
                  💛 Wanna Support or Walk With Me?
                </h2>
                <p className="text-sm text-[#6b665f] mb-3">
                  If you’d like to support this quiet space — or co-build this
                  soulful village with me — I’d love to hear from you.
                </p>
                <a
                  href="mailto:theopenthreadhub@gmail.com?subject=🌼 From one quiet heart to another&body=Hey there ☁️,%0A%0AI’d love to walk with you or support what you’re building..."
                  onClick={() => trackAction("Heart - Support or Walk")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#ece8e1] hover:bg-[#e4e0d6] text-[#3c3a37] font-medium px-4 py-2 rounded transition"
                >
                  Leave a soft echo here 🍃 →
                </a>
              </div>
            </div>
          </div>
          {/* Shadow overlay at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#f4f1eb] to-transparent pointer-events-none" />
          {/* Scroll Indicator (conditionally shown) */}
          {!hasScrolledToEnd && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-[#aaa] text-sm animate-bounce">
              ↓
            </div>
          )}
        </div>

        <div>
          {/* Footer Note */}
          <p className="mt-6 text-sm text-[#7c766f] italic">
            You can always whisper to me at{" "}
            <a
              href="mailto:theopenthreadhub@gmail.com"
              onClick={() => trackAction("Heart - Mail Clicked")}
              className="underline text-[#3c3a37] hover:text-[#1d1c1a] transition"
            >
              theopenthreadhub@gmail.com
            </a>
            .
          </p>
          <p className="mt-2 text-sm text-[#9a958f] italic">
            Thank you for being here. 🕊️
          </p>

          {/* Subscribe Invite */}
          <hr className="my-6 w-1/3 border-t border-[#e0ddd6] opacity-60 mx-auto" />

          <p className="text-sm text-[#5e5a55] italic my-2">
            {/* Wanna stay close to the heart of Breathe? 🌿 */}
            {/* Wanna stay updated as Breathe unfolds? 🌿 */}
            {/* Wanna bring Breathe’s story to your inbox? */}
            Wanna let Breathe’s whispers reach your inbox? 🌿
            {/* to keep close, subscribe. */}
          </p>
          <a
            href="https://theopenthread.substack.com/subscribe"
            onClick={() => trackAction("Heart - Subscribe Clicked")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#ece8e1] hover:bg-[#e4dfd8] text-[#3c3a37] font-medium px-6 py-2 rounded-md transition"
          >
            Subscribe →
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeartPage;
