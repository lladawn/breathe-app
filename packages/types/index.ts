export type ReflectionCard = {
  id: string; // UUID
  userId: string; // internal UUID, never shown // // Who created it (used for chat if accepted)
  alias: string; // anonymous name (e.g., “Willow Wind”)
  feeling: string; // short mood (e.g., “Tender ache”)
  reflection: string; // user’s shared message
  tags?: string[];
  createdAt: string; // ISO timestamp
  status: "active" | "archived"; // shown in room or not
};

export type Moment = {
  id: string;
  type: "relate" | "warmth"; // reaction type
  reflectionCardId: string;
  timestamp: string;
  message?: string; // optional message, eg. for warmth
};

export type WalkStatus = "requested" | "accepted" | "idled";

export type WalkTogetherRequest = {
  id: string;

  // The reflection that was selected to walk with
  reflectionCardId: string;

  // Backend-only user IDs
  creatorUserId: string; // owner of the reflectionCard
  walkerUserId: string; // the one who initiates the walk

  // Request state
  status: "pending" | "accepted" | "expired";

  createdAt: string;
  respondedAt?: string;
};
