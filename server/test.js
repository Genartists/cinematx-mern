import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// const ai = new GoogleGenAI({
//   apiKey: "AIzaSyBmfXl5hCTtfBilcAkHX8JYWbm13hT7gic",
// });

async function main() {
//   const prompt =
//     `Make a list of 5 random Movies. Respond as a JSON array of objects with "title" and "year"`;

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: prompt,
//   });
  const text = "https://www.youtube.com/watch?v=eGSL-l9582c"
  
  let id = text.split("=")


  console.log(id[id.length - 1])
}

main();
