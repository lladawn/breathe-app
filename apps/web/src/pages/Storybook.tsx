// Storybook.tsx — Phase 1 of Breathe Living Book

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getChapters } from "../utils/content";
import ChapterNavMenu from "../components/ChapterNavMenu";
import LottieAnimation from "../components/LottieAnimation";
import fallingLeaves from "../assets/animations/falling-leaves.json";
import wind from "../assets/animations/wind.json";
import { trackAction } from "../utils/umami";
// import useScrollShadows from "../hooks/useScrollShadows";

// Placeholder Button
const Button = ({ children, onClick, className = "", variant = "default" }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded transition-all font-medium text-sm ${variant === "ghost"
      ? "bg-transparent hover:bg-gray-200"
      : "bg-black text-white hover:bg-gray-800"
      } ${className}`}
  >
    {children}
  </button>
);

export default function Storybook() {
  const navigate = useNavigate();
  const chapters = getChapters(navigate);
  const scrollRefOuter = useRef<HTMLDivElement>(null);
  // const scrollRefInner = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = Object.fromEntries(searchParams.entries());
  const chapterSlug = searchParams.get("chapter");

  const [showAnimation, setShowAnimation] = useState(true);


  // Load bookmark if exists
  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem("breatheBookmark");
    const index = saved ? parseInt(saved, 10) : 0;
    return !isNaN(index) && index < chapters.length ? index : 0;
  });

  // const { showTopShadow, showBottomShadow } = useScrollShadows(scrollRefInner, current);

  const chapter = chapters[current];

  useEffect(() => {

    if (chapterSlug) {
      // console.log(`executes1: ${chapterSlug}`)
      const index = chapters.findIndex(c => c.slug === chapterSlug);
      if (index !== -1) {
        setCurrent(index);
        localStorage.setItem("breatheBookmark", index.toString());
      }
    } else {
      if (chapter) {
        // console.log(`executes2: ${chapter?.slug}`)
        setSearchParams({ ...currentParams, chapter: chapter?.slug });
      }
    }
  }, [chapterSlug, chapters]);

  const next = () => {
    trackAction(`Storybook - Turn Page clicked from ${chapters[current].title}`);
    if (current < chapters.length - 1) {
      const nextIndex = current + 1;
      setSearchParams({ ...currentParams, chapter: chapters[nextIndex].slug });
    }
  };

  const back = () => {
    trackAction(`Storybook - Go Back from ${chapters[current].title} `);
    if (current > 0) {
      const prevIndex = current - 1;
      setSearchParams({ ...currentParams, chapter: chapters[prevIndex].slug });
    }
  };

  const reset = () => {
    trackAction(`Storybook - Take to beginning clicked from ${chapters[current].title}`);
    localStorage.removeItem("breatheBookmark");
    setSearchParams({ ...currentParams, chapter: chapters[0].slug });
  };

  useEffect(() => {
    scrollRefOuter.current?.scrollIntoView({ behavior: "smooth" });
  }, [current]);

  return (
    <>
      {/* Background Animation */}
      {showAnimation ? (
        <LottieAnimation
          animation={fallingLeaves}
          opacity={0.2}
          scale={2.35}
          speed={0.8}
          delay={2000}
        />
      ) : (<LottieAnimation
        animation={wind}
        opacity={0.2}
        scale={3.5}
        speed={0.8}
        delay={1000}
      />)}

      {/** Play and Pause animation */}
      <button
        onClick={() => {
          trackAction("Storybook - showAnimation clicked");
          setShowAnimation((prev) => !prev)
        }}
        className="fixed bottom-4 right-4 z-[200] bg-white/70 backdrop-blur-md border border-[#e4dfd8] px-4 py-2 rounded-full text-sm shadow hover:bg-white transition"
      >
        {showAnimation ? "🌪 Hold the breeze" : "🍂 Let it flow"}
      </button>

      {/** Chapter Menu Bar */}
      <ChapterNavMenu />

      <div
        ref={scrollRefOuter}
        className="px-2 text-left font-serif text-lg text-muted-foreground bg-muted flex justify-center"
      >
        <div className="w-full sm:w-[90vw] md:w-[650px] flex flex-col">
          <div className="flex justify-between items-center mb-4 w-full">
            <span className="text-sm text-muted-foreground">
              Chapter {current + 1} of {chapters.length}
            </span>
            {current > 0 && (
              <Button
                onClick={reset}
                variant="ghost"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Take me to the beginning
              </Button>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7 }}
              className="w-full flex flex-col"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm w-full flex flex-col h-[70vh] border border-[#e4dfd8] shadow-[0_4px_14px_rgba(0,0,0,0.05)]">
                {/* Chapter Title */}
                <p className="text-[0.9rem] text-muted-foreground text-center italic mb-1 text-gray-500">
                  {chapter.number}
                </p>
                <h1 className="text-2xl font-semibold mb-4 text-foreground text-center">
                  {chapter.title}
                </h1>

                {/* Scrollable Content */}
                <div
                  className={`flex-1 overflow-y-auto mb-6 
                          leading-relaxed break-words
                          p-3 rounded-lg `}
                // shadow-inner transition-all 
                // style={{
                //   boxShadow: "inset 0 -20px 20px -20px rgba(0,0,0,0.1)", // subtle fade at bottom
                // }}
                >
                  {chapter.content.split('\n').map((line, idx) => (
                    <p key={idx} className="mb-3">{line}</p>
                  ))}
                </div>

                {/* CTA and Navigation */}
                <div className="flex flex-col gap-4">
                  <div className="text-center">
                    <Button
                      onClick={chapter.onClick}
                      className="bg-foreground text-background hover:bg-foreground/90"
                    >
                      {chapter.cta}
                    </Button>
                  </div>
                  <p className="text-[0.9rem] text-muted-foreground text-center italic mb-1 text-gray-500">
                    {chapter.undernote}
                  </p>

                  <div className="flex justify-between flex-wrap gap-4 w-full">
                    {current > 0 ? (
                      <Button onClick={back} variant="ghost">
                        ← Go back
                      </Button>
                    ) : (
                      <div />
                    )}

                    {current < chapters.length - 1 && (
                      <Button
                        onClick={next}
                        variant="ghost"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Turn the page →
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>

  );
}