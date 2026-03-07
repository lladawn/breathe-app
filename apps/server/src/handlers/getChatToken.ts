import streamClient from "../lib/stream";
import { corsHeaders } from "../utils";

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
    const token = streamClient.createToken(userId);
    console.log({token})

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ token }),
    };
  } catch (err: any) {
    console.error("getChatToken error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Failed to create chat token." }),
    };
  }
};
