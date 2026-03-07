import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import { db } from "../lib/mongo";
import streamClient from "../lib/stream";
import { corsHeaders } from "../utils";

const walkRequests = db.collection("walk_requests");
const walkRooms = db.collection("walk_rooms");

const ROOM_EXPIRY_DAYS = 14;

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body);
    const { requestId, accepterId } = body;

    if (!requestId || !accepterId) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error: "Missing required fields: requestId or accepterId",
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

    const senderId = request.senderId;
    const reflectionId = request.reflectionId;
    const requestMessage = request.message;

    if (request.receiverId !== accepterId) {
      return {
        statusCode: 403,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Only the receiver can accept this request." }),
      };
    }

    const roomId = uuidv4();

    // ensure users exist in Stream
    await streamClient.upsertUsers([
      { id: senderId },
      { id: accepterId }
    ]);
    // create channel
    const channel = streamClient.channel("messaging", roomId, {
      members: [senderId, accepterId],
      created_by_id: accepterId
    });
    await channel.create();

    const now = new Date();
    const expiresAt = new Date(
      now.getTime() + ROOM_EXPIRY_DAYS * 24 * 60 * 60 * 1000
    );

    const roomDoc = {
      id: roomId,
      reflectionId,
      users: [senderId, accepterId],
      streamChannelId: channel.id,
      createdAt: now,
      lastMessageAt: now,
      expiresAt,
      status: "active" as const,
      ...(requestMessage != null && requestMessage !== "" && { requestMessage }),
    };

    await walkRooms.insertOne(roomDoc);
    await walkRequests.updateOne(
      { _id: new ObjectId(requestId) },
      { $set: { status: "accepted" } }
    );

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        roomId,
        streamChannelId: channel.id,
      }),
    };
  } catch (err: any) {
    console.error("acceptWalkRequest error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Failed to accept walk request." }),
    };
  }
};
