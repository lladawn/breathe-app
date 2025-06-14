import React, { useEffect, useState } from "react";
import ShareReflectionModal from "../ShareReflectionModal";
import { trackAction } from "../../utils/umami";
import { getRandomPastelColor } from "../../utils";

const YourReflectionsSection = ({
    yourReflections,
    loadingReflections,
    showRawReflectionModal,
    setShowRawReflectionModal,
    reflectionMetadata,
    setReflectionMetadata,
    handleRawReflectionSubmit,
    submittingReflection
}) => {

    // const [tagColors, setTagColors] = useState({});

    // useEffect(() => {
    //     const newColors = { ...tagColors };
    //     yourReflections.forEach((reflection) => {
    //         reflection.tags.forEach((tag) => {
    //             if (!newColors[tag]) {
    //                 newColors[tag] = getRandomPastelColor();
    //             }
    //         });
    //     });
    //     setTagColors(newColors);
    // }, [yourReflections]);

    return (
        <section id="your-reflections"
            // className="flex-shrink-0 w-full max-w-xs snap-center flex flex-col items-center"
            className="snap-center w-screen flex-shrink-0 overflow-y-auto h-full px-4 py-6 max-w-[500px] 
            flex flex-col items-center"
        >
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Your Reflections
            </h2>
            <p className="italic text-sm text-center text-[#6e6861] mb-4">
                “What’s said cannot be deleted, like in life—only fades with time.” 🌱
            </p>
            <button
                onClick={() => {
                    trackAction("Your Reflections - Share Raw")
                    setReflectionMetadata({
                        reflection: "",
                        alias: "",
                        feeling: "",
                        tags: [],
                    });
                    setShowRawReflectionModal(true);
                }}
                className="mb-4 bg-[#ece8e1] hover:bg-[#e4dfd8] text-[#3c3a37] font-medium text-sm px-4 py-2 rounded-full shadow-sm transition"
            >
                🌿 Share a Raw Reflection
            </button>

            <ShareReflectionModal
                isOpen={showRawReflectionModal}
                onClose={() => {
                    trackAction("Share Raw - Cancel")
                    setShowRawReflectionModal(false)
                }}
                onSubmit={handleRawReflectionSubmit}
                submitting={submittingReflection}
                reflectionMetadata={reflectionMetadata}
                setReflectionMetadata={setReflectionMetadata}
            />

            {loadingReflections ? (
                <p className="italic text-gray-500">Loading...</p>
            ) : yourReflections.length === 0 ? (
                <>
                    <p className="italic text-gray-500 mt-5">You haven't shared any reflections yet. </p>
                </>
            ) : (
                <div className="flex flex-col gap-0">
                    {yourReflections.map((reflection) => (
                        <div
                            key={reflection.id}
                            className="bg-[#fff9f3] rounded-2xl p-4 shadow-md border border-[#e4dfd8] hover:shadow-lg transition mb-5"
                        >
                            <p className="text-base leading-relaxed mb-2">
                                {reflection.reflection}
                            </p>
                            {reflection.alias && (
                                <p className="text-xs italic text-gray-500 mb-2">
                                    — {reflection.alias}
                                </p>
                            )}
                            <p className="text-sm italic text-gray-500 mb-3">
                                Feeling: {reflection.feeling}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {reflection.tags.map((tag) => (
                                    // <span
                                    //     key={tag}
                                    //     className="bg-[#ece8e1] text-xs text-[#6e6861] px-2 py-1 rounded-full"
                                    // >
                                    //     {tag}
                                    // </span>
                                    <span
                                        key={tag}
                                        style={{
                                            backgroundColor: getRandomPastelColor() || "#ece8e1",
                                            color: "#3c3a37",
                                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                        }}
                                        className="text-xs px-2 py-1 rounded-full transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default YourReflectionsSection;