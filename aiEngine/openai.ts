import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export const teckyOpenAI = new OpenAI({
    baseURL: process.env.TECKY_OPENAI_API_URL,
    apiKey: process.env.TECKY_OPENAI_API_KEY,
});

export const adamOpenAI = new OpenAI({
    apiKey: process.env.ADAM_OPENAI_API_KEY
});