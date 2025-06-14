import { getApproxTimeAgo } from "../../utils";

const getDisplayMessage = (moment) => {
    const emojis = {
        warmth: "💛",
        relate: "🤝",
        default: "🌿"
    };

    const actions = {
        sent: {
            warmth: "You sent warmth",
            relate: "You related to someone",
            default: "You sent a moment"
        },
        received: {
            warmth: "Someone sent warmth your way",
            relate: "Someone related to your reflection",
            default: "A moment was shared"
        }
    };

    const emoji = emojis[moment.type] || emojis.default;
    const verb = actions[moment.direction]?.[moment.type] || actions[moment.direction]?.default || "";
    const message = moment.message ? `: “${moment.message}”` : ".";

    return `${emoji} ${verb}${message}`;
};

const MomentsSection = ({ moments, loadingMoments }) => {
    return (
        <section
            id="moments"
            className="snap-center w-screen flex-shrink-0 overflow-y-auto h-full px-4 py-6 max-w-[500px] 
            flex flex-col items-center"
        >
            <h2 className="text-2xl font-semibold mb-4 text-center">Moments</h2>
            <p className="italic text-sm text-center text-[#6e6861] mb-4">
                “A moment shared can't be undone, or wiped out, only fades or embraces with time.” 🌱
            </p>

            <div className="flex flex-col gap-0">
                {loadingMoments ? (
                    <p className="italic text-gray-500">Loading moments...</p>
                ) : moments.length === 0 ? (
                    <p className="italic text-gray-500 mt-5">Some moments take time.</p>
                ) : (
                    moments.map((moment) => {
                        const timeAgo = getApproxTimeAgo(moment.timestamp);
                        const message = getDisplayMessage(moment);
                        const reflectionText = moment.reflection?.snapshot;

                        return (
                            <div
                                key={moment._id}
                                className="bg-[#fff9f3] rounded-2xl p-6 shadow-md border border-[#e4dfd8] hover:shadow-lg transition min-w-[320px] mb-5"
                            >
                                <p className="text-base leading-relaxed text-center mb-2">{message}</p>

                                {reflectionText && (
                                    <p className="text-sm text-[#5e5a55] italic text-center mb-2">
                                        “{reflectionText}”
                                    </p>
                                )}

                                <p className="text-xs text-gray-500 text-center italic">{timeAgo}</p>
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default MomentsSection;