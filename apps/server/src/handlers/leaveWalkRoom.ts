import { db } from "../lib/mongo";
import { corsHeaders } from "../utils";

const walkRooms = db.collection("walk_rooms");

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const { roomId, userId } = body;

    if (!roomId || !userId) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Missing required fields: roomId or userId",
        }),
      };
    }

    const room = await walkRooms.findOne({ id: roomId });

    if (!room) {
      return {
        statusCode: 404,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Walk room not found." }),
      };
    }

    const users: string[] = room.users || [];
    if (!users.includes(userId)) {
      return {
        statusCode: 403,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "You are not part of this walk room.",
        }),
      };
    }

    await walkRooms.updateOne(
      { id: roomId },
      {
        $set: {
          status: "closed",
          closedAt: new Date().toISOString(),
        },
      }
    );

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true }),
    };
  } catch (err: any) {
    console.error("leaveWalkRoom error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Failed to leave walk room." }),
    };
  }
};
