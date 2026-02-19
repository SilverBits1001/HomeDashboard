import { GoogleGenAI, Type } from "@google/genai";
import { SmartDevice, Chore, ShoppingItem, Package, WeatherData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// --- Types for Gemini Response Schemas ---

export interface CommandResponse {
  action: 'TOGGLE_DEVICE' | 'SET_VALUE' | 'ADD_CHORE' | 'ADD_SHOPPING' | 'UNKNOWN';
  targetId?: string; // device ID or similar
  targetName?: string; // For fuzzy matching if ID not found
  value?: string | number | boolean;
  details?: string;
}

// --- Service Functions ---

export const generateBriefing = async (
  weather: WeatherData,
  chores: Chore[],
  packages: Package[],
  events: any[]
): Promise<string> => {
  if (!process.env.API_KEY) return "API Key missing. Cannot generate briefing.";

  const prompt = `
    Generate a concise, friendly morning briefing for a home dashboard.
    Context:
    - Weather: ${weather.condition}, ${weather.temp}°F.
    - Chores Pending: ${chores.filter(c => !c.completed).length}. Top urgent: ${chores.filter(c => !c.completed)[0]?.title || 'None'}.
    - Packages Arriving: ${packages.filter(p => p.status === 'Out for Delivery').length} out for delivery today.
    - Calendar: ${events.length} events today.

    Keep it under 50 words. Be helpful and warm.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Have a great day!";
  } catch (error) {
    console.error("Briefing generation failed", error);
    return "Welcome home! Check your dashboard for updates.";
  }
};

export const parseNaturalLanguageCommand = async (
  input: string,
  devices: SmartDevice[]
): Promise<CommandResponse> => {
  if (!process.env.API_KEY) return { action: 'UNKNOWN', details: 'No API Key' };

  const deviceList = devices.map(d => `${d.name} (ID: ${d.id}, Room: ${d.room})`).join(', ');

  const systemInstruction = `
    You are a home automation controller. Interpret the user's natural language request into a structured JSON command.
    Available Devices: ${deviceList}.
    
    Supported Actions:
    - TOGGLE_DEVICE: Turn something on/off. Value should be boolean.
    - SET_VALUE: Set a number (temp, brightness). Value should be number.
    - ADD_CHORE: Add a new chore. TargetName is chore title.
    - ADD_SHOPPING: Add item to list. TargetName is item name.
    
    If the device is ambiguous, pick the most likely one based on the name.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: input,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            action: { type: Type.STRING, enum: ['TOGGLE_DEVICE', 'SET_VALUE', 'ADD_CHORE', 'ADD_SHOPPING', 'UNKNOWN'] },
            targetId: { type: Type.STRING, description: "The ID of the device if found" },
            targetName: { type: Type.STRING, description: "Name of device, chore, or item" },
            value: { type: Type.STRING, description: "Value for the action (boolean as string, number as string, or text)" },
            details: { type: Type.STRING }
          },
          required: ['action']
        }
      }
    });

    const json = JSON.parse(response.text || '{}');
    
    // Normalize value types
    let parsedValue: string | number | boolean | undefined = json.value;
    if (json.value === 'true') parsedValue = true;
    if (json.value === 'false') parsedValue = false;
    if (!isNaN(Number(json.value)) && json.action === 'SET_VALUE') parsedValue = Number(json.value);

    return {
      ...json,
      value: parsedValue
    };

  } catch (error) {
    console.error("Command parsing failed", error);
    return { action: 'UNKNOWN' };
  }
};