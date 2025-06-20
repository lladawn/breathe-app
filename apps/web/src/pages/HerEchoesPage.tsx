import React, { useEffect, useRef, useState } from "react";
import { shuffleArray } from "../utils";
import { echoes } from "../utils/echoes";
import LottieAnimation from "../components/LottieAnimation";
import animation from "../assets/animations/breathe.json"

const HerEchoesPage: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showArrow, setShowArrow] = useState(true);
    const [shuffledEchoes, setShuffledEchoes] = useState(() => shuffleArray(echoes));

    // useEffect(() => {
    //     setShuffledEchoes(shuffleArray(echoes));
    // }, []);

    const handleScroll = () => {
        const el = scrollRef.current;
        if (el) {
            const scrolledToEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
            setShowArrow(!scrolledToEnd);
        }
    };

    const handleScrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: scrollRef.current.offsetWidth,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener("scroll", handleScroll);
        handleScroll(); // initial check

        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <LottieAnimation animation={animation} opacity={0.2} scale={2} />
            <div className="px-4 py-10 relative overflow-hidden">
                <h2 className="text-2xl font-serif text-center text-[#3c3a37] mb-2 gap-1 flex justify-center items-center">
                    <span className="font-semibold">Her Echoes 🫶 </span>
                    {/* <span className="text-sm italic font text-base text-[#777]"> What They Felt 🤍</span> */}
                </h2>
                <p className="text-sm italic text-[#7c766f] text-center mb-8">
                    “whispers from those who felt something true”
                </p>

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
                >
                    {shuffledEchoes.map((echo, idx) => (
                        <div
                            key={idx}
                            className="snap-center flex-shrink-0 w-full sm:w-[80vw] md:w-[60vw] lg:w-[480px] px-4"
                        >
                            <div className="bg-[#fffefc] border border-[#e2ddd5] rounded-xl shadow p-6 h-full">
                                <blockquote className="text-[#5e5a55] italic mb-3">
                                    “{echo.quote}”
                                </blockquote>
                                <p className="text-sm text-[#6b665f] mb-2">{echo.author}</p>
                                <a
                                    href={echo.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-[#3c3a37] underline hover:text-[#1f1d1a]"
                                >
                                    Read on Substack →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {showArrow && (
                    <button
                        onClick={handleScrollRight}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xl animate-bounce 
                    bg-[#ece9e3] rounded-full shadow-sm
                    px-3 py-1"
                    >
                        →
                    </button>
                )}
            </div>
        </>
    );
};

export default HerEchoesPage;