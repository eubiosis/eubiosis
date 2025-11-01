'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Zap, Shield, Sparkles, Droplet } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { EubiosisFeatures } from '@/components/ui/eubiosis-features'
import { BenefitGrid } from '@/components/ui/benefit-carousel'
import { AnimatedKeyIngredients } from '@/components/ui/animated-key-ingredients'
import EubiosisHero from '@/components/ui/eubiosis-hero'
import EubiosisTestimonials from '@/components/ui/eubiosis-testimonials'
import useExitIntent from '@/components/ui/exit-intent-popup'
import { productSchema } from '@/lib/seo'

export default function Home() {
  const { ExitIntentPopup } = useExitIntent();
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 });
  
  // Add state for view mode
  const [viewMode, setViewMode] = useState<'hero-only' | 'illness-selected' | 'browsing'>('hero-only');
  const [selectedIllness, setSelectedIllness] = useState<string | null>(null);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleIllnessClick = (illness: string) => {
    setSelectedIllness(illness);
    setViewMode('illness-selected');
  }

  const handleBrowsingClick = () => {
    setSelectedIllness(null);
    setViewMode('browsing');
  }

  const benefits = [
    {
      title: "100% Natural",
      description: "Made from pure, natural ingredients without any artificial additives or synthetic compounds."
    },
    {
      title: "Vegan",
      description: "Completely plant-based formula suitable for vegans and vegetarians with no animal-derived ingredients."
    },
    {
      title: "Non GMO",
      description: "Free from genetically modified organisms, ensuring natural genetic integrity in all ingredients."
    },
    {
      title: "Gluten Free",
      description: "Safe for those with celiac disease or gluten sensitivity, certified gluten-free formulation."
    },
    {
      title: "Dairy Free",
      description: "Contains no dairy products, making it suitable for lactose intolerant individuals."
    },
    {
      title: "Allergen Free",
      description: "Carefully formulated to avoid common allergens, safe for sensitive individuals."
    },
    {
      title: "Recyclable",
      description: "Environmentally conscious packaging that can be recycled to reduce environmental impact."
    },
    {
      title: "Third Party Tested",
      description: "Independently verified for purity, potency, and safety by certified testing laboratories."
    }
  ];

  useEffect(() => {
    /** 
        very simply js to capture mouse position 
        and set variables to the % location. Everything else is css/svg.
    **/
    function moveBg(e: PointerEvent) {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        (e.target as HTMLElement).style.setProperty('--x', String((e.clientX - rect.x) / rect.width * 100));
        (e.target as HTMLElement).style.setProperty('--y', String((e.clientY - rect.y) / rect.height * 100));
    }
    document.querySelectorAll('.gooey-btn').forEach(button => {
      button.addEventListener('pointermove', moveBg as EventListener)
    });

    /** just some JS for the intro animation, nothing here is needed
    for the gooey interaction. **/
    let x: any;
    function intro() {
        let i = 4; 
        let buttons = document.querySelectorAll('.gooey-btn');
        buttons.forEach($b => {
          ($b as HTMLElement).style.setProperty( "--a", '100%' );
        });
        x = setInterval(() => {
            buttons.forEach($b => {
              ($b as HTMLElement).style.setProperty( 
                  "--x", String(((Math.cos(i) + 2) / 3.6) * 100)
              );
              ($b as HTMLElement).style.setProperty( 
                  "--y", String(((Math.sin(i) + 2) / 3.6) * 100)
              );
            });
            i+= 0.03;
            if( i > 11.5 ) {
                clearInterval(x);
                buttons.forEach($b => {
                  ($b as HTMLElement).style.setProperty( "--a", '' );
                });
            }
        },16);
    }
    intro();
    document.querySelectorAll('.gooey-btn').forEach(button => {
      button.addEventListener('pointerover', (e) => {
        clearInterval(x);
        (e.target as HTMLElement).style.setProperty( "--a", '' );
      });
    });

    return () => {
      document.querySelectorAll('.gooey-btn').forEach(button => {
        button.removeEventListener('pointermove', moveBg as EventListener)
        button.removeEventListener('pointerover', () => {})
      })
      if (x) clearInterval(x)
    }
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <section 
        className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#e8f4f8] to-white"
        style={{
          backgroundImage: 'url(/images/hero%20bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        
        {/* Hero Section */}
        <EubiosisHero onIllnessClick={handleIllnessClick} onBrowsingClick={handleBrowsingClick} />
      </section>

      {/* SVG Filter for Gooey Buttons - Exact CodePen */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 1"></feFuncA>
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="5"></feGaussianBlur>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="-5 11"></feFuncA>
          </feComponentTransfer>
        </filter>
      </svg>

      {/* What is Eubiosis */}
      {(viewMode === 'illness-selected' || viewMode === 'browsing') && (
        <EubiosisFeatures illness={selectedIllness} onBrowsingClick={handleBrowsingClick} />
      )}

      {/* Key Benefits */}
      {viewMode === 'browsing' && (
        <BenefitGrid benefits={benefits} />
      )}

      {/* Key Ingredients */}
      {viewMode === 'browsing' && (
        <AnimatedKeyIngredients />
      )}

      {/* How It Works */}
      {viewMode === 'browsing' && (
        <section ref={howItWorksRef} className="py-20 px-4 bg-[#f9f9f9]">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <motion.div 
              className="grid lg:grid-cols-3 grid-cols-1 gap-8 items-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Left Side - Heading */}
              <motion.div 
                className="text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={howItWorksInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <span className="text-[#8bccc2] font-semibold text-sm uppercase tracking-wider block mb-4">
                  Natural Gut Health. Real Results.
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text">
                  How It Works
                </h2>
              </motion.div>

              {/* Middle - Separator Line */}
              <motion.div 
                className="hidden lg:flex justify-center"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={howItWorksInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
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
                animate={howItWorksInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                  Discover the science behind our proven 4-step process for optimal gut health and wellness
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={howItWorksInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                {
                  number: "01",
                  title: "Microbial Restoration",
                  description: "42 beneficial strains colonize your gut, restoring natural balance."
                },
                {
                  number: "02", 
                  title: "Nutrient Activation",
                  description: "Fulvic acid enhances absorption of vitamins and minerals."
                },
                {
                  number: "03",
                  title: "Immune Optimization", 
                  description: "Strengthened gut barrier supports whole-body immunity."
                },
                {
                  number: "04",
                  title: "Long-Term Wellness",
                  description: "Sustained use promotes lasting vitality and digestive health."
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="card space-y-4"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={howItWorksInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.8 + (index * 0.15), 
                    ease: "easeOut" 
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="text-4xl font-medium text-accent">{step.number}</div>
                  <h3 className="text-xl font-medium">{step.title}</h3>
                  <p className="text-text/80">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {viewMode === 'browsing' && (
        <section ref={testimonialsRef} className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <motion.div 
              className="grid lg:grid-cols-3 grid-cols-1 gap-8 items-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Left Side - Heading */}
              <motion.div 
                className="text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={testimonialsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <span className="text-[#8bccc2] font-semibold text-sm uppercase tracking-wider block mb-4">
                  Natural Gut Health. Real Results.
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text">
                  What Our Customers Say
                </h2>
              </motion.div>

              {/* Middle - Separator Line */}
              <motion.div 
                className="hidden lg:flex justify-center"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={testimonialsInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
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
                animate={testimonialsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                  Real stories from people who have transformed their gut health with Eubiosis
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <EubiosisTestimonials />
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {viewMode === 'browsing' && (
        <div className="w-full">
          <Image
            src="/images/Website Banner.png"
            alt="Start your journey to gut balance today"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
            priority={false}
          />
        </div>
      )}

      {/* Exit Intent Popup */}
      <ExitIntentPopup />

      {/* Product Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
    </main>
  )
}
