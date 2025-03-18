
export const toolInterface = `export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  url: string;
  logoUrl: string;  // valid logo url
  pricing?: {
    type: string;
    plan: string;
    cost: string;
    features: string[];
    recommended?: boolean;
  }[];
  company?: string;
  origin?: string;
  trending?: boolean;
  featured?: boolean;
  tags?: string[];
  features: string[];
  pros: string[];  // more than 5 pros
  cons: string[];  // more than 5 cons
  rating: number;
  users: string;
  reviews?: number;
  useCases?: string[]; // better usecases more than 6
  integrations?: string[];
  alternatives?: {
    id: string;
    name: string;
    logoUrl: string; // valid logo url
  }[];
  testimonials?: {
    author: string;
    company: string;
    content: string;
    rating: number;
  }[];
  created: string;
  updated: string;
}`;

export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  url: string;
  logoUrl: string;
  pricing?: {
    type: string;
    plan: string;
    cost: string;
    features: string[];
    recommended?: boolean;
  }[];
  company?: string;
  origin?: string;
  trending?: boolean;
  featured?: boolean;
  tags?: string[];
  features: string[];
  pros: string[];
  cons: string[];
  rating: number;
  users: string;
  reviews?: number;
  useCases?: string[];
  integrations?: string[];
  alternatives?: {
    id: string;
    name: string;
    logoUrl: string;
  }[];
  testimonials?: {
    author: string;
    company: string;
    content: string;
    rating: number;
  }[];
  created: string;
  updated: string;
}

export interface AINews {
  id: string;
  title: string;
  date: string;
  source: string;
  summary: string;
  impact: string;
  categories: string[];
  relatedTools: string[];
}

export type ToolCategory = 
  | "Machine Learning"
  | "Natural Language Processing"
  | "Computer Vision"
  | "Generative AI"
  | "Conversational AI"
  | "Data Analysis"
  | "Automation"
  | "AI Development"
  | "Business Intelligence"
  | "Content Creation";

export const TOOL_CATEGORIES: ToolCategory[] = [
  "Machine Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Generative AI",
  "Conversational AI",
  "Data Analysis",
  "Automation",
  "AI Development",
  "Business Intelligence",
  "Content Creation"
];
