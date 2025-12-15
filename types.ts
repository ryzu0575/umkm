export enum AppMode {
  HOME = 'HOME',
  IDEATION = 'IDEATION',
  BUSINESS_PLAN = 'BUSINESS_PLAN',
  LEGAL = 'LEGAL',
  FUNDRAISING = 'FUNDRAISING',
  MARKETING = 'MARKETING',
  DIGITIZATION = 'DIGITIZATION',
  CHAT = 'CHAT'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface ToolConfig {
  id: AppMode;
  title: string;
  description: string;
  icon: string;
  systemInstruction: string;
  promptPlaceholder: string;
  suggestedPrompts: string[];
}

export interface GeminiResponse {
  text: string;
  error?: string;
}