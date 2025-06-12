import { db } from "../lib/mongo";
import { corsHeaders } from "../utils";

const reflections = db.collection("reflections");

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
    const results = await reflections
      .find({
        userId,
        status: { $ne: "archived" },
      })
      .sort({ createdAt: -1 })
      .toArray();

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(results),
    };
  } catch (err: any) {
    console.error("Mongo getUserReflections error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Failed to fetch user reflections." }),
    };
  }
};
