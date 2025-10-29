import { Inngest} from "inngest";

export const inngest = new Inngest({
    id: 'Simple-Invest',
    ai: { gemini: { apiKey: process.env.GEMINI_API_KEY! }}
})