// src/functions/callOpenAI.js
export async function callOpenAI(userMessage) {
  const endpoint = "https://api.openai.com/v1/chat/completions";
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // 🔒 Add in .env

  const systemPrompt = `
You are a gentle, emotionally supportive companion.
You help users reflect softly and feel understood.
Speak with warmth and kindness. No judgment. Need presence.
Speak like a mindful, poetic guide. Create a safe space.
Always begin by acknowledging their emotional state.
This user values calm, clarity, and gentle support.
Their reflections often touch on emotional exhaustion, rediscovery, and inner stillness.
Help them grow up.
Keep the response short to max 100 words for the chat, and end softly.
Consider the whole chat.
`;

  const body = {
    model: "gpt-4o-mini", // or use "gpt-4o-mini" to save cost
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    temperature: 0.8, // adds warmth and creative tone
    max_tokens: 100,
    // store: true,
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok || !data.choices || !data.choices[0]) {
      throw new Error("OpenAI returned no response.");
    }

    return data.choices[0].message.content.trim();
  } catch (err) {
    console.error("Error fetching AI response:", err);
    return "Hmm… I’m here, but something didn’t work. Let’s try again in a moment. 🌱";
  }
}
