// src/functions/callOpenAI.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function callOpenAI(userInput, messages) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 100,
    });
    return completion.choices[0].message.content.trim();
  } catch (err) {
    console.error("Error fetching AI response:", err);
    return "Hmm… I got a little lost. Could you try again?";
  }
}

export async function summarizeConversation(convo) {
  try {
    const summaryPrompt = [
      {
        role: "system",
        content:
          "Summarize this conversation in one warm, emotionally intelligent sentence that captures what the user is processing.",
      },
      ...convo,
    ];

    const summary = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: summaryPrompt,
      temperature: 0.6,
      max_tokens: 100,
    });

    return summary.choices[0].message.content.trim();
  } catch (err) {
    console.error("Error creating summary:", err);
    return "The user is reflecting deeply on something that matters to them.";
  }
}

export async function generateHighlight(convo) {
  console.log("generateHighlight convo: ", convo);
  try {
    const summaryPrompt = [
      {
        role: "system",
        content:
          "Summarize this conversation in one warm, emotionally intelligent not more than 5-10 word sentence that captures what the user is processing, like a hightlight.",
      },
      ...convo,
    ];

    const summary = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: summaryPrompt,
      temperature: 0.6,
      max_tokens: 60,
    });

    console.log("generateHighlight summary: ", summary);

    return summary.choices[0].message.content.trim();
  } catch (err) {
    console.error("Error generating highlight:", err);
    return "Reflecting on something that truly matters.";
  }
}

export async function generateDetailedSummary(convo) {
  console.log("generateDetailedSummary convo: ", convo);
  try {
    const prompt = [
      {
        role: "system",
        content:
          "Write a summary in not more than 200-300 words of this emotional conversation in a calm and kind tone. Capture the user's emotional journey with care, what the user said, and what's a better way.",
      },
      ...convo,
    ];

    const summary = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: prompt,
      temperature: 0.6,
      max_tokens: 300,
    });

    console.log("generateDetailedSummary summary: ", summary);

    return summary.choices[0].message.content.trim();
  } catch (err) {
    console.error("Error generating detailed summary:", err);
    return "A heartfelt emotional conversation about something deeply personal.";
  }
}
