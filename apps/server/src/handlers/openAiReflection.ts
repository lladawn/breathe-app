import type { ChatMessage } from "../lib/openAiPrompts";
import {
  detailedSummaryPrompt,
  highlightPrompt,
  reflectSystemPrompt,
  reflectionMetadataPrompt,
} from "../lib/openAiPrompts";
import { corsHeaders } from "../utils";

const OPENAI_CHAT_COMPLETIONS_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o-mini";

type ReflectionAiTask = "chat" | "highlight" | "detailedSummary" | "metadata";

const taskConfig: Record<
  ReflectionAiTask,
  { prompt: ChatMessage; temperature: number; maxTokens: number }
> = {
  chat: { prompt: reflectSystemPrompt, temperature: 0.7, maxTokens: 100 },
  highlight: { prompt: highlightPrompt, temperature: 0.6, maxTokens: 60 },
  detailedSummary: {
    prompt: detailedSummaryPrompt,
    temperature: 0.6,
    maxTokens: 300,
  },
  metadata: {
    prompt: reflectionMetadataPrompt,
    temperature: 0.6,
    maxTokens: 200,
  },
};

const defaultMetadata = () => ({
  reflection: "I've been pausing to listen to myself more.",
  alias: "Quiet Flame",
  feeling: "Sitting with what is",
  tags: ["reflection", "stillness", "softness"],
});

function jsonResponse(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}

function parseTask(value: unknown): ReflectionAiTask | null {
  if (
    value === "chat" ||
    value === "highlight" ||
    value === "detailedSummary" ||
    value === "metadata"
  ) {
    return value;
  }

  return null;
}

function sanitizeMessages(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((message) => {
      return (
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim()
      );
    })
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 4000),
    }))
    .slice(-12);
}

function trimConvoForReflection(messages: ChatMessage[], maxChars = 2000) {
  const userMessages = messages.filter(
    (message) =>
      message.role === "user" ||
      (message.role === "assistant" && message.content.length < 200)
  );

  let total = 0;
  const limited: ChatMessage[] = [];

  for (let i = userMessages.length - 1; i >= 0; i -= 1) {
    const message = userMessages[i];
    total += message.content.length;
    if (total > maxChars) break;
    limited.unshift(message);
  }

  return limited;
}

function parseMetadata(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*?\}/);
    if (!match) return defaultMetadata();

    try {
      return JSON.parse(match[0]);
    } catch {
      return defaultMetadata();
    }
  }
}

async function createChatCompletion(
  messages: ChatMessage[],
  temperature: number,
  maxTokens: number
) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    const message = data?.error?.message || "OpenAI request failed.";
    throw new Error(message);
  }

  const content = data?.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("OpenAI returned no content.");
  }

  return content;
}

export const handler = async (event: any) => {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(204, {});
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const task = parseTask(body.task);
    if (!task) {
      return jsonResponse(400, { error: "Invalid OpenAI reflection task." });
    }

    const sanitizedMessages = sanitizeMessages(body.messages);
    if (sanitizedMessages.length === 0) {
      return jsonResponse(400, { error: "At least one message is required." });
    }

    const { prompt, temperature, maxTokens } = taskConfig[task];
    const userMessages =
      task === "metadata"
        ? trimConvoForReflection(sanitizedMessages)
        : sanitizedMessages;

    const content = await createChatCompletion(
      [prompt, ...userMessages],
      temperature,
      maxTokens
    );

    return jsonResponse(
      200,
      task === "metadata"
        ? { metadata: parseMetadata(content) }
        : { text: content }
    );
  } catch (err: any) {
    console.error("openAiReflection error:", err);
    return jsonResponse(500, {
      error: "Failed to generate reflection response.",
    });
  }
};
