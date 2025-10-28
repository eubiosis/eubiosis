"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, X } from 'lucide-react';
import Image from 'next/image';

interface FeaturesProps {
  features: {
    id: number;
    icon: React.ElementType | string;
    title: string;
    description: string;
    image: string;
  }[];
  primaryColor?: string;
  progressGradientLight?: string;
  progressGradientDark?: string;
}

export function EubiosisFeatures() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const features = [
    {
      id: 1,
      icon: "/images/Gut_Harmony_Restored.png?v=2",
      title: "Gut Harmony Restored",
      description:
        "Eubiosis represents the perfect balance of your body's microbial ecosystem. When beneficial bacteria thrive, you experience optimal health and vitality.",
      image: "/images/hands.png",
    },
    {
      id: 2,
      icon: "/images/42_Beneficial_Strains.png?v=2",
      title: "42 Beneficial Strains",
      description:
        "Our advanced formula contains 42 carefully selected beneficial bacterial strains, suspended in pure organic honey for maximum effectiveness.",
      image: "/images/bottles/bottle.png",
    },
    {
      id: 3,
      icon: "/images/Natural_Delivery_System.png?v=2",
      title: "Natural Delivery System",
      description:
        "Organic honey serves as nature's perfect delivery system, ensuring optimal absorption and colonization of beneficial bacteria in your gut.",
      image: "/images/bottles/bottle-combo.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 0.1));
    }, 10);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }, 200);
    }
  }, [progress]);

  useEffect(() => {
    const activeFeatureElement = featureRefs.current[currentFeature];
    const container = containerRef.current;

    if (activeFeatureElement && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeFeatureElement.getBoundingClientRect();

      container.scrollTo({
        left:
          activeFeatureElement.offsetLeft -
          (containerRect.width - elementRect.width) / 2,
        behavior: "smooth",
      });
    }
  }, [currentFeature]);

  const handleFeatureClick = (index: number) => {
    setCurrentFeature(index);
    setProgress(0);
  };

  return (
    <div ref={sectionRef} className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="grid lg:grid-cols-3 grid-cols-1 gap-8 items-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Left Side - Heading */}
          <motion.div 
            className="text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className={`text-[#8bccc2] font-semibold text-sm uppercase tracking-wider block mb-4`}>
              Natural Gut Health. Real Results.
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text">
              What is Eubiosis?
            </h2>
          </motion.div>

          {/* Middle - Separator Line */}
          <motion.div 
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative w-40 h-px">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8bccc2] to-transparent rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#78b4aa] to-transparent rounded-full opacity-80"></div>
            </div>
          </motion.div>

          {/* Right Side - Description */}
          <motion.div 
            className="text-left lg:text-right"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <p className="text-base lg:text-lg text-text/70 leading-relaxed">
              Discover what makes our formula exceptional with these certified benefits
            </p>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 lg:gap-16 gap-8 items-center">
          {/* Left Side - Features with Progress Lines */}
          <div
            ref={containerRef}
            className="lg:space-y-8 md:space-x-6 lg:space-x-0 overflow-x-auto overflow-hidden no-scrollbar lg:overflow-visible flex lg:flex lg:flex-col flex-row order-1 pb-4 scroll-smooth"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;

              return (
                <div
                  key={feature.id}
                  ref={(el) => {
                    featureRefs.current[index] = el;
                  }}
                  className="relative cursor-pointer flex-shrink-0"
                  onClick={() => handleFeatureClick(index)}
                >
                  {/* Feature Content */}
                  <div
                    className={`
                    flex lg:flex-row flex-col items-start space-x-4 p-3 max-w-sm md:max-w-sm lg:max-w-2xl transition-all duration-300
                    ${
                      isActive
                        ? " bg-transparent md:shadow-xl dark:drop-shadow-lg rounded-xl md:border dark:border-none border-gray-200 "
                        : " "
                    }
                  `}
                  >
                    <div
                      className={`
                      p-4 hidden md:block rounded-[11px] transition-all duration-300
                      bg-[#8bccc2]/10 text-[#8bccc2] w-20 h-20 flex items-center justify-center
                    `}
                    >
                      {typeof Icon === 'string' ? (
                        <Image 
                          src={Icon} 
                          alt={feature.title}
                          width={46}
                          height={46}
                          className="object-contain"
                          style={{
                            transform: `scale(${feature.title === "Natural Delivery System" ? 1.5 : feature.title === "42 Beneficial Strains" ? 1.25 : 1.1})`,
                            transformOrigin: 'center'
                          }}
                        />
                      ) : (
                        React.createElement(Icon as React.ComponentType<{size: number}>, { 
                          size: 46,
                          style: {
                            transform: `scale(${feature.title === "Natural Delivery System" ? 1.5 : feature.title === "42 Beneficial Strains" ? 1.25 : 1.1})`,
                            transformOrigin: 'center'
                          }
                        } as any)
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3
                        className={`
                        text-lg md:mt-4 lg:mt-0 font-semibold mb-2 transition-colors duration-300
                        ${
                          isActive
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-white/80"
                        }
                      `}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`
                        transition-colors duration-300 text-sm
                        ${
                          isActive
                            ? "text-gray-600 dark:text-white/60"
                            : "text-gray-500 dark:text-white/40"
                        }
                      `}
                      >
                        {feature.description}
                      </p>
                      <div className="mt-4 bg-white dark:bg-black/80 rounded-sm h-1 overflow-hidden">
                        {isActive && (
                          <motion.div
                            className={`h-full bg-[#8bccc2]`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side - Video Placeholder */}
          <div className="relative order-1 w-full max-w-full mx-auto lg:order-2">
            <motion.div
              key={currentFeature}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full"
            >
              {/* Video Placeholder Container */}
              <div className="w-full max-w-[500px] h-[300px] lg:h-[400px] mx-auto bg-gradient-to-br from-[#8bccc2] to-[#78b4aa] rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center justify-center relative overflow-hidden cursor-pointer group"
                   onClick={() => setSelectedVideoIndex(currentFeature)}>
                
                {/* Video placeholder background pattern */}
                <div className="absolute inset-0 bg-black/20">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-32 h-20 bg-white/20 rounded-lg relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Play Button Overlay */}
                <div className="relative z-10 flex flex-col items-center space-y-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-white text-xl font-semibold mb-2">{features[currentFeature].title}</h3>
                    <p className="text-white/80 text-sm">Click to watch video</p>
                  </div>
                </div>

                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideoIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl p-8 shadow-2xl">
            <button
              onClick={() => setSelectedVideoIndex(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {features[selectedVideoIndex].title}
              </h3>
              
              {/* Large Video Placeholder */}
              <div className="relative bg-gradient-to-br from-[#8bccc2] to-[#78b4aa] rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-video flex items-center justify-center relative">
                  {/* Video placeholder background pattern */}
                  <div className="absolute inset-0 bg-black/30">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-32 h-20 bg-white/20 rounded-lg relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Large Play Button */}
                  <div className="relative z-10 flex flex-col items-center space-y-4">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                      <Play className="w-12 h-12 text-white ml-1" fill="white" />
                    </div>
                    <p className="text-white text-lg font-medium">Video Coming Soon</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                {features[selectedVideoIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
