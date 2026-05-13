import { generateReflectionAi } from "./api";

export async function callOpenAI(userMessage) {
  try {
    const response = await generateReflectionAi("chat", [
      { role: "user", content: userMessage },
    ]);
    return response.text;
  } catch (err) {
    console.error("Error fetching AI response:", err);
    return "Hmm… I’m here, but something didn’t work. Let’s try again in a moment. 🌱";
  }
}
