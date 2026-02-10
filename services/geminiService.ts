
import { GoogleGenAI } from "@google/genai";

export async function generateLoveNote(): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "为刚刚答应约会的情人写一段简短、超级可爱且肉麻的2行中文告白小诗。多用一些爱心表情符号。",
      config: {
        temperature: 0.9,
      }
    });
    return response.text || "你是我的心，你是我的肝，你是我生命的另一半！❤️✨";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "众里寻他千百度，蓦然回首，你就在灯火阑珊处。❤️";
  }
}
