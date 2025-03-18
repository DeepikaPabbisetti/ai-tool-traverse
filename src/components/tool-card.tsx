
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, ArrowRight } from "lucide-react";
import { AITool } from "@/types/tools";
import { motion } from "framer-motion";

interface ToolCardProps {
  tool: AITool;
  featured?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, featured = false }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card 
        className={`overflow-hidden transition-all duration-300 h-full flex flex-col ${
          featured 
            ? 'border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-gray-950' 
            : 'hover:border-blue-200 dark:hover:border-blue-800'
        } ${isHovered ? 'shadow-lg' : 'shadow-md'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!imageError ? (
              <div className="relative w-12 h-12">
                <img
                  src={tool.logoUrl}
                  alt={`${tool.name} logo`}
                  className="w-12 h-12 rounded-md object-contain p-1 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
                  onError={handleImageError}
                />
                {featured && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
                    <Star className="h-3 w-3 fill-white text-white" />
                  </span>
                )}
              </div>
            ) : (
              <div className="w-12 h-12 rounded-md bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                  {tool.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg truncate max-w-[12rem]">{tool.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{tool.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{tool.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
            {tool.description}
          </p>
          
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {tool.tags && tool.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tool.trending && (
                <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
                  Trending
                </Badge>
              )}
              {tool.featured && (
                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                  Featured
                </Badge>
              )}
            </div>
            
            <div>
              <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Key Features</h4>
              <ul className="text-xs space-y-1">
                {tool.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-green-500">•</span>
                    <span className="text-gray-700 dark:text-gray-300 line-clamp-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t p-4 bg-gray-50 dark:bg-gray-900/30">
          <Button asChild variant="ghost" size="sm" className="gap-1 hover:bg-blue-50 dark:hover:bg-blue-950/30">
            <Link to={`/tool/${tool.id}`}>
              <span>Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="sm" className="gap-1 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30">
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              <span>Visit</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ToolCard;
