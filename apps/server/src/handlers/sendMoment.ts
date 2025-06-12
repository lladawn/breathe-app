import { v4 as uuidv4 } from "uuid";
import { db } from "../lib/mongo";
import { corsHeaders } from "../utils";

const moments = db.collection("moments");

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body);
    const { type, reflection, message, to, from } = body;

    if (!type || !reflection || !to || !from) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Missing required fields: type or reflection or to or from",
        }),
      };
    }

    if (!["relate", "warmth"].includes(type)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Invalid moment type." }),
      };
    }

    const moment = {
      id: uuidv4(),
      type,
      reflection, // For matching the specific reflection
      to, // For listing moments received by a user (this is the recipient)
      from, // From listing the moments they sent (this is the sender)
      message: message || null,
      timestamp: new Date().toISOString(),
    };

    await moments.insertOne(moment);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: "Moment sent.", moment }),
    };
  } catch (err: any) {
    console.error("Mongo createMoment error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Failed to send moment." }),
    };
  }
};
