import { GoogleGenerativeAI } from "@google/generative-ai";
import { HERO_DATA, ABOUT_DATA, SKILLS_DATA, PROJECTS_DATA, CONTACT_DATA } from './constants.ts';

// Access the API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini
let model: any = null;
if (API_KEY) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    // User requested "3 pro" - mapping to available preview model
    model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
}

export const generateAIResponse = async (messages: any[], message: string): Promise<string> => {
    console.log("History", messages);

    if (!model) {
        return "I am unable to connect to my brain right now (API Key missing/Env var not loaded). Please check .env file.";
    }

    try {
        // ... (system prompt omitted for brevity, logic remains same)
        const systemPrompt = `
      You are Pepper, an AI assistant for ${HERO_DATA.name}'s portfolio.
      
      Here is context about ${HERO_DATA.name}:
      Title: ${HERO_DATA.title}
      Intro: ${HERO_DATA.intro}
      
      About: ${ABOUT_DATA.summary}
      ${ABOUT_DATA.description}
      
      Skills:
      ${SKILLS_DATA.map(s => `- ${s.name} (${s.category})`).join('\n')}
      
      Projects:
      ${PROJECTS_DATA.map(p => `- ${p.title}: ${p.description} (Tech: ${p.techStack.join(', ')})`).join('\n')}
      
      Contact:
      Email: ${CONTACT_DATA.email}
      Phone: ${CONTACT_DATA.phone}
      
      Instructions:
      - Answer questions as Pepper, a friendly and enthusiastic AI assistant.
      - Use simple, easy-to-understand language ("sweet and simple").
      - Use bullet points and clear spacing for readability.
      - Keep answers concise and to the point (max 3-4 sentences or points). Avoid long paragraphs.
      - If asked about something not in the context, politely say you don't know but suggest asking about the portfolio.
      - Do not make up facts.
    `;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am Pepper. I am ready to answer questions about the portfolio." }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        return response.text();

    } catch (error: any) {
        console.error("Gemini Error:", error);
        if (error.message.includes("429")) {
            return "I'm receiving too many messages right now (Rate Limit). Please wait 1 minute.";
        }
        if (error.message.includes("404")) {
            return "My AI Model is currently unavailable (404). Please verify API Key permissions.";
        }
        return `Connection Error: ${error.message || 'Unknown API Error'}.`;
    }
};

export const generateProjectChatResponse = async (techStack: string[], message: string): Promise<string> => {
    console.log(techStack);

    if (!model) return "AI Service Unavailable.";

    try {
        const prompt = `
      Context: User is asking about a project built with: ${techStack.join(', ')}.
      User Question: "${message}"
      
      Answer as an expert but use a friendly, sweet, and simple tone.
      Explain the technical aspects in an easy-to-understand way.
      Use bullet points and clear spacing for readability.
      Keep it brief and concise (max 3-4 points). Avoid overwhelming details.
    `;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error: any) {
        console.error("Gemini Error:", error);
        return `Error: ${error.message || "Unknown error occurred"}`;
    }
};
