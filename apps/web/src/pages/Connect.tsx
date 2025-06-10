// src/pages/ConnectPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserReflections, fetchPeerReflections, sendMoment, fetchUserMoments } from "../functions/api";
import { getApproxTimeAgo } from "../utils";


const ConnectPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [loadingReflections, setLoadingReflections] = useState(false);
    const [yourReflections, setYourReflections] = useState([]);

    const [loadingPeerReflections, setLoadingPeerReflections] = useState(false);
    const [peerReflections, setPeerReflections] = useState([]);

    const [moments, setMoments] = useState([]);
    const [loadingMoments, setLoadingMoments] = useState(false);

    // Add these state variables at the top of the ConnectPage component:
    const [showMomentModal, setShowMomentModal] = useState(false);
    const [selectedMomentReflection, setSelectedMomentReflection] = useState(null);
    const [momentType, setMomentType] = useState("");
    const [momentMessage, setMomentMessage] = useState("");


    // const sections = [
    //     { id: "peer-reflections", label: "Peer Reflections" },
    //     { id: "your-reflections", label: "Your Reflections" },
    //     { id: "moments", label: "Moments" },
    //     { id: "walk-together", label: "Walk Together Requests" },
    // ];

    // Fetch reflections for 'Your Reflections' section
    useEffect(() => {
        if (location.search.includes("your-reflections")) {
            setLoadingReflections(true);
            fetchUserReflections()
                .then((data) => setYourReflections(data))
                .catch((error) => console.error("Failed to fetch reflections:", error))
                .finally(() => setLoadingReflections(false));
        } else if (location.search.includes("moments")) {
            setLoadingMoments(true);
            fetchUserMoments()
                .then((data) => setMoments(data))
                .catch((error) => console.error("Failed to fetch moments:", error))
                .finally(() => setLoadingMoments(false));
        } else if (location.search.includes("walk-together")) {

        }
        else /*if (location.search.includes("peer-reflections")) */ {
            if (!location.search.includes("peer-reflections"))
                navigate({
                    pathname: "/connect",
                    search: "?section=peer-reflections"
                }, { replace: true });
            setLoadingPeerReflections(true);
            fetchPeerReflections()
                .then((data) => setPeerReflections(data))
                .catch((error) => console.error("Failed to fetch peer reflections:", error))
                .finally(() => setLoadingPeerReflections(false));
        }
    }, [location.search]);

    // Fetch peer reflections for 'Peer Reflections' section
    useEffect(() => {

    }, [location.search]);

    // Fetch user moments for 'Moments' section
    useEffect(() => {

    }, [location.search]);


    // On mount, scroll to the section if there's a ?section= param
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sectionId = params.get("section");
        if (sectionId) {
            const el = document.getElementById(sectionId);
            el?.scrollIntoView({ behavior: "smooth", inline: "center" });
        }
    }, [location.search]);

    // On scroll end, update the URL query param
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const children = Array.from(container.children);
        const center = container.scrollLeft + container.clientWidth / 2;

        let closestSection = "";
        let closestDistance = Infinity;

        children.forEach((child) => {
            const el = child as HTMLElement;
            const rect = el.getBoundingClientRect();
            const elCenter = el.offsetLeft + el.offsetWidth / 2;
            const distance = Math.abs(elCenter - container.scrollLeft - container.clientWidth / 2);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = el.id;
            }
        });

        if (closestSection) {
            navigate(`/connect?section=${closestSection}`, { replace: true });
        }
    };

    const handleSendMoment = async (reflectionId, toUserId, type, message = "") => {
        const userId = localStorage.getItem("breatheUserId") || "unknown_user"; // fallback for testing
        // const message = type === "warmth" ? "Lots of love your way." : "I see you. 🌿";

        const momentData = {
            type,
            to: toUserId,
            from: userId,
            reflectionCardId: reflectionId,
            message,
        };

        try {
            await sendMoment(momentData);
            alert(`Your ${type} moment was sent. 🌱`);
            navigate({
                pathname: "/connect",
                search: "?section=moments"
            }, { replace: true });
        } catch (error) {
            alert("Failed to send moment. Please try again.");
        }
    };

    return (
        <>
            {/* Horizontal scroll hint */}
            {location.search.includes("peer-reflections") && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
                    <div className="animate-bounce text-[#9a958f] text-2xl">
                        →
                    </div>
                </div>
            )}

            {/* {(location.search.includes("your-reflections") || location.search.includes("moments")) && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
                    <div className="animate-bounce text-[#9a958f] text-2xl">
                        ← →
                    </div>
                </div>
            )}

            {location.search.includes("walk-together") && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
                    <div className="animate-bounce text-[#9a958f] text-2xl">
                        ←
                    </div>
                </div>
            )} */}


            <div
                ref={scrollContainerRef}
                onScroll={() => {
                    clearTimeout((scrollContainerRef.current as any)?.scrollTimeout);
                    (scrollContainerRef.current as any).scrollTimeout = setTimeout(
                        handleScroll,
                        100
                    );
                }}
                className="w-full bg-[#f4f1eb] text-[#5e5a55] font-serif flex overflow-x-auto snap-x snap-mandatory space-x-8 px-4 py-6"
            >
                {/* Peer Reflections */}
                <section
                    id="peer-reflections"
                    className="flex-shrink-0 w-full max-w-xs snap-center flex flex-col items-center"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                        Peer Reflections
                    </h2>
                    {loadingPeerReflections ? (
                        <p className="italic text-gray-500">Loading...</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {peerReflections.map((reflection) => (
                                <div
                                    key={reflection.id}
                                    className="bg-[#fff9f3] rounded-2xl p-6 shadow-md border border-[#e4dfd8] hover:shadow-lg transition"
                                >
                                    <p className="text-base leading-relaxed mb-4 text-center">{reflection.reflection}</p>
                                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                                        {reflection.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-[#ece8e1] text-xs text-[#6e6861] px-2 py-1 rounded-full"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedMomentReflection(reflection);
                                                setMomentType("relate");
                                                setMomentMessage("");
                                                setShowMomentModal(true);
                                            }}
                                            className="bg-[#ece8e1] hover:bg-[#e4dfd8] text-sm px-4 py-1 rounded-full shadow-sm transition">
                                            🤝 Relate
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedMomentReflection(reflection);
                                                setMomentType("warmth");
                                                setMomentMessage("");
                                                setShowMomentModal(true);
                                            }}
                                            className="bg-[#ece8e1] hover:bg-[#e4dfd8] text-sm px-4 py-1 rounded-full shadow-sm transition">
                                            💛 Send Warmth
                                        </button>
                                        {/* <button className="bg-[#ece8e1] hover:bg-[#e4dfd8] text-sm px-4 py-1 rounded-full shadow-sm transition">
                                    🚶 Walk Together
                                </button> */}
                                    </div>
                                </div>
                            ))
                            }</div>
                    )}
                </section>


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
                                    className="px-4 py-2 text-sm rounded bg-[#ece8e1] hover:bg-[#e4dfd8] transition"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Your Reflections */}
                <section
                    id="your-reflections"
                    className="flex-shrink-0 w-full max-w-xs snap-center flex flex-col items-center"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                        Your Reflections
                    </h2>
                    {loadingReflections ? (
                        <p className="italic text-gray-500">Loading...</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {yourReflections.map((reflection) => (
                                <div
                                    key={reflection.id}
                                    className="bg-[#fff9f3] rounded-2xl p-4 shadow-md border border-[#e4dfd8] hover:shadow-lg transition"
                                >
                                    <p className="text-base leading-relaxed mb-2">
                                        {reflection.reflection}
                                    </p>
                                    <p className="text-sm italic text-gray-500 mb-2">
                                        Feeling: {reflection.feeling}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {reflection.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-[#ece8e1] text-xs text-[#6e6861] px-2 py-1 rounded-full"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Moments */}
                <section
                    id="moments"
                    className="flex-shrink-0 w-full max-w-xs snap-center flex flex-col items-center"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-center">Moments</h2>
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

                {/* Walk Together Requests */}
                <section
                    id="walk-together"
                    className="flex-shrink-0 w-full max-w-xs snap-center flex flex-col items-center"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                        Walk Together Requests
                    </h2>
                    <div className="flex flex-col gap-4">
                        {/* Sample card with grayed-out look */}
                        <div
                            className="bg-[#f1efea] rounded-2xl p-6 shadow-inner border border-[#ddd] opacity-70 cursor-not-allowed transition"
                        >
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
            </div>
        </>

    );
};

export default ConnectPage;