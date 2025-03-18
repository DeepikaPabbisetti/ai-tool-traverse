
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AITool, AINews, ToolCategory } from "@/types/tools";
import getAiResponse from "@/lib/ai-service";
import { 
  trendingToolsPrompt, 
  featuredToolsPrompt, 
  searchToolsPrompt, 
  aiNewsPrompt,
  categoryToolsPrompt
} from "@/lib/prompts";

export function useTrendingTools(countryFilter?: string) {
  return useQuery({
    queryKey: ["trending-tools", countryFilter],
    queryFn: async () => {
      try {
        const prompt = trendingToolsPrompt(countryFilter);
        const response = await getAiResponse(prompt);
        return JSON.parse(response) as AITool[];
      } catch (error) {
        console.error("Error fetching trending tools:", error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useFeaturedTools() {
  return useQuery({
    queryKey: ["featured-tools"],
    queryFn: async () => {
      try {
        const prompt = featuredToolsPrompt();
        const response = await getAiResponse(prompt);
        return JSON.parse(response) as AITool[];
      } catch (error) {
        console.error("Error fetching featured tools:", error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useSearchTools(query: string) {
  return useQuery({
    queryKey: ["search-tools", query],
    queryFn: async () => {
      if (!query) return [];
      try {
        const prompt = searchToolsPrompt(query);
        const response = await getAiResponse(prompt);
        return JSON.parse(response) as AITool[];
      } catch (error) {
        console.error("Error searching tools:", error);
        return [];
      }
    },
    enabled: !!query,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useAINews() {
  return useQuery({
    queryKey: ["ai-news"],
    queryFn: async () => {
      try {
        const prompt = aiNewsPrompt();
        const response = await getAiResponse(prompt);
        return JSON.parse(response) as AINews[];
      } catch (error) {
        console.error("Error fetching AI news:", error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useCategoryTools(category: ToolCategory | null) {
  return useQuery({
    queryKey: ["category-tools", category],
    queryFn: async () => {
      if (!category) return [];
      try {
        const prompt = categoryToolsPrompt(category);
        const response = await getAiResponse(prompt);
        return JSON.parse(response) as AITool[];
      } catch (error) {
        console.error(`Error fetching tools for category ${category}:`, error);
        return [];
      }
    },
    enabled: !!category,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
