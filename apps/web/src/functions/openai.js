// src/functions/callOpenAI.js
import OpenAI from "openai";
import {
  detailedSummaryPrompt,
  highlightPrompt,
  reflectionMetadataPrompt,
} from "../utils/openAiPrompt";
import { defaultMetadata, trimConvoForReflection } from "../utils";

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

export async function generateHighlight(convo) {
  console.log("generateHighlight convo: ", convo);
  try {
    const summaryPrompt = [highlightPrompt, ...convo];

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
    const prompt = [detailedSummaryPrompt, ...convo];

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
    const trimmedConvo = trimConvoForReflection(convo);
    const summaryPrompt = [reflectionMetadataPrompt, ...trimmedConvo];

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
      console.warn("Raw output not valid JSON. Trying to extract manually…");
      const match = raw.match(/\{[\s\S]*?\}/);
      if (match) {
        try {
          metadata = JSON.parse(match[0]);
        } catch (fallbackError) {
          console.error("Fallback JSON parse also failed:", fallbackError);
          metadata = defaultMetadata();
        }
      } else {
        metadata = defaultMetadata();
      }
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
