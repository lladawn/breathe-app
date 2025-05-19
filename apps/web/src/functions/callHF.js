// src/functions/callHF.js
import { InferenceClient } from "@huggingface/inference";

export const callHF = async (prompt) => {
  const client = new InferenceClient({
    apiKey: process.env.REACT_APP_HF_API_KEY,
  });
  // for a chat-style flow, use `chatCompletion`; for plain text-gen, use `textGeneration`
  const { generated_text, choices } = await client.textGeneration({
    model: "distilgpt2",
    inputs: prompt,
    parameters: { max_new_tokens: 60, temperature: 0.7 },
  });
  // textGeneration returns `generated_text`; chatCompletion returns `choices[0].message.content`
  return (
    generated_text ?? choices?.[0]?.message?.content ?? "🤖 Sorry, no reply."
  );
};
