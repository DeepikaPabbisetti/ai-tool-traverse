
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/75 dark:bg-gray-900/75 border-b border-gray-200 dark:border-gray-800">
      <div className="container flex items-center justify-between h-16 mx-auto px-4">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            AI Tool Hub
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
            Home
          </Link>
          <Link to="/categories" className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
            Categories
          </Link>
          <Link to="/trending" className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
            Trending
          </Link>
          <Link to="/news" className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
            AI News
          </Link>
        </div>

        <form onSubmit={handleSearch} className="hidden md:flex relative w-1/3 max-w-md">
          <Input
            type="search"
            placeholder="Search AI tools..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost" 
            className="absolute right-0 top-0 h-full"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 space-y-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <form onSubmit={handleSearch} className="flex relative">
            <Input
              type="search"
              placeholder="Search AI tools..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
          
          <div className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/trending" 
              className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Trending
            </Link>
            <Link 
              to="/news" 
              className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              AI News
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
