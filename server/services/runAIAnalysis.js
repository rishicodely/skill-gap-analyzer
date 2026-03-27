import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: { responseMimeType: "application/json" },
});

export const runAIAnalysis = async (prompt) => {
  try {
    const result = await model.generateContent(`
      Return a JSON object analyzing these skills. 
      Format: { "required_skills": [], "candidate_skills": [], "missing_skills": [], "match_score": "", "learning_plan": [] }
      
      User Prompt: ${prompt}
    `);

    const response = await result.response;
    const text = response.text();

    return JSON.parse(text);
  } catch (err) {
    console.error("AI ANALYSIS ERROR:", err);
    throw new Error("Failed to analyze skills");
  }
};
