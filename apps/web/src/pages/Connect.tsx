import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    fetchUserReflections,
    fetchPeerReflections,
    sendMoment,
    fetchUserMoments,
    createReflection
} from "../functions/api";
import PeerReflectionsSection from "../components/connect/PeerReflectionsSection";
import YourReflectionsSection from "../components/connect/YourReflectionsSection";
import MomentsSection from "../components/connect/MomentsSection";
import WalkTogetherRequestsSection from "../components/connect/WalkTogetherRequestsSection";
import SectionDropdown from "../components/connect/SectionDropdown";
import LottieAnimation from "../components/LottieAnimation";
import laying from "../assets/animations/laying.json"
import { trackAction } from "../utils/umami";

const sections = {
    peerReflections: "peer-reflections",
    yourReflections: "your-reflections",
    moments: "moments",
    walkTogether: "walk-together"
}

const ConnectPage: React.FC = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const sectionId = params.get("section");

    const navigate = useNavigate();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [loadingReflections, setLoadingReflections] = useState(false);
    const [yourReflections, setYourReflections] = useState([]);

    const [loadingPeerReflections, setLoadingPeerReflections] = useState(false);
    const [peerReflections, setPeerReflections] = useState([]);

    const [moments, setMoments] = useState([]);
    const [loadingMoments, setLoadingMoments] = useState(false);

    const [showMomentModal, setShowMomentModal] = useState(false);
    const [selectedMomentReflection, setSelectedMomentReflection] = useState(null);


    const [showRawReflectionModal, setShowRawReflectionModal] = useState(false);
    const [reflectionMetadata, setReflectionMetadata] = useState({
        reflection: "",
        alias: "",
        feeling: "",
        tags: [],
    });
    const [submittingReflection, setSubmittingReflection] = useState(false)

    const loadYourReflections = () => {
        setLoadingReflections(true);
        fetchUserReflections()
            .then((data) => setYourReflections(data))
            .catch((error) => console.error("Failed to fetch reflections:", error))
            .finally(() => setLoadingReflections(false));
    }

    useEffect(() => {
        if (location.search.includes("your-reflections")) {
            trackAction("Connect - Your Reflections Viewed")
            loadYourReflections();

        } else if (location.search.includes("moments")) {
            trackAction("Connect - Moments Viewed")
            setLoadingMoments(true);
            fetchUserMoments()
                .then((data) => setMoments(data))
                .catch((error) => console.error("Failed to fetch moments:", error))
                .finally(() => setLoadingMoments(false));
        } else if (location.search.includes("walk-together")) {
            trackAction("Connect - Walk Together Viewed")
            return
        } else {
            trackAction("Connect - Peer Reflections Viewed")
            if (!location.search.includes("peer-reflections"))
                navigate({
                    pathname: "/connect",
                    search: "?section=peer-reflections",
                }, { replace: true });
            setLoadingPeerReflections(true);
            fetchPeerReflections()
                .then((data) => setPeerReflections(data))
                .catch((error) => console.error("Failed to fetch peer reflections:", error))
                .finally(() => setLoadingPeerReflections(false));
        }
    }, [location.search, navigate]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sectionId = params.get("section");
        if (sectionId) {
            const el = document.getElementById(sectionId);
            el?.scrollIntoView({ behavior: "smooth", inline: "center" });
        }
    }, [location.search]);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const children = Array.from(container.children);
        let closestSection = "";
        let closestDistance = Infinity;

        children.forEach((child) => {
            const el = child as HTMLElement;
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



    const handleRawReflectionSubmit = async () => {
        trackAction("Share Raw - Submit")
        setSubmittingReflection(true)
        try {
            const { reflection, alias, feeling, tags } = reflectionMetadata;
            if (!reflection.trim()) {
                alert("Please write something before sharing. 🌱");
                return;
            }

            const userId = localStorage.getItem("breatheUserId") || "unknown_user";
            const reflectionData = {
                userId,
                alias,
                feeling,
                reflection,
                tags,
            };

            await createReflection(reflectionData);
            trackAction("Share Raw - Submit success")

            // alert("Your reflection has been shared with peers. 🌿");
            setSubmittingReflection(false)
            setShowRawReflectionModal(false);
            navigate("/connect?section=your-reflections", { replace: true });
            loadYourReflections();
        } catch (error) {
            console.error("Error sharing raw reflection:", error);
            alert("Failed to share reflection. Please try again. 🌱");
        }
    };

    return (
        <>
            <LottieAnimation animation={laying} opacity={0.2} scale={2.3} />

            {/* Horizontal scroll hint */}
            {location.search.includes("peer-reflections") && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
                    <div className="animate-bounce text-[#9a958f] text-2xl">
                        →
                    </div>
                </div>
            )}

            {(location.search.includes("your-reflections") || location.search.includes("moments")) && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
                    <div className="animate-bounce text-[#9a958f] text-2xl">
                        {/* <span className="italic text-center text-xs">Swipe</span> <br /> */}
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
            )}

            <SectionDropdown
                currentSection={sectionId}
            />



            {/** Horizontal Scroll Sections */}
            <div
                ref={scrollContainerRef}
                onScroll={() => {
                    clearTimeout((scrollContainerRef.current as any)?.scrollTimeout);
                    (scrollContainerRef.current as any).scrollTimeout = setTimeout(
                        handleScroll,
                        100
                    );
                }}
                // className="w-full bg-[#f4f1eb] text-[#5e5a55] font-serif flex overflow-x-auto snap-x snap-mandatory space-x-8 px-4 py-6"

                className="
                    w-screen overflow-x-auto scrollbar-hide snap-x 
                    snap-mandatory flex
                    text-[#5e5a55] font-serif
                    h-screen overflow-y-hidden py-20
                    scroll-smooth
                    max-w-[500px]
                "
            //   bg-[#f4f1eb]

            >
                {
                    // sectionId === sections.peerReflections &&
                    <PeerReflectionsSection
                        peerReflections={peerReflections}
                        loadingPeerReflections={loadingPeerReflections}
                        setSelectedMomentReflection={setSelectedMomentReflection}
                        setShowMomentModal={setShowMomentModal}
                        showMomentModal={showMomentModal}
                        selectedMomentReflection={selectedMomentReflection}
                    />
                }

                {
                    // sectionId === sections.yourReflections &&
                    <YourReflectionsSection
                        yourReflections={yourReflections}
                        loadingReflections={loadingReflections}
                        showRawReflectionModal={showRawReflectionModal}
                        setShowRawReflectionModal={setShowRawReflectionModal}
                        reflectionMetadata={reflectionMetadata}
                        setReflectionMetadata={setReflectionMetadata}
                        handleRawReflectionSubmit={handleRawReflectionSubmit}
                        submittingReflection={submittingReflection}
                    />
                }

                {
                    // sectionId === sections.moments &&
                    <MomentsSection
                        moments={moments}
                        loadingMoments={loadingMoments}
                    />
                }

                {
                    // sectionId === sections.walkTogether &&
                    <WalkTogetherRequestsSection />
                }
            </div>
        </>

    );
};

export default ConnectPage;