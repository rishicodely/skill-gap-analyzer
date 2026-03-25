import { runAIAnalysis } from "./runAIAnalysis.js";

export const analyzeService = async ({ jobDescription, skills }) => {
  const prompt = `You are an expert career assistant.
Given:
1. Job Description
2. Candidate Skills

Do the following:
1. Extract key required skills from the job description
2. Compare with candidate skills
3. Identify missing skills
4. Provide a match percentage (0–100)
5. Suggest a learning roadmap for missing skills

IMPORTANT:
- Be precise and concise
- Do not add explanations outside JSON
- Always return valid JSON

Return response in this exact format:
{
  "required_skills": [],
  "candidate_skills": [],
  "missing_skills": [],
  "match_score": "",
  "learning_plan": []
}

Job Description:
${jobDescription}

Candidate Skills:
${skills}`;
  const aiRes = await runAIAnalysis(prompt);
  return aiRes;
};
