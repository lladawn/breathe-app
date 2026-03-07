import { ObjectId } from "mongodb";
import { db } from "../lib/mongo";
import { corsHeaders } from "../utils";

const walkRequests = db.collection("walk_requests");

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const { requestId, declinerId } = body;

    if (!requestId || !declinerId) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Missing required fields: requestId or declinerId",
        }),
      };
    }

    let request;
    try {
      request = await walkRequests.findOne({
        _id: new ObjectId(requestId),
      });
    } catch {
      request = null;
    }

    if (!request) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Walk request not found." }),
      };
    }

    if (request.status !== "pending") {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Request is no longer pending.",
        }),
      };
    }

    if (request.receiverId !== declinerId) {
      return {
        statusCode: 403,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Only the receiver can decline this request.",
        }),
      };
    }

    await walkRequests.updateOne(
      { _id: new ObjectId(requestId) },
      { $set: { status: "declined" } }
    );

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true }),
    };
  } catch (err: any) {
    console.error("declineWalkRequest error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Failed to decline walk request." }),
    };
  }
};

