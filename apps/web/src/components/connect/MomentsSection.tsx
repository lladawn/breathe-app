import React from "react";
import { getApproxTimeAgo } from "../../utils";

const MomentsSection = ({ moments, loadingMoments }) => {
    return (
        <section id="moments" className="flex-shrink-0 w-full max-w-xs snap-center flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Moments
            </h2>
            <p className="italic text-sm text-center text-[#6e6861] mb-4">
                “A moment shared can't be undone, or wiped out, only fades or embraces with time.” 🌱
            </p>
            <div className="flex flex-col gap-4">
                {loadingMoments ? (
                    <p className="italic text-gray-500">Loading moments...</p>
                ) : moments.length === 0 ? (
                    <p className="italic text-gray-500">No moments yet. 🌱</p>
                ) : (
                    moments.map((moment) => {
                        const timeAgo = getApproxTimeAgo(moment.timestamp);
                        let displayMessage = "";
                        if (moment.direction === "sent") {
                            if (moment.type === "warmth") {
                                displayMessage = `💛 You sent warmth${moment.message ? `: “${moment.message}”` : "."}`;
                            } else if (moment.type === "relate") {
                                displayMessage = `🤝 You related to someone${moment.message ? `: “${moment.message}”` : "."}`;
                            } else {
                                displayMessage = `🌿 You sent a moment.`;
                            }
                        } else {
                            if (moment.type === "warmth") {
                                displayMessage = `💛 Someone sent warmth your way${moment.message ? `: “${moment.message}”` : "."}`;
                            } else if (moment.type === "relate") {
                                displayMessage = `🤝 Someone related to your reflection${moment.message ? `: “${moment.message}”` : "."}`;
                            } else {
                                displayMessage = `🌿 A moment was shared.`;
                            }
                        }
                        return (
                            <div
                                key={moment._id}
                                className="bg-[#fff9f3] rounded-2xl p-6 shadow-md border border-[#e4dfd8] hover:shadow-lg transition"
                            >
                                <p className="text-base leading-relaxed text-center mb-2">
                                    {displayMessage}
                                </p>
                                <p className="text-xs text-gray-500 text-center italic">
                                    {timeAgo}
                                </p>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default MomentsSection;