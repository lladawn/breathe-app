import { useEffect, useMemo, useState, useRef } from "react";
import { sendMoment } from "../../functions/api";
import { useNavigate } from "react-router-dom";
import { trackAction } from "../../utils/umami";
import { getRandomPastelColor } from "../../utils";

const PeerReflectionsSection = ({
    peerReflections,
    loadingPeerReflections,
    setSelectedMomentReflection,
    setShowMomentModal,
    showMomentModal,
    selectedMomentReflection,
}) => {
    const navigate = useNavigate();
    const [momentMessage, setMomentMessage] = useState("");
    const [sendingMoment, setSendingMoment] = useState(false)
    const [momentType, setMomentType] = useState("");
    const [hasTypedMessage, setHasTypedMessage] = useState(false)

    const scrollContainerRef = useRef(null);


    /** Shuffled Reflections */
    const shuffledReflections = useMemo(() => {
        return peerReflections.slice().sort(() => Math.random() - 0.5);
    }, [peerReflections]);

    /** Send a Moment with a message */
    const handleSendMoment = async (reflection, type, message = "") => {
        trackAction(`Moment ${momentType} - Sending`)
        setSendingMoment(true)
        const userId = localStorage.getItem("breatheUserId") || "unknown_user";
        const momentData = {
            type,
            to: reflection?.userId,
            from: userId,
            reflection: {
                id: reflection?.id,
                snapshot: reflection?.reflection
            },
            message,
        };

        try {
            await sendMoment(momentData);
            trackAction(`Moment ${momentType} - Sent`)
            // alert(`Your ${type} moment was sent. 🌱`);
            setSendingMoment(false)
            setShowMomentModal(false);
            navigate("/connect?section=moments", { replace: true });
        } catch (error) {
            trackAction(`Error - Moment ${momentType} - Sent`)
            alert("Failed to send moment. Please try again.");
        }
    };

    const hasFired = useRef({
        top: false,
        middle: false,
        bottom: false,
    });

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight - container.clientHeight;

        const scrollPercent = (scrollTop / scrollHeight) * 100;

        if (scrollPercent > 10 && !hasFired.current.top) {
            trackAction("Peer Reflections - Scrolled 10%");
            hasFired.current.top = true;
        }
        if (scrollPercent > 50 && !hasFired.current.middle) {
            trackAction("Peer Reflections - Scrolled 50%");
            hasFired.current.middle = true;
        }
        if (scrollPercent > 90 && !hasFired.current.bottom) {
            trackAction("Peer Reflections - Scrolled 100%");
            hasFired.current.bottom = true;
        }
    };

    return (
        <>
            <section
                id="peer-reflections"
                ref={scrollContainerRef}
                onScroll={handleScroll}
                // className="flex-shrink-0 w-full max-w-xs snap-center flex flex-col items-center"
                className="snap-center w-screen flex-shrink-0 overflow-y-auto h-[85vh] px-4 py-6 max-w-[500px] 
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
                        {shuffledReflections.map((reflection, index) => {

                            return (
                                <div
                                    key={reflection?.id}
                                    className="bg-[#fff9f3] rounded-2xl p-4 shadow-md border border-[#e4dfd8] hover:shadow-lg transition mb-5"
                                >

                                    {/* Reflection Text */}
                                    <p className="text-base leading-relaxed mb-2">
                                        {reflection?.reflection}
                                    </p>

                                    {/* Alias (if present) */}
                                    {reflection.alias && (
                                        <p className="text-xs italic text-gray-500 mb-2">
                                            — {reflection?.alias}
                                        </p>
                                    )}

                                    {/* Feeling */}
                                    <p className="text-sm text-gray-500 italic mb-3">
                                        Feeling: {reflection?.feeling}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap  gap-2 mb-5">
                                        {reflection?.tags.map((tag) => (
                                            // <span
                                            //     key={tag}
                                            //     className="bg-[#ece8e1] text-xs text-[#6e6861] px-2 py-1 rounded-full"
                                            // >
                                            //     #{tag}
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

                                    {/* Buttons */}
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => {
                                                trackAction(`Peer Reflections - 🤝 Relate`)
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
                                                trackAction(`Peer Reflections - 💛 Send Warmth`)
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
                            )
                        })}
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
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setMomentMessage(e.target.value)
                                    if (!hasTypedMessage && value.trim() !== "") {
                                        trackAction(`Moment ${momentType} - Typing Message`);
                                        setHasTypedMessage(true);
                                    }
                                }}
                                rows={3}
                                className="w-full border px-3 py-2 rounded mb-4"
                                placeholder="Write an optional message..."
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        trackAction(`Moment ${momentType} - Cancel`)
                                        setShowMomentModal(false)
                                    }}
                                    className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        handleSendMoment(selectedMomentReflection, momentType, momentMessage);
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