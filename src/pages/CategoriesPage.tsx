
import { useNavigate } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { TOOL_CATEGORIES } from "@/types/tools";
import { Link } from "react-router-dom";
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
} from "lucide-react";

const getCategoryIcon = (category: string) => {
  switch(category) {
    case 'Machine Learning':
      return <Cpu className="h-8 w-8" />;
    case 'Natural Language Processing':
      return <MessageSquare className="h-8 w-8" />;
    case 'Computer Vision':
      return <Eye className="h-8 w-8" />;
    case 'Generative AI':
      return <Sparkles className="h-8 w-8" />;
    case 'Conversational AI':
      return <Bot className="h-8 w-8" />;
    case 'Data Analysis':
      return <BarChart className="h-8 w-8" />;
    case 'Automation':
      return <Workflow className="h-8 w-8" />;
    case 'AI Development':
      return <Code className="h-8 w-8" />;
    case 'Business Intelligence':
      return <BarChart2 className="h-8 w-8" />;
    case 'Content Creation':
      return <PencilRuler className="h-8 w-8" />;
    default:
      return <Sparkles className="h-8 w-8" />;
  }
};

const getCategoryDescription = (category: string): string => {
  switch(category) {
    case 'Machine Learning':
      return 'Tools for training models, data processing, and implementing ML algorithms.';
    case 'Natural Language Processing':
      return 'Solutions for language understanding, translation, and text analysis.';
    case 'Computer Vision':
      return 'Tools for image recognition, object detection, and visual data processing.';
    case 'Generative AI':
      return 'Platforms for creating content, including text, images, code, and more.';
    case 'Conversational AI':
      return 'Chatbots, virtual assistants, and tools for building interactive experiences.';
    case 'Data Analysis':
      return 'Solutions for processing, visualizing, and extracting insights from data.';
    case 'Automation':
      return 'Tools for streamlining workflows and automating repetitive tasks.';
    case 'AI Development':
      return 'Frameworks, environments, and tools for building AI applications.';
    case 'Business Intelligence':
      return 'Platforms for analytics, reporting, and data-driven decision making.';
    case 'Content Creation':
      return 'Tools for generating and optimizing various types of content.';
    default:
      return 'Explore AI tools in this category.';
  }
};

const CategoriesPage = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">
            <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
              AI Tool Categories
            </span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOL_CATEGORIES.map((category) => (
              <Link 
                key={category} 
                to={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="block"
              >
                <Card className="h-full hover:shadow-lg transition-shadow hover:border-green-200 dark:hover:border-green-900">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/20 text-green-500 mr-4">
                        {getCategoryIcon(category)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">{category}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {getCategoryDescription(category)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
