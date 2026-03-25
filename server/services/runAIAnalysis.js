import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runAIAnalysis = async (prompt) => {
  // const response = await client.chat.completions.create({
  //   model: "gpt-4o-mini",
  //   messages: [
  //     {
  //       role: "user",
  //       content: prompt,
  //     },
  //   ],
  // });

  // const raw = response.choices[0].message.content;

  try {
    // return JSON.parse(raw);
    return {
      required_skills: ["React", "Node.js", "MongoDB"],
      candidate_skills: ["React", "JavaScript"],
      missing_skills: ["Node.js", "MongoDB"],
      match_score: "40",
      learning_plan: ["Learn Node.js basics", "Practice MongoDB"],
    };
  } catch (err) {
    console.log("RAW AI RESPONSE:\n", raw);
    throw new Error("Invalid JSON from AI");
  }
};
