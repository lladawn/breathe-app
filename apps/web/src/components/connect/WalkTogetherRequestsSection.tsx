import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    fetchWalkRequests,
    fetchWalkRooms,
    acceptWalkRequest,
    declineWalkRequest,
} from "../../functions/api";
import { trackAction } from "../../utils/umami";

const WalkTogetherRequestsSection = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [receivedRequests, setReceivedRequests] = useState<any[]>([]);
    const [sentRequests, setSentRequests] = useState<any[]>([]);
    const [walkRooms, setWalkRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [processingAction, setProcessingAction] = useState<"accept" | "decline" | null>(null);
    const [activeTab, setActiveTab] = useState<"active" | "received" | "sent">("active");

    const loadRequests = async () => {
        setLoading(true);
        trackAction("Walk Together - Requests Load");

        try {
            const data = await fetchWalkRequests();

            if (Array.isArray(data)) {
                setReceivedRequests(data);
                setSentRequests([]);
            } else {
                setReceivedRequests(data?.received || []);
                setSentRequests(data?.sent || []);
            }

            const rooms = await fetchWalkRooms();
            if (Array.isArray(rooms)) {
                setWalkRooms(rooms);
            } else {
                setWalkRooms(Array.isArray(rooms?.rooms) ? rooms.rooms : []);
            }
        } catch (error) {
            console.error("Failed to fetch walk data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRequests();
    }, [location.search, activeTab]);

    const handleAccept = async (req: any) => {
        if (!req?._id) return;
        const id = req._id.toString();

        setProcessingId(id);
        setProcessingAction("accept");
        trackAction("Walk Together - Accept Click");

        try {
            await acceptWalkRequest(id);
            trackAction("Walk Together - Accept Success");
            await loadRequests();
            setActiveTab("active");
        } catch (error) {
            console.error("Error accepting walk request:", error);
            trackAction("Walk Together - Accept Error");
            alert("Failed to accept walk request. Please try again.");
        } finally {
            setProcessingId(null);
            setProcessingAction(null);
        }
    };

    const handleDecline = async (req: any) => {
        if (!req?._id) return;
        const id = req._id.toString();

        setProcessingId(id);
        setProcessingAction("decline");
        trackAction("Walk Together - Maybe Later Click");

        try {
            await declineWalkRequest(id);
            trackAction("Walk Together - Maybe Later Success");
            await loadRequests();
        } catch (error) {
            console.error("Error declining walk request:", error);
            trackAction("Walk Together - Maybe Later Error");
            alert("Failed to update walk request. Please try again.");
        } finally {
            setProcessingId(null);
            setProcessingAction(null);
        }
    };

    const hasAnyRequests =
        receivedRequests.length > 0 || sentRequests.length > 0 || walkRooms.length > 0;

    return (
        <section id="walk-together"
            // className="flex-shrink-0 w-full max-w-xs snap-center flex flex-col items-center"
            className="snap-center w-screen flex-shrink-0 overflow-y-auto h-full px-4 py-6 max-w-[500px] flex 
            flex-col items-center"
        >
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Walk Together Requests
            </h2>
            <p className="italic text-sm text-center text-[#6e6861] mb-4">
                “A walk to just <span className="font-bold">be</span>.” 🌱
            </p>

            {loading && (
                <p className="italic text-gray-500 mt-4 text-center">
                    Loading walk requests...
                </p>
            )}

            {!loading && !hasAnyRequests && (
                <div className="mt-4 text-center text-[#6e6861] text-sm">
                    <p className="italic text-gray-500">
                        No walks in progress yet.
                    </p>
                    <p className="mt-2 text-xs italic text-[#9a958f] whitespace-pre-line">
                        {`When a walk begins,\nyou’ll see it here.`}
                    </p>
                </div>
            )}

            {!loading && hasAnyRequests && (
                <div className="flex flex-col gap-4 w-full">
                    {/* Tabs */}
                    <div className="flex justify-center gap-2 mb-2">
                        <button
                            onClick={() => {
                                trackAction("Walk Together - Tab Active Walks");
                                setActiveTab("active");
                            }}
                            className={`px-3 py-1 text-sm rounded-full border shadow-sm ${
                                activeTab === "active" 
                                    ? "bg-white text-[#5e5a55] border-[#ddd]"
                                    : "bg-[#ece8e1] text-[#9a958f] border-[#e4dfd8]"
                            }`}
                        >
                            Active Walks ({walkRooms.length})
                        </button>
                        <button
                            onClick={() => {
                                trackAction("Walk Together - Tab Received");
                                setActiveTab("received");
                            }}
                            className={`px-3 py-1 text-sm rounded-full border shadow-sm ${
                                activeTab === "received"
                                    ? "bg-white text-[#5e5a55] border-[#ddd]"
                                    : "bg-[#ece8e1] text-[#9a958f] border-[#e4dfd8]"
                            }`}
                        >
                            Received ({receivedRequests.length})
                        </button>
                        <button
                            onClick={() => {
                                trackAction("Walk Together - Tab Sent");
                                setActiveTab("sent");
                            }}
                            className={`px-3 py-1 text-sm rounded-full border shadow-sm ${
                                activeTab === "sent"
                                    ? "bg-white text-[#5e5a55] border-[#ddd]"
                                    : "bg-[#ece8e1] text-[#9a958f] border-[#e4dfd8]"
                            }`}
                        >
                            Sent ({sentRequests.length})
                        </button>
                    </div>

                    {/* Active Walks tab */}
                    {activeTab === "active" && (
                        <div className="bg-[#fff9f3] rounded-2xl p-6 shadow-md border border-[#e4dfd8] transition">
                            <h3 className="text-lg font-semibold mb-3 text-center">
                                Active Walks
                            </h3>
                            {walkRooms.length === 0 ? (
                                <div className="text-center text-xs italic text-[#9a958f] whitespace-pre-line">
                                    {`No walks in progress yet.\nWhen a walk begins,\nyou’ll see it here.`}
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    {walkRooms.map((room: any) => {
                                        const previewSource =
                                            room.reflectionPreview ?? "";
                                        const preview =
                                            previewSource.length > 0
                                                ? previewSource.length > 140
                                                    ? `${previewSource.slice(0, 140)}…`
                                                    : previewSource
                                                : "Reflection that began this walk.";

                                        const last =
                                            room.lastMessageAt || room.createdAt;
                                        const lastLabel = last
                                            ? new Date(last).toLocaleString()
                                            : null;

                                        const requestMessage =
                                            room.requestMessage?.trim();
                                        return (
                                            <li
                                                key={room.id}
                                                className="bg-[#fff9f3] rounded-2xl p-4 shadow border border-[#e4dfd8]"
                                            >
                                                <p className="text-sm text-[#5e5a55] mb-2 text-center">
                                                    You are walking with a fellow breather.
                                                </p>
                                                <p className="text-xs italic text-[#6e6861] mb-3 text-center">
                                                    “{preview}...”
                                                </p>
                                                {requestMessage && (
                                                    <p className="text-sm text-[#5e5a55] mb-2 text-center">
                                                        “{requestMessage}”
                                                    </p>
                                                )}
                                                {lastLabel && (
                                                    <p className="text-[11px] text-[#9a958f] mb-3 text-center">
                                                        Last activity: {lastLabel}
                                                    </p>
                                                )}
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => {
                                                            trackAction("Walk Together - Continue Walk");
                                                            navigate(`/walk/${room.id}`);
                                                        }}
                                                        className="bg-[#ece8e1] hover:bg-[#e4dfd8] text-sm px-4 py-1 rounded-full shadow-sm text-[#5e5a55] transition"
                                                    >
                                                        🚶 Continue Walk
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    )}

                    {/* Received tab */}
                    {activeTab === "received" && (
                        <div className="bg-[#f1efea] rounded-2xl p-6 shadow-inner border border-[#ddd] transition">
                            <h3 className="text-lg font-semibold mb-3 text-center">
                                Requests you&apos;ve received
                            </h3>
                            {receivedRequests.length === 0 ? (
                                <p className="text-xs italic text-[#9a958f] text-center">
                                    No received requests yet.
                                </p>
                            ) : (
                                <ul className="space-y-4">
                                    {receivedRequests.map((req: any) => {
                                        const id = req._id?.toString() || "";
                                        const isAccepting =
                                            processingId === id && processingAction === "accept";
                                        const isDeclining =
                                            processingId === id && processingAction === "decline";

                                        const reflectionPreview =
                                            req.reflectionPreview?.trim();
                                        const previewText = reflectionPreview
                                            ? reflectionPreview.length > 140
                                                ? `${reflectionPreview.slice(0, 140)}…`
                                                : reflectionPreview
                                            : null;
                                        return (
                                            <li
                                                key={id}
                                                className="bg-[#fff9f3] rounded-2xl p-4 shadow border border-[#e4dfd8]"
                                            >
                                                {previewText && (
                                                    <p className="text-xs italic text-[#6e6861] mb-2 text-center">
                                                        “{previewText}...”
                                                    </p>
                                                )}
                                                <p className="text-sm text-[#5e5a55] text-center">
                                                    {req.message
                                                        ? `"${req.message}"`
                                                        : "A fellow breather invited you to walk together."}
                                                </p>
                                                <div className="flex justify-center gap-3 mt-3">
                                                    <button
                                                        onClick={() => handleAccept(req)}
                                                        disabled={isAccepting || isDeclining}
                                                        className="bg-[#e4dfd8] hover:bg-[#ddd8ce] text-[#5e5a55] text-sm px-4 py-1 rounded-full shadow-sm transition disabled:opacity-70 disabled:cursor-not-allowed"
                                                    >
                                                        {isAccepting ? "Walking..." : "🚶 Walk"}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDecline(req)}
                                                        disabled={isAccepting || isDeclining}
                                                        className="bg-[#e8e4dc] hover:bg-[#e4dfd8] text-[#5e5a55] text-sm px-4 py-1 rounded-full shadow-sm transition disabled:opacity-70 disabled:cursor-not-allowed"
                                                    >
                                                        {isDeclining ? "Updating..." : "🕊️ Maybe Later"}
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    )}

                    {/* Sent tab */}
                    {activeTab === "sent" && (
                        <div className="bg-[#f1efea] rounded-2xl p-6 shadow-inner border border-[#ddd] transition">
                            <h3 className="text-lg font-semibold mb-3 text-center">
                                Requests you&apos;ve sent
                            </h3>
                            {sentRequests.length === 0 ? (
                                <p className="text-xs italic text-[#9a958f] text-center">
                                    No sent requests yet.
                                </p>
                            ) : (
                                <ul className="space-y-4">
                                    {sentRequests.map((req: any) => {
                                        const reflectionPreview =
                                            req.reflectionPreview?.trim();
                                        const previewText = reflectionPreview
                                            ? reflectionPreview.length > 140
                                                ? `${reflectionPreview.slice(0, 140)}…`
                                                : reflectionPreview
                                            : null;
                                        return (
                                            <li
                                                key={req._id}
                                                className="bg-[#fff9f3] rounded-2xl p-4 shadow border border-[#e4dfd8]"
                                            >
                                                {previewText && (
                                                    <p className="text-xs italic text-[#6e6861] mb-2 text-center">
                                                        “{previewText}...”
                                                    </p>
                                                )}
                                                <p className="text-sm text-[#5e5a55] text-center">
                                                    {req.message
                                                        ? `"${req.message}"`
                                                        : "You invited a fellow breather to walk together."}
                                                </p>
                                                <span className="block text-xs italic text-[#9a958f] mt-2 text-center">
                                                    Status: {req.status}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default WalkTogetherRequestsSection;