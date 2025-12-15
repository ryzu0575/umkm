import { GoogleGenAI } from "@google/genai";
import { GeminiResponse } from "../types";

const API_KEY = process.env.API_KEY;

// Singleton instance not strictly necessary for this scale, but good practice to encapsulate
class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    if (!API_KEY) {
      console.error("API_KEY is missing from environment variables.");
    }
    // Initialize with the key from process.env
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async generateResponse(
    prompt: string, 
    systemInstruction: string,
    history: {role: 'user' | 'model', text: string}[] = []
  ): Promise<GeminiResponse> {
    try {
      // Create a chat session to handle history
      // Mapping our simple history format to the SDK's expected format if needed
      // But for simplicity in this specific "tool" based app, we might often just use generateContent
      // However, to support conversation, let's use the chat API.
      
      const chat = this.ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
        history: history.map(h => ({
            role: h.role,
            parts: [{ text: h.text }]
        }))
      });

      const response = await chat.sendMessage({
        message: prompt
      });

      return {
        text: response.text || "Maaf, saya tidak dapat memberikan respons saat ini."
      };

    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return {
        text: "",
        error: error.message || "Terjadi kesalahan yang tidak terduga saat menghubungi AI."
      };
    }
  }
}

export const geminiService = new GeminiService();