// src/functions/callOpenAI.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function callOpenAI(messages) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 100, // output tokens
    });
    return completion.choices[0].message.content.trim();
  } catch (err) {
    console.error("Error fetching AI response:", err);
    return "Hmm… I got a little lost. Could you try again?";
  }
}

// export async function summarizeConversation(convo) {
//   try {
//     const summaryPrompt = [
//       {
//         role: "system",
//         content:
//           "Summarize this conversation in one warm, emotionally intelligent sentence that captures what the user is processing.",
//       },
//       ...convo,
//     ];

//     const summary = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: summaryPrompt,
//       temperature: 0.6,
//       max_tokens: 100,
//     });

//     return summary.choices[0].message.content.trim();
//   } catch (err) {
//     console.error("Error creating summary:", err);
//     return "The user is reflecting deeply on something that matters to them.";
//   }
// }

export async function generateHighlight(convo) {
  console.log("generateHighlight convo: ", convo);
  try {
    const summaryPrompt = [
      {
        role: "system",
        content: `
          A title (under 10 words) that captures the emotional essence of what the user is feeling or reflecting on. It should feel like a quiet headline — tender, true, and reflective. Avoid being generic. Use language that stirs emotion and invites memory.
            `.trim(),
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
        content: `
          Gently reflect on this emotional conversation. 
          Keep it under 300 words — shorter if the user said little.
          
          Capture the user's inner journey with warmth and quiet understanding.
          Write like a thoughtful narrator — not to fix, but to witness.
          
          End with one soft insight — not advice, just a tender truth.

          Let it feel like a page from their own soul.
            `.trim(),
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

export async function generateMetadataFromReflection(convo) {
  console.log("generateMetadataFromReflection convo: ", convo);
  try {
    const summaryPrompt = [
      {
        role: "system",
        content: `
You are a warm and mindful assistant. Given the following reflection conversation, please:
1. Extract the main reflection content from the user (summarize if needed, capturing the core feeling in a warm, natural tone).
2. Suggest an alias that captures the spirit of the reflection (e.g. 'Gentle Seeker' or 'Quiet Walker').
3. Write a short feeling or summary (one phrase).
4. Suggest 3–5 tags that are meaningful to the reflection (e.g. 'pause', 'breathe', 'growth').

Please respond in this JSON format:
{
  "reflection": "",
  "alias": "",
  "feeling": "",
  "tags": []
}
        `.trim(),
      },
      ...convo,
    ];

    const summary = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: summaryPrompt,
      temperature: 0.6,
      max_tokens: 200,
    });

    const raw = summary.choices[0].message.content.trim();
    console.log("generateMetadataFromReflection raw: ", raw);

    let metadata;
    try {
      metadata = JSON.parse(raw);
    } catch (parseError) {
      console.error("Error parsing AI response as JSON:", parseError);
      metadata = {
        reflection: "",
        alias: "Gentle Breather",
        feeling: "Quiet Reflection",
        tags: ["pause", "breathe"],
      };
    }

    return metadata;
  } catch (err) {
    console.error("Error generating metadata from reflection:", err);
    return {
      reflection: "",
      alias: "Gentle Breather",
      feeling: "Quiet Reflection",
      tags: ["pause", "breathe"],
    };
  }
}
