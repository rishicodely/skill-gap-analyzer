import { analyzeService } from "../services/analyzeService.js";

export const analyze = async (req, res) => {
  try {
    const { jobDescription, skills } = req.body;
    const result = await analyzeService({ jobDescription, skills });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
