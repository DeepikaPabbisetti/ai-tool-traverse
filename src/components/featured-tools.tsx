
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import { useFeaturedTools } from '@/hooks/use-tools';
import ToolCard from '@/components/tool-card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

const FeaturedTools = () => {
  const { data: featuredTools, isLoading, error } = useFeaturedTools();

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> Failed to load featured tools.</span>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Featured AI Tools
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our handpicked selection of exceptional AI tools that stand out for their innovation and utility
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-20 w-full" />
                <div className="flex space-x-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="pt-4 flex justify-between">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative">
            <Swiper
              modules={[Pagination, Navigation, Autoplay, EffectCards]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ 
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              autoplay={{ 
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="featured-swiper py-10"
            >
              {featuredTools?.map((tool) => (
                <SwiperSlide key={tool.id}>
                  <div className="p-2">
                    <ToolCard tool={tool} featured={true} />
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-button-next !text-blue-600 after:!text-sm"></div>
              <div className="swiper-button-prev !text-blue-600 after:!text-sm"></div>
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTools;
