
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ToolCard from "@/components/tool-card";
import { useCategoryTools } from "@/hooks/use-tools";
import { TOOL_CATEGORIES, ToolCategory } from "@/types/tools";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams<{ categorySlug: string }>();
  
  const getCategoryFromSlug = (slug: string): ToolCategory | null => {
    const normalized = slug.replace(/-/g, ' ').toLowerCase();
    const category = TOOL_CATEGORIES.find(cat => cat.toLowerCase() === normalized);
    return category || null;
  };
  
  const category = categorySlug ? getCategoryFromSlug(categorySlug) : null;
  
  const { 
    data: categoryTools, 
    isLoading, 
    error,
    refetch,
    isFetching
  } = useCategoryTools(category);

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onSearch={handleSearch} />
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-6">Category Not Found</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              The category you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/categories')}>
              View All Categories
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                {category} Tools
              </span>
            </h1>
            <Button 
              onClick={() => refetch()} 
              variant="outline" 
              disabled={isFetching}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> Failed to load {category} tools.</span>
            </div>
          )}
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="pt-4 flex justify-between">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryTools?.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
              
              {categoryTools?.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600 dark:text-gray-400">No tools found in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
