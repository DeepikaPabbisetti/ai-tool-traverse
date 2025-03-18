
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ToolCard from "@/components/tool-card";
import { useSearchTools } from "@/hooks/use-tools";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [currentQuery, setCurrentQuery] = useState(initialQuery);
  
  const { 
    data: searchResults, 
    isLoading, 
    error,
    refetch,
    isFetching 
  } = useSearchTools(currentQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentQuery(searchQuery.trim());
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`, { replace: true });
    }
  };

  useEffect(() => {
    const query = queryParams.get("q") || "";
    setSearchQuery(query);
    setCurrentQuery(query);
  }, [location.search]);

  const handleHeaderSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleHeaderSearch} />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Search Results
              </span>
            </h1>
            
            <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
              <Input
                type="search"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" disabled={isFetching}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => refetch()} 
                disabled={isFetching}
              >
                <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              </Button>
            </form>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> Failed to search tools.</span>
            </div>
          )}
          
          {currentQuery && (
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Showing results for: <span className="font-medium">{currentQuery}</span>
            </p>
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
              {searchResults && searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {searchResults.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  {currentQuery ? (
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      No results found for "{currentQuery}". Try a different search term.
                    </p>
                  ) : (
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      Enter a search term to find AI tools.
                    </p>
                  )}
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

export default SearchPage;
