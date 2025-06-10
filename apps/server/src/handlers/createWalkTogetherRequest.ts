import { v4 as uuidv4 } from "uuid";
import { db } from "../lib/mongo";
import { corsHeaders } from "../utils";

const walkTogetherRequests = db.collection("walkTogetherRequests");

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body);
    const { reflectionCardId, creatorUserId, walkerUserId } = body;

    if (!reflectionCardId || !creatorUserId || !walkerUserId) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error:
            "Missing required fields: reflectionCardId, creatorUserId, or walkerUserId",
        }),
      };
    }

    const request = {
      id: uuidv4(),
      reflectionCardId,
      creatorUserId,
      walkerUserId,
      status: "pending", // "accepted", "expired"
      createdAt: new Date().toISOString(),
      respondedAt: null,
    };

    await walkTogetherRequests.insertOne(request);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: "Walk Together request sent.", request }),
    };
  } catch (err: any) {
    console.error("Mongo createWalkTogetherRequest error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Failed to send Walk Together request." }),
    };
  }
};
