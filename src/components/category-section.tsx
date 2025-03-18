
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TOOL_CATEGORIES, ToolCategory } from '@/types/tools';
import { motion } from 'framer-motion';
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
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
              Explore by Category
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse our comprehensive collection of AI tools organized by specialized categories
          </p>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {TOOL_CATEGORIES.map((category) => (
            <motion.div key={category} variants={item}>
              <Link 
                to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="block h-full"
              >
                <Card className="h-full overflow-hidden group border-transparent hover:border-green-200 dark:hover:border-green-900 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    <div className="p-4 rounded-full bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 text-green-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                      {getCategoryIcon(category)}
                    </div>
                    <h3 className="font-medium">{category}</h3>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="px-8 py-6 text-base border-green-200 dark:border-green-900 hover:bg-green-50 dark:hover:bg-green-900/20">
            <Link to="/categories" className="flex items-center gap-2">
              View All Categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
