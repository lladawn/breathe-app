import { db } from "../lib/mongo";
import { corsHeaders } from "../utils";

const walkRequests = db.collection("walk_requests");
const reflections = db.collection("reflections");

const PREVIEW_LENGTH = 140;

function buildReflectionPreviewMap(reflectionIds: string[]) {
  const unique = [...new Set(reflectionIds.filter(Boolean))];
  if (unique.length === 0) return Promise.resolve(new Map<string, string>());
  return reflections
    .find({ id: { $in: unique } })
    .toArray()
    .then((docs) => {
      const map = new Map<string, string>();
      for (const d of docs) {
        const text = d.reflection;
        map.set(d.id, typeof text === "string" ? text.slice(0, PREVIEW_LENGTH) : "");
      }
      return map;
    });
}

export const handler = async (event: any) => {
  const userId = event.queryStringParameters?.userId?.trim();

  if (!userId) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Missing required query parameter: userId",
      }),
    };
  }

  try {
    const [received, sent] = await Promise.all([
      walkRequests
        .find({
          receiverId: userId,
          status: "pending",
        })
        .sort({ createdAt: -1 })
        .toArray(),
      walkRequests
        .find({
          senderId: userId,
        })
        .sort({ createdAt: -1 })
        .toArray(),
    ]);

    const reflectionIds = [
      ...received.map((r: any) => r.reflectionId),
      ...sent.map((r: any) => r.reflectionId),
    ];
    const previewMap = await buildReflectionPreviewMap(reflectionIds);

    const addPreview = (req: any) => {
      const preview = previewMap.get(req.reflectionId) ?? "";
      return { ...req, reflectionPreview: preview };
    };

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        received: received.map(addPreview),
        sent: sent.map(addPreview),
      }),
    };
  } catch (err: any) {
    console.error("getWalkRequests error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Failed to fetch walk requests.",
      }),
    };
  }
};
