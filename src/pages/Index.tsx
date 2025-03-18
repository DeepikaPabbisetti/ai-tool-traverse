
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import FeaturedTools from "@/components/featured-tools";
import TrendingTools from "@/components/trending-tools";
import CategorySection from "@/components/category-section";
import NewsSection from "@/components/news-section";

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={handleSearch} />
      <main className="flex-grow">
        <HeroSection onSearch={handleSearch} />
        <FeaturedTools />
        <TrendingTools />
        <CategorySection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
