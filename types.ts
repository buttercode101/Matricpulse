export enum AppTab {
  HOME = 'HOME',
  STUDY_RESOURCES = 'STUDY_RESOURCES',
  APS_CALC = 'APS_CALC',
  UNI_MATCH = 'UNI_MATCH',
  LEARNERSHIPS = 'LEARNERSHIPS',
  AI_ASSISTANT = 'AI_ASSISTANT',
  CRISIS_SUPPORT = 'CRISIS_SUPPORT',
}

export interface Subject {
  id: string;
  name: string;
  percent: number;
}

export interface APSResult {
  totalScore: number;
  breakdown: { subject: string; points: number }[];
  subjects: Subject[];
}

export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface AIResponse {
  text: string;
  groundingChunks?: GroundingChunk[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface UniversityProgram {
  name: string;
  category: string;
  aps: number;
}

export interface University {
  name: string;
  location: string;
  type: string;
  website: string;
  programs: UniversityProgram[];
}

export interface Bursary {
  name: string;
  provider: string;
  coverage: string;
  fields: string[];
  benefits: string[];
  deadline: string;
  link: string;
  description: string;
}

export const SA_LANGUAGES = [
  'English', 'isiZulu', 'isiXhosa', 'Afrikaans', 'Sepedi', 
  'Setswana', 'Sesotho', 'Xitsonga', 'siSwati', 'Tshivenda', 'isiNdebele'
];

export const SUBJECT_OPTIONS = [
  "English Home Language", "English First Additional", "Afrikaans Home Language", 
  "Afrikaans First Additional", "Mathematics", "Mathematical Literacy", 
  "Physical Sciences", "Life Sciences", "Accounting", "Business Studies", 
  "Economics", "History", "Geography", "Life Orientation", "Information Technology", 
  "Computer App Technology", "Tourism", "Visual Arts", "Dramatic Arts"
];