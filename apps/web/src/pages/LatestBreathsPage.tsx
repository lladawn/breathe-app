import { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { trackAction } from "../utils/umami";
import LottieAnimation from "../components/LottieAnimation";
import animation from "../assets/animations/falling-leaves.json"

const updates = [
    {
        date: "June 13, 2025",
        title: "Connect — Reflections & Moments",
        description:
            "Connect is now open — a quiet space to let your thoughts drift into the open, and to send one-time Moments of warmth, resonance, or silent understanding. Just your truth — felt, not performed.",
        link: "/connect",
        action: "Connect"
    },
    {
        date: "June 3, 2025",
        title: "Storybook — A Living Book Begins",
        description:
            "The storybook lives — not to scroll, but to step inside. One chapter at a time, Breathe begins to write itself, gently — like you do.",
        link: "/storybook",
        action: "Storybook"
    },
    {
        date: "19 May 2025",
        title: "Reflect & Archive — Now Breathing",
        description:
            "You can now pause with Reflect — a soft space to talk to your quiet self through a gentle AI companion. And when a thought wants to stay, it rests in your private Archive. No noise. No feed. Just your words, held in silence.",
        link: "/reflect",
        action: "Reflect"
    }
];

export default function LatestBreathsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
    const alreadyDismissed = localStorage.getItem("breathePopupDismissed") === "true";

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const fired = {
            ten: false,
            fifty: false,
            hundred: false,
        };

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
            const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

            if (scrollPercent >= 10 && !fired.ten) {
                trackAction("Latest Breaths — Scrolled 10%");
                fired.ten = true;
            }
            if (scrollPercent >= 50 && !fired.fifty) {
                trackAction("Latest Breaths — Scrolled 50%");
                fired.fifty = true;
            }
            if (scrollPercent >= 100 && !fired.hundred) {
                trackAction("Latest Breaths — Scrolled to End of Story");
                fired.hundred = true;
            }

            if (isAtBottom && !hasScrolledToEnd) {
                setHasScrolledToEnd(true);
                if (!alreadyDismissed) {
                    setSearchParams((prev) => {
                        const newParams = new URLSearchParams(prev);
                        newParams.set("message", "welcome");
                        return newParams;
                    });
                }
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [hasScrolledToEnd, setSearchParams]);

    return (
        <>
            {/* Background Animation */}
            {/* <LottieAnimation animation={animation} opacity={0.2} scale={2} /> */}
            <LottieAnimation
                animation={animation}
                opacity={0.2}
                scale={2.35}
                speed={0.8}
                delay={2000}
            />
            <section className="snap-center w-screen flex-shrink-0 h-full px-5 py-6 max-w-[500px] flex flex-col items-center text-[#5e5a55] font-serif">
                {/* Header */}
                <h2 className="text-2xl font-semibold mb-4 text-center">🍃 Latest Breaths</h2>

                {/* Story Section */}
                <div className="relative bg-[#f8f4ef] rounded-lg bg-opacity-80 w-full max-h-[45vh] mb-6 px-8">
                    <div
                        ref={containerRef}
                        className="overflow-y-auto scrollbar-hide pr-1 space-y-4 py-5 text-sm leading-relaxed text-center scroll-smooth max-h-[45vh]"
                    >
                        <p><em>Hey, Fellow Breather —</em></p>
                        <p>I’ve started this little corner to keep you gently in the loop… on the latest <span className="italic">breaths</span> of Breathe.</p>
                        <p>Think of this as the story growing with the living book — the <strong>quiet pulse</strong> of this digital village, <span className="italic">written as it breathes.</span></p>
                        <p>Recently, we opened the doors to <span

                            className="hover:text-[#a7744a] cursor-pointer transition-colors italic"
                            onClick={() => {
                                trackAction(`Breaths - clicked Peer Reflections`);
                                navigate('/connect');
                            }}
                        >
                            Peer Reflections
                        </span>
                            — a soft space for you to let your thoughts breathe, out there, for someone, somewhere.<br />Here, your words are your identity.<br />Nothing more. Nothing less.<br /><span className="italic">Just your truth, carried gently into the open.</span></p>
                        <p>Before that, the <span
                            className="hover:text-[#a7744a] cursor-pointer transition-colors italic"
                            onClick={() => {
                                trackAction("Breaths - clicked Storybook")
                                navigate('/storybook')
                            }}
                        >
                            Storybook
                        </span> came alive — not to scroll through, but to <span className="italic">step inside.</span></p>
                        <p>And now, this.</p>
                        <p>A page to share the quiet updates — not launches, not features — but <span className="italic">breaths</span>.</p>
                        <p>Thank you for being here. For reading, for sharing, for breathing with me. You’re not just a user.<br /><span className="font-semibold">You’re a Fellow Breather now.</span></p>
                        <p><em>
                            And hey — perhaps one day, <strong>your</strong> reflection will reach <strong>me</strong>...<br />
                            <span className="italic">
                                and I might just ask you for a walk —<br />
                                …because sometimes, I need that gentle company too. ☁️
                            </span>
                        </em></p>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#f4f1eb] to-transparent pointer-events-none" />
                    {
                        !hasScrolledToEnd &&
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-[#aaa] text-sm animate-bounce">
                            ↓
                        </div>
                    }
                </div>

                {/* Horizontal Updates Section */}
                <div className="w-full overflow-x-auto flex gap-4 scroll-smooth snap-x snap-mandatory scrollbar-hide">
                    {updates.map((update, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                                trackAction(`Breaths - ${update.action}`);
                                navigate(update.link);
                            }}
                            className="min-w-[250px] max-w-[300px] sm:max-w-[320px] md:max-w-[360px] max-h-[20vh] 
                            overflow-y-auto scrollbar-hide snap-start bg-[#fff9f3] p-4 
                            rounded-xl border border-[#e4dfd8] shadow-sm flex-shrink-0 cursor-pointer 
                            hover:border-[#d3c3ad] transition"
                        >
                            <p className="text-xs text-gray-500 italic mb-1">{update.date}</p>
                            <h3 className="text-sm font-semibold mb-1">{update.title}</h3>
                            <p className="text-sm">{update.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
