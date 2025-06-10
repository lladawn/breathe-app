import React from "react";

const WalkTogetherRequestsSection = () => {
    return (
        <section id="walk-together" className="flex-shrink-0 w-full max-w-xs snap-center flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Walk Together Requests
            </h2>
            <p className="italic text-sm text-center text-[#6e6861] mb-4">
                “A walk to just <span className="font-bold">be</span>.” 🌱
            </p>
            <div className="flex flex-col gap-4">
                <div className="bg-[#f1efea] rounded-2xl p-6 shadow-inner border border-[#ddd] opacity-70 cursor-not-allowed transition">
                    <p className="text-base leading-relaxed mb-2 text-center text-[#9a958f]">
                        <span className="font-semibold">A fellow breather</span> gently invites you to walk together for a while.
                    </p>
                    <div className="flex justify-center gap-3">
                        <button
                            disabled
                            className="bg-[#ece8e1] text-sm px-4 py-1 rounded-full shadow-sm text-[#9a958f] cursor-not-allowed"
                        >
                            🚶 Walk
                        </button>
                        <button
                            disabled
                            className="bg-[#ece8e1] text-sm px-4 py-1 rounded-full shadow-sm text-[#9a958f] cursor-not-allowed"
                        >
                            🕊️ Maybe Later
                        </button>
                    </div>
                    <p className="text-xs text-center italic text-[#9a958f] mt-4">
                        Coming Soon...
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WalkTogetherRequestsSection;