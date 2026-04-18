import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const processAiQuery = async (req, res) => {
  const { userQuery } = req.body;
  const apiurl = process.env.GEMINI_API_KEY;

  const prompt = `
    You are a data analyst. Analyze the following CSV data and return a JSON object with insights.
    
    Data: ${userQuery}
    
    Return ONLY this JSON structure (no extra text):
    {
      "summary": "one sentence summary of the data",
      "totalRows": number,
      "totalColumns": number,
      "keyFindings": ["finding 1", "finding 2", "finding 3", "finding 4", "finding 5"],
      "topValue": "the most frequent or highest value found",
      
    }
  `;

  try {
    const response = await axios.post(apiurl, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    const rawText = response.data.candidates[0].content.parts[0].text;

    let aiIntent;
    try {
      aiIntent = JSON.parse(rawText);
    } catch (parseError) {
      console.error("Gemini returned non-JSON:", rawText);
      return res.status(500).json({ message: "AI returned invalid JSON" });
    }

    res.status(200).json({ success: true, intent: aiIntent });
  } catch (error) {
    console.error("AI Fetch Error:", error.response?.data || error.message);
    res.status(500).json({ message: "AI Processing Failed" });
  }
};

export default processAiQuery;