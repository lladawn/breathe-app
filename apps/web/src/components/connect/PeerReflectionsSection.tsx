import React from "react";

const PeerReflectionsSection = ({
    peerReflections,
    loadingPeerReflections,
    handleSendMoment,
    sendingMoment,
    setSelectedMomentReflection,
    setMomentType,
    setMomentMessage,
    setShowMomentModal,
    showMomentModal,
    momentType,
    momentMessage,
    selectedMomentReflection
}) => {
    return (
        <>
            <section id="peer-reflections"
                // className="flex-shrink-0 w-full max-w-xs snap-center flex flex-col items-center"
                className="snap-center w-screen flex-shrink-0 overflow-y-auto h-full px-4 py-6 max-w-[500px] 
                flex flex-col items-center"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Peer Reflections
                </h2>
                <p className="italic text-sm text-center text-[#6e6861] mb-4">
                    “We breathe together.” 🌱
                </p>
                {loadingPeerReflections ? (
                    <p className="italic text-gray-500">Loading...</p>
                ) : peerReflections.length === 0 ? (
                    <>
                        <p className="italic text-gray-500 mt-5">No one took the courage to share yet. </p>
                    </>
                ) : (
                    <div className="flex flex-col gap-0">
                        {peerReflections.map((reflection) => (
                            <div
                                key={reflection.id}
                                className="bg-[#fff9f3] rounded-2xl p-4 shadow-md border border-[#e4dfd8] hover:shadow-lg transition mb-5"
                            >
                                {/* Reflection Text */}
                                <p className="text-base leading-relaxed mb-2">
                                    {reflection.reflection}
                                </p>

                                {/* Alias (if present) */}
                                {reflection.alias && (
                                    <p className="text-xs italic text-gray-500 mb-2">
                                        — {reflection.alias}
                                    </p>
                                )}

                                {/* Feeling */}
                                <p className="text-sm text-gray-500 italic mb-3">
                                    Feeling: {reflection.feeling}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap  gap-2 mb-5">
                                    {reflection.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-[#ece8e1] text-xs text-[#6e6861] px-2 py-1 rounded-full"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => {
                                            setSelectedMomentReflection(reflection);
                                            setMomentType("relate");
                                            setMomentMessage("");
                                            setShowMomentModal(true);
                                        }}
                                        className="bg-[#ece8e1] hover:bg-[#e4dfd8] text-sm px-4 py-1 rounded-full shadow-sm transition"
                                    >
                                        🤝 Relate
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedMomentReflection(reflection);
                                            setMomentType("warmth");
                                            setMomentMessage("");
                                            setShowMomentModal(true);
                                        }}
                                        className="bg-[#ece8e1] hover:bg-[#e4dfd8] text-sm px-4 py-1 rounded-full shadow-sm transition"
                                    >
                                        💛 Send Warmth
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Moment Modal */}
                {showMomentModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
                            <h2 className="text-xl font-semibold mb-4 text-center">
                                {momentType === "warmth" ? "💛 Send Warmth" : "🤝 Send Relate"}
                            </h2>
                            <textarea
                                value={momentMessage}
                                onChange={(e) => setMomentMessage(e.target.value)}
                                rows={3}
                                className="w-full border px-3 py-2 rounded mb-4"
                                placeholder="Write an optional message..."
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowMomentModal(false)}
                                    className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        handleSendMoment(selectedMomentReflection.id, selectedMomentReflection.userId, momentType, momentMessage);
                                        setShowMomentModal(false);
                                    }}
                                    disabled={sendingMoment}
                                    className="px-4 py-2 text-sm rounded bg-[#ece8e1] hover:bg-[#e4dfd8] transition"
                                >
                                    {sendingMoment ? "Sending..." : "Send"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>


        </>

    );
};

export default PeerReflectionsSection;