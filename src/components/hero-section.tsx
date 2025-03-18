
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";
import { TOOL_CATEGORIES } from "@/types/tools";
import { motion } from "framer-motion";

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-indigo-950/20 dark:to-gray-950">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={item} className="mb-2 flex justify-center">
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              <Sparkles size={14} />
              <span>Discover the best AI tools for every need</span>
            </span>
          </motion.div>
          
          <motion.h1 variants={item} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Find Perfect AI Tools for Your Workflow
            </span>
          </motion.h1>
          
          <motion.p variants={item} className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            Explore our curated collection of powerful AI tools across various categories. Stay updated with trending, 
            featured, and category-specific solutions all in one place.
          </motion.p>
          
          <motion.div variants={item}>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative mb-10">
              <div className="flex shadow-lg rounded-lg">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <input 
                    type="search" 
                    name="search"
                    className="block w-full pl-12 pr-20 py-4 text-lg bg-white dark:bg-gray-800/60 backdrop-blur-sm border-0 dark:border-gray-700 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                    placeholder="Search AI tools..." 
                    required 
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg" 
                  className="px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-r-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Search
                </Button>
              </div>
            </form>
          </motion.div>
          
          <motion.div 
            variants={item}
            className="flex flex-wrap justify-center gap-3 text-sm"
          >
            <span className="text-gray-500 dark:text-gray-400 mr-1">Popular:</span>
            {TOOL_CATEGORIES.slice(0, 5).map((category) => (
              <Link 
                key={category}
                to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors"
              >
                {category}
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
