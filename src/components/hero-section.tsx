
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { TOOL_CATEGORIES } from "@/types/tools";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Discover the Best AI Tools
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Explore a curated collection of powerful AI tools for every need. Find trending, 
          featured, and category-specific solutions all in one place.
        </p>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative mb-10">
          <div className="flex">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input 
                type="search" 
                name="search"
                className="block w-full pl-10 pr-20 py-4 text-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Search AI tools..." 
                required 
              />
            </div>
            <Button 
              type="submit"
              size="lg" 
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Search
            </Button>
          </div>
        </form>
        
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400 mr-1">Popular:</span>
          {TOOL_CATEGORIES.slice(0, 5).map((category) => (
            <Link 
              key={category}
              to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
