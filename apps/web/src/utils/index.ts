export function getApproxTimeAgo(timestamp) {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = (now as any) - (then as any);

  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

  return "A while ago";
}

export const getRandomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70;
  const lightness = 85;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export function defaultMetadata() {
  return {
    reflection: "I’ve been pausing to listen to myself more.",
    alias: "Quiet Flame",
    feeling: "Sitting with what is",
    tags: ["reflection", "stillness", "softness"],
  };
}

export function trimConvoForReflection(convo, maxTokens = 2000) {
  const userMessages = convo.filter(
    (msg) =>
      msg.role === "user" ||
      (msg.role === "assistant" && msg.content.length < 200)
  );

  let total = 0;
  const limited = [];

  for (let i = userMessages.length - 1; i >= 0; i--) {
    const msg = userMessages[i];
    total += msg.content.length;
    if (total > maxTokens) break;
    limited.unshift(msg);
  }

  return limited;
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
