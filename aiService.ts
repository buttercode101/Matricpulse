
import { GoogleGenAI } from "@google/genai";
import { AIResponse } from "../types";

/**
 * Helper to ensure the AI client uses the defined process.env.API_KEY.
 * Initializing inside functions prevents module-level initialization errors.
 */
const getAIClient = () => {
  // Always use process.env.API_KEY directly when initializing the @google/genai client instance.
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * analyzeStudyMaterial
 * Analyzes provided input (text or textbook image) and returns study insights.
 */
export const analyzeStudyMaterial = async (
  textInput: string,
  imageBase64?: string,
  mimeType: string = 'image/jpeg'
): Promise<AIResponse> => {
  const ai = getAIClient();
  const model = 'gemini-3-pro-preview';
  
  const promptText = `
    You are an expert South African Matric Tutor specializing in the CAPS curriculum.
    Analyze the following input which is either a text description or a photo of a textbook page.
    
    Tasks:
    1. Identify the specific CAPS topic.
    2. Provide a "Sharp Sharp Summary": A high-impact, easy-to-understand breakdown.
    3. Generate 3 "Quick Quiz" questions with answers (use >! spoiler tags for answers).
    4. Provide a "Memory Hack": A mnemonic or visual trick to remember this.
    5. Suggest search terms for Siyavula, Mind the Gap, or Past Papers.
    
    Tone: Relatable, supportive (use subtle Mzansi slang like "Gents", "Sharp", "Now-now"), but academically rigorous.
  `;

  const parts: any[] = [{ text: promptText }];
  if (textInput) parts.push({ text: `Student Input: ${textInput}` });
  if (imageBase64) {
    parts.push({
      inlineData: { mimeType, data: imageBase64 }
    });
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts },
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    return {
      text: response.text || "Eish, I couldn't process that. Try a clearer photo or more text.",
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks
    };
  } catch (error) {
    console.error("Gemini Study Error:", error);
    return { text: "Error connecting to the AI brain. Please check your internet or API key." };
  }
};

/**
 * matchUniversities
 * Cross-references student marks with university prospectuses.
 */
export const matchUniversities = async (
  aps: number, 
  subjects: { name: string, percent: number }[]
): Promise<AIResponse> => {
  const ai = getAIClient();
  const model = 'gemini-3-pro-preview';
  const subjectString = subjects.map(s => `${s.name} (${s.percent}%)`).join(', ');
  
  const prompt = `
    Analyze the 2025/2026 South African University Prospectuses for a student with:
    - Total APS Score: ${aps}
    - Subjects: ${subjectString}
    
    Please provide:
    1. A list of specific Degree/Diploma programs they qualify for at top institutions (UCT, Wits, UP, UJ, Stellenbosch, etc.).
    2. "Reach" programs where they might just fall short but could get into with an improved final mark.
    3. Suggested alternative pathways (Higher Certificates) if the APS is below 21.
    
    Only suggest programs from official South African institutions.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: "You are a specialized SA Career Counselor. Use the latest APS conversion tables for the NSC.",
      }
    });

    return {
      text: response.text || "No programs found. Try entering more subjects.",
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks
    };
  } catch (error) {
    console.error("Gemini Uni Match Error:", error);
    return { text: "Failed to match universities. The system might be under heavy load." };
  }
};

/**
 * findOpportunities
 * Searches for live bursaries and learnerships.
 */
export const findOpportunities = async (query: string): Promise<AIResponse> => {
  const ai = getAIClient();
  const model = 'gemini-3-flash-preview';
  const prompt = `Find currently open (live) bursaries, learnerships, or NSFAS updates for: ${query}. Focus on 2025/2026 intake in South Africa.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    return {
      text: response.text || "No current opportunities found for this search.",
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks
    };
  } catch (error) {
    console.error("Gemini Opps Error:", error);
    return { text: "Search failed. Try searching for 'General Grade 12 Bursaries'." };
  }
};

/**
 * chatWithMentor
 * Continuous conversation with an AI mentor.
 */
export const chatWithMentor = async (
  history: { role: 'user' | 'model', text: string }[], 
  message: string, 
  language: string
): Promise<string> => {
  const ai = getAIClient();
  const model = 'gemini-3-flash-preview';
  
  const systemPrompt = `
    You are 'The Mentor' on MatricPulse. You are an encouraging older sibling figure to South African Matriculants.
    Language: ${language}.
    Personality: Helpful, optimistic, wise, and relatable. 
    Use local South African references and Mzansi slang appropriately.
    Crucial Safety: If the student mentions self-harm, depression, or severe stress, gently suggest they visit the Crisis Support tab and give them the SADAG number: 0800 567 567 immediately.
  `;

  try {
    const chat = ai.chats.create({
      model,
      config: { 
        systemInstruction: systemPrompt,
        temperature: 0.8
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    // sendMessage returns GenerateContentResponse, use .text property to get results.
    const result = await chat.sendMessage({ message });
    return result.text || "Eish, my connection dipped. What was that again?";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Network's a bit dodge right now. Try sending that again in a second.";
  }
};
