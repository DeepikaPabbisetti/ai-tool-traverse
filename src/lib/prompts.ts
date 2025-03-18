
import { toolInterface } from "@/types/tools";

export const trendingToolsPrompt = (countryFilter?: string) => {
  let prompt = `Research and list the top 10 trending AI tools currently available`;
  if (countryFilter) {
    prompt = `Research and list the top trending AI tools currently available`;
    prompt += ` from ${countryFilter}`;
  }
  prompt += `. Please ensure your response spans a diverse range of categories. For each tool, gather and include comprehensive details including:
    - Primary use case and target audience
    - Key features and standout functionalities
    - Pricing details and user statistics
    - User testimonials and reviews
    - Use cases and integrations
    - Similar tools and alternatives
    - All additional metadata and statistics

    Return your answer strictly as a JSON array where each element is an object conforming to the following TypeScript interface:

    ${toolInterface}

    Ensure that:
    1. Each tool's object includes all the fields listed above. If certain details are not available, provide an appropriate null or empty value.
    2. The "description" field succinctly summarizes the tool's capabilities, primary use case, and its target market.
    3. The final output is strictly well-formatted, valid JSON with no extra commentary or markdown formatting.`;
  return prompt;
};

export const featuredToolsPrompt = () => {
  const prompt = `Research and list the top 6 featured AI tools that are making significant impact in their respective fields. 
  Please ensure your selection includes tools from various categories. For each tool, gather and include comprehensive details including:
    - Primary use case and target audience
    - Key features and standout functionalities
    - Pricing details and user statistics
    - User testimonials and reviews
    - Use cases and integrations
    - Similar tools and alternatives
    - All additional metadata and statistics

    Return your answer strictly as a JSON array where each element is an object conforming to the following TypeScript interface:

    ${toolInterface}

    Ensure that:
    1. Each tool's object includes all the fields listed above. If certain details are not available, provide an appropriate null or empty value.
    2. The "description" field succinctly summarizes the tool's capabilities, primary use case, and its target market.
    3. The final output is strictly well-formatted, valid JSON with no extra commentary or markdown formatting.`;
  return prompt;
};

export const searchToolsPrompt = (query: string) => {
  const prompt = `Search for AI tools that match the query: "${query}". 
  Please ensure your response includes relevant tools based on the search query. For each tool, gather and include comprehensive details including:
    - Primary use case and target audience
    - Key features and standout functionalities
    - Pricing details and user statistics
    - User testimonials and reviews
    - Use cases and integrations
    - Similar tools and alternatives
    - All additional metadata and statistics

    Return your answer strictly as a JSON array where each element is an object conforming to the following TypeScript interface:

    ${toolInterface}

    Ensure that:
    1. Each tool's object includes all the fields listed above. If certain details are not available, provide an appropriate null or empty value.
    2. The "description" field succinctly summarizes the tool's capabilities, primary use case, and its target market.
    3. The final output is strictly well-formatted, valid JSON with no extra commentary or markdown formatting.`;
  return prompt;
};

export const aiNewsPrompt = () => {
  const prompt = `Research and provide the latest 5 significant news or developments in the AI industry.
  For each news item, include:
    - Title
    - Publication date
    - Source
    - A brief summary
    - Impact on the AI industry
    - Relevant AI categories or tools affected

    Return your answer strictly as a JSON array where each element is an object conforming to the following structure:
    {
      "id": string,
      "title": string,
      "date": string,
      "source": string,
      "summary": string,
      "impact": string,
      "categories": string[],
      "relatedTools": string[]
    }

    Ensure the output is strictly well-formatted, valid JSON with no extra commentary or markdown formatting.`;
  return prompt;
};

export const categoryToolsPrompt = (category: string) => {
  const prompt = `Research and list the top 8 AI tools in the "${category}" category.
  For each tool, gather and include comprehensive details including:
    - Primary use case and target audience
    - Key features and standout functionalities
    - Pricing details and user statistics
    - User testimonials and reviews
    - Use cases and integrations
    - Similar tools and alternatives
    - All additional metadata and statistics

    Return your answer strictly as a JSON array where each element is an object conforming to the following TypeScript interface:

    ${toolInterface}

    Ensure that:
    1. Each tool's object includes all the fields listed above. If certain details are not available, provide an appropriate null or empty value.
    2. The "description" field succinctly summarizes the tool's capabilities, primary use case, and its target market.
    3. The final output is strictly well-formatted, valid JSON with no extra commentary or markdown formatting.`;
  return prompt;
};
