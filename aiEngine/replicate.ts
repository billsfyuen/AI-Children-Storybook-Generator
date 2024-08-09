import Replicate from "replicate";
import dotenv from "dotenv";

dotenv.config();

export const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});