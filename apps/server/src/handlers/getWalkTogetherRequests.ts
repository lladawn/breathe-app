import { db } from "../lib/mongo";
import { corsHeaders } from "../utils";

const walkTogetherRequests = db.collection("walkTogetherRequests");

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
    const sent = await walkTogetherRequests
      .find({
        walkerUserId: userId,
      })
      .sort({ createdAt: -1 })
      .toArray();

    const received = await walkTogetherRequests
      .find({
        creatorUserId: userId,
      })
      .sort({ createdAt: -1 })
      .toArray();

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ sent, received }),
    };
  } catch (err: any) {
    console.error("Mongo getWalkTogetherRequests error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Failed to fetch Walk Together requests.",
      }),
    };
  }
};
