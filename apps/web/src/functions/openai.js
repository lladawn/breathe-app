import { generateReflectionAi } from "./api";
import { defaultMetadata } from "../utils";

export async function callOpenAI(messages) {
  try {
    const response = await generateReflectionAi("chat", messages);
    return response.text;
  } catch (err) {
    console.error("Error fetching AI response:", err);
    return "Hmm… I got a little lost. Could you try again?";
  }
}

export async function generateHighlight(convo) {
  try {
    const response = await generateReflectionAi("highlight", convo);
    return response.text;
  } catch (err) {
    console.error("Error generating highlight:", err);
    return "Reflecting on something that truly matters.";
  }
}

export async function generateDetailedSummary(convo) {
  try {
    const response = await generateReflectionAi("detailedSummary", convo);
    return response.text;
  } catch (err) {
    console.error("Error generating detailed summary:", err);
    return "A heartfelt emotional conversation about something deeply personal.";
  }
}

export async function generateMetadataFromReflection(convo) {
  try {
    const response = await generateReflectionAi("metadata", convo);
    return response.metadata || defaultMetadata();
  } catch (err) {
    console.error("Error generating metadata from reflection:", err);
    return defaultMetadata();
  }
}
