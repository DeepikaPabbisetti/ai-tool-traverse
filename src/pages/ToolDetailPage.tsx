
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useTrendingTools, useFeaturedTools } from "@/hooks/use-tools";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AITool } from "@/types/tools";
import { 
  ExternalLink, 
  Star, 
  Calendar, 
  Users, 
  MessageSquare, 
  Check, 
  X, 
  ChevronLeft,
  Puzzle 
} from "lucide-react";

const ToolDetailPage = () => {
  const navigate = useNavigate();
  const { toolId } = useParams<{ toolId: string }>();
  const [imageError, setImageError] = useState(false);
  
  const { data: trendingTools, isLoading: isTrendingLoading } = useTrendingTools();
  const { data: featuredTools, isLoading: isFeaturedLoading } = useFeaturedTools();
  
  const allTools = [...(trendingTools || []), ...(featuredTools || [])];
  const tool = allTools.find(t => t.id === toolId);
  
  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (isTrendingLoading || isFeaturedLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onSearch={handleSearch} />
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <div className="animate-pulse">
                <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-6"></div>
                <div className="h-6 w-48 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onSearch={handleSearch} />
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-6">Tool Not Found</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              The tool you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/')}>
              Return to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mb-6 flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                {!imageError ? (
                  <img
                    src={tool.logoUrl}
                    alt={`${tool.name} logo`}
                    className="w-20 h-20 rounded-md object-contain"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-20 h-20 rounded-md bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-500 dark:text-gray-400">
                      {tool.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold">{tool.name}</h1>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <span className="mr-4">{tool.category}</span>
                    {tool.company && (
                      <span>by <span className="font-medium">{tool.company}</span></span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
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
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                {tool.description}
              </p>
              
              <Tabs defaultValue="features" className="mb-8">
                <TabsList className="grid grid-cols-5 mb-6">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="pros-cons">Pros & Cons</TabsTrigger>
                  <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="features" className="space-y-4">
                  <h2 className="text-xl font-semibold mb-3">Key Features</h2>
                  <ul className="space-y-2">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="pros-cons" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3 text-green-600 dark:text-green-400">Pros</h2>
                    <ul className="space-y-2">
                      {tool.pros.map((pro, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3 text-red-600 dark:text-red-400">Cons</h2>
                    <ul className="space-y-2">
                      {tool.cons.map((con, index) => (
                        <li key={index} className="flex items-start">
                          <X className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="use-cases" className="space-y-4">
                  <h2 className="text-xl font-semibold mb-3">Use Cases</h2>
                  {tool.useCases && tool.useCases.length > 0 ? (
                    <ul className="space-y-4">
                      {tool.useCases.map((useCase, index) => (
                        <li key={index} className="flex items-start">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">No use cases available.</p>
                  )}
                  
                  {tool.integrations && tool.integrations.length > 0 && (
                    <div className="mt-8">
                      <h2 className="text-xl font-semibold mb-3 flex items-center">
                        <Puzzle className="h-5 w-5 mr-2" />
                        Integrations
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {tool.integrations.map((integration, index) => (
                          <Badge key={index} variant="secondary" className="text-sm">
                            {integration}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="pricing" className="space-y-6">
                  <h2 className="text-xl font-semibold mb-3">Pricing Plans</h2>
                  {tool.pricing && tool.pricing.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tool.pricing.map((plan, index) => (
                        <Card key={index} className={`overflow-hidden ${plan.recommended ? 'border-blue-500 dark:border-blue-600' : ''}`}>
                          {plan.recommended && (
                            <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
                              Recommended
                            </div>
                          )}
                          <CardContent className={`p-6 ${plan.recommended ? 'pt-4' : ''}`}>
                            <h3 className="font-semibold text-lg mb-1">{plan.plan}</h3>
                            <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">{plan.type}</div>
                            <div className="text-2xl font-bold mb-4">{plan.cost}</div>
                            
                            <Separator className="my-4" />
                            
                            <ul className="space-y-2">
                              {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start text-sm">
                                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">No pricing information available.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="reviews" className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">User Reviews</h2>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-semibold">{tool.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400">
                        {tool.reviews ? `(${tool.reviews} reviews)` : ''}
                      </span>
                    </div>
                  </div>
                  
                  {tool.testimonials && tool.testimonials.length > 0 ? (
                    <div className="space-y-6">
                      {tool.testimonials.map((testimonial, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{testimonial.author}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                            </div>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{testimonial.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">No testimonials available.</p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <Button asChild className="w-full" size="lg">
                      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        <span className="mr-2">Visit Website</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Rating</h3>
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-5 w-5 ${i < Math.floor(tool.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">{tool.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Users</h3>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-gray-500" />
                        <span>{tool.users}</span>
                      </div>
                    </div>
                    
                    {tool.reviews && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Reviews</h3>
                        <div className="flex items-center">
                          <MessageSquare className="h-5 w-5 mr-2 text-gray-500" />
                          <span>{tool.reviews} reviews</span>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Last Updated</h3>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                        <span>{tool.updated}</span>
                      </div>
                    </div>
                  </div>
                  
                  {tool.tags && tool.tags.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {tool.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {tool.alternatives && tool.alternatives.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Alternatives</h3>
                        <div className="space-y-3">
                          {tool.alternatives.map((alt) => (
                            <Link key={alt.id} to={`/tool/${alt.id}`} className="flex items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md">
                              <div className="h-8 w-8 mr-2">
                                <img
                                  src={alt.logoUrl}
                                  alt={`${alt.name} logo`}
                                  className="rounded-md object-contain w-full h-full"
                                  onError={(e) => (e.currentTarget.src = '')}
                                />
                              </div>
                              <span className="font-medium">{alt.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ToolDetailPage;
