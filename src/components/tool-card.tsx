
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, ArrowRight } from "lucide-react";
import { AITool } from "@/types/tools";

interface ToolCardProps {
  tool: AITool;
  featured?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, featured = false }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col ${featured ? 'border-blue-200 dark:border-blue-900' : ''}`}>
      <div className="relative p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!imageError ? (
            <img
              src={tool.logoUrl}
              alt={`${tool.name} logo`}
              className="w-10 h-10 rounded-md object-contain"
              onError={handleImageError}
            />
          ) : (
            <div className="w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
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
        <div className="flex items-center gap-1">
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
      
      <CardFooter className="flex justify-between border-t p-4">
        <Button asChild variant="ghost" size="sm">
          <Link to={`/tool/${tool.id}`}>
            <span className="mr-1">Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
        
        <Button asChild variant="outline" size="sm">
          <a href={tool.url} target="_blank" rel="noopener noreferrer">
            <span className="mr-1">Visit</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
