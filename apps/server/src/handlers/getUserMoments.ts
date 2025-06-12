import { db } from "../lib/mongo";
import { corsHeaders } from "../utils";

const moments = db.collection("moments");

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
    // Optional: fade logic — only keep moments from last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Fetch moments where user is either the sender or the recipient
    const results = await moments
      .find({
        $or: [{ from: userId }, { to: userId }],
        timestamp: { $gte: sevenDaysAgo.toISOString() },
      })
      .sort({ timestamp: -1 })
      .toArray();

    // Add direction field based on whether the user sent or received
    const processedResults = results.map((moment) => {
      const direction = moment.from === userId ? "sent" : "received";
      return {
        ...moment,
        direction,
      };
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(processedResults),
    };
  } catch (err: any) {
    console.error("Mongo getUserMoments error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Failed to fetch user moments." }),
    };
  }
};
