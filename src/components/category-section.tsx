
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TOOL_CATEGORIES, ToolCategory } from '@/types/tools';
import { 
  Cpu, 
  MessageSquare, 
  Eye, 
  Sparkles, 
  Bot, 
  BarChart, 
  Workflow, 
  Code, 
  BarChart2, 
  PencilRuler 
} from 'lucide-react';

const getCategoryIcon = (category: string) => {
  switch(category) {
    case 'Machine Learning':
      return <Cpu className="h-6 w-6" />;
    case 'Natural Language Processing':
      return <MessageSquare className="h-6 w-6" />;
    case 'Computer Vision':
      return <Eye className="h-6 w-6" />;
    case 'Generative AI':
      return <Sparkles className="h-6 w-6" />;
    case 'Conversational AI':
      return <Bot className="h-6 w-6" />;
    case 'Data Analysis':
      return <BarChart className="h-6 w-6" />;
    case 'Automation':
      return <Workflow className="h-6 w-6" />;
    case 'AI Development':
      return <Code className="h-6 w-6" />;
    case 'Business Intelligence':
      return <BarChart2 className="h-6 w-6" />;
    case 'Content Creation':
      return <PencilRuler className="h-6 w-6" />;
    default:
      return <Sparkles className="h-6 w-6" />;
  }
};

const CategorySection = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">
          <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
            Explore by Category
          </span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TOOL_CATEGORIES.map((category) => (
            <Link 
              key={category} 
              to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="block"
            >
              <Card className="h-full hover:shadow-md transition-shadow hover:border-green-200 dark:hover:border-green-900">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/20 text-green-500 mb-3">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="font-medium text-sm">{category}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/categories">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
