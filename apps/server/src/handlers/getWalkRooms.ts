import { db } from "../lib/mongo";
import { corsHeaders } from "../utils";

const walkRooms = db.collection("walk_rooms");
const reflections = db.collection("reflections");

const PREVIEW_LENGTH = 140;

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
    const results = await walkRooms
      .find({
        users: userId,
        status: "active",
      })
      .sort({ createdAt: -1 })
      .toArray();

    const reflectionIds = results.map((r: any) => r.reflectionId).filter(Boolean);
    let previewMap = new Map<string, string>();

    if (reflectionIds.length > 0) {
      const unique = [...new Set(reflectionIds)];
      const docs = await reflections.find({ id: { $in: unique } }).toArray();
      for (const d of docs) {
        const text = d.reflection;
        previewMap.set(
          d.id,
          typeof text === "string" ? text.slice(0, PREVIEW_LENGTH) : ""
        );
      }
    }

    const enriched = results.map((room: any) => ({
      ...room,
      reflectionPreview: previewMap.get(room.reflectionId) ?? "",
    }));

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(enriched),
    };
  } catch (err: any) {
    console.error("getWalkRooms error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Failed to fetch walk rooms.",
      }),
    };
  }
};
