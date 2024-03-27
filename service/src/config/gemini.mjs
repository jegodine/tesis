import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_ENG_AI_KEY);

const Model = genAI.getGenerativeModel({ model: process.env.GOOGLE_MODEL });

export default Model;