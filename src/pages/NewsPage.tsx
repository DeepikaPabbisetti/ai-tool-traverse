
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useAINews } from "@/hooks/use-tools";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, RefreshCw, Globe, Lightbulb } from "lucide-react";

const NewsPage = () => {
  const navigate = useNavigate();
  
  const { 
    data: news, 
    isLoading, 
    error,
    refetch,
    isFetching
  } = useAINews();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Latest AI News
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
              <span className="block sm:inline"> Failed to load AI news.</span>
            </div>
          )}
          
          {isLoading ? (
            <div className="space-y-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="border rounded-lg p-6 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                  <Skeleton className="h-24 w-full" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {news?.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        <span>{item.source}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {item.summary}
                    </p>
                    
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2" />
                        Impact
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.impact}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.categories.map((category, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    
                    {item.relatedTools && item.relatedTools.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                          Related Tools
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {item.relatedTools.map((tool, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {news?.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600 dark:text-gray-400">No news available.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
