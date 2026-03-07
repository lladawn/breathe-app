import { db } from "../lib/mongo";
import { corsHeaders } from "../utils";

const walkRequests = db.collection("walk_requests");

const WALK_REQUESTS_PER_DAY = 10;

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body);
    const { senderId, receiverId, reflectionId, message } = body;

    if (!senderId || !receiverId || !reflectionId) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Missing required fields: senderId, receiverId, or reflectionId",
        }),
      };
    }

    const startOfToday = new Date();
    startOfToday.setUTCHours(0, 0, 0, 0);

    const countToday = await walkRequests.countDocuments({
      senderId,
      createdAt: { $gte: startOfToday },
    });

    if (countToday >= WALK_REQUESTS_PER_DAY) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Daily walk request limit reached",
        }),
      };
    }

    const existingPending = await walkRequests.findOne({
      senderId,
      receiverId,
      reflectionId,
      status: "pending",
    });

    if (existingPending) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Request already sent",
        }),
      };
    }

    const doc = {
      senderId,
      receiverId,
      reflectionId,
      ...(message != null && { message }),
      status: "pending" as const,
      createdAt: new Date(),
    };

    const result = await walkRequests.insertOne(doc);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        message: "Walk request sent.",
        request: { ...doc, _id: result.insertedId },
      }),
    };
  } catch (err: any) {
    console.error("sendWalkRequest error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Failed to send walk request." }),
    };
  }
};
