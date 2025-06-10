import { db } from "../lib/mongo";
import { corsHeaders } from "../utils";

const reflections = db.collection("reflections");

export const handler = async (event: any) => {
  const userId = event.queryStringParameters?.userId?.trim();
  const tagsParam = event.queryStringParameters?.tags;

  if (!userId) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Missing required query parameter: userId",
      }),
    };
  }

  let query: any = {
    userId: { $ne: userId },
    status: "active",
  };

  if (tagsParam) {
    const inputTags = tagsParam
      .split(",")
      .map((tag: string) => tag.trim())
      .filter(Boolean);

    if (inputTags.length === 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          error:
            "At least one tag must be provided if 'tags' parameter is specified.",
        }),
      };
    }

    query.tags = { $in: inputTags };
  }

  try {
    const results = await reflections.find(query).toArray();

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(results),
    };
  } catch (err: any) {
    console.error("Mongo getPeerReflections error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Failed to fetch peer reflections.",
      }),
    };
  }
};
