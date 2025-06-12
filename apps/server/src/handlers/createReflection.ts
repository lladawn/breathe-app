import { v4 as uuidv4 } from "uuid";
import { db } from "../lib/mongo";
import { corsHeaders } from "../utils";

const reflections = db.collection("reflections");

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body);

    const { userId, alias, feeling, reflection, tags = [] } = body;
    if (!userId || !alias || !feeling || !reflection) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Missing required fields." }),
      };
    }

    const item = {
      id: uuidv4(), // reflection card id
      userId,
      alias,
      feeling,
      reflection,
      tags,
      createdAt: new Date().toISOString(),
      status: "active",
    };

    await reflections.insertOne(item);

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: "Reflection created.", item }),
    };
  } catch (err: any) {
    console.error("Mongo createReflection error:", err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Failed to create reflection." }),
    };
  }
};
