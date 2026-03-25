export const analyzeService = async ({ jobDescription, skills }) => {
  const prompt = `Job Description: ${jobDescription} Skills: ${skills}`;
  const aiRes = await runAIAnalysis(prompt);
  return aiRes;
};
