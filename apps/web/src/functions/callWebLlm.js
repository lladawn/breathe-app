// src/functions/callWebLLM.js
import { CreateMLCEngine } from "@mlc-ai/web-llm";

let engine = null;

export async function callWebLLM(prompt) {
  if (!engine) {
    engine = await CreateMLCEngine("Llama-3.1-8B-Instruct", {
      initProgressCallback: ({ progress }) => {
        console.log(`Model loading: ${Math.round(progress * 100)}%`);
      },
    });
  }

  const messages = [
    { role: "system", content: "You are a gentle, reflective companion." },
    { role: "user", content: prompt },
  ];

  const reply = await engine.chat.completions.create({ messages });
  return reply.choices[0]?.message?.content || "🤖 Hmm… no response right now.";
}
