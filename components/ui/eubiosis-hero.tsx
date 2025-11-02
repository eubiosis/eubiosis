import React, { useState, useEffect, useRef } from 'react';
import { TextSplit } from './split-text';
import Image from 'next/image';
import Link from 'next/link';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const EubiosisHero = ({ onIllnessClick, onBrowsingClick }: { onIllnessClick?: (illness: string) => void; onBrowsingClick?: () => void }) => {
  const [mouseGradientStyle, setMouseGradientStyle] = useState({
    left: '0px',
    top: '0px',
    opacity: 0,
  });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const floatingElementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const animateWords = () => {
      const wordElements = document.querySelectorAll('.word-animate');
      wordElements.forEach(word => {
        const delay = parseInt(word.getAttribute('data-delay') || '0') || 0;
        setTimeout(() => {
          if (word) (word as HTMLElement).style.animation = 'word-appear 0.8s ease-out forwards';
        }, delay);
      });
    };
    const timeoutId = setTimeout(animateWords, 500);
    return () => clearTimeout(timeoutId);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMouseGradientStyle({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        opacity: 1,
      });
    };
    const handleMouseLeave = () => {
      setMouseGradientStyle(prev => ({ ...prev, opacity: 0 }));
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    
    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 1000);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [mounted]);
  
  useEffect(() => {
    if (!mounted) return;
    
    const wordElements = document.querySelectorAll('.word-animate');
    const handleMouseEnter = (e: Event) => { 
      if (e.target) (e.target as HTMLElement).style.textShadow = '0 0 20px rgba(74, 174, 155, 0.5)'; 
    };
    const handleMouseLeave = (e: Event) => { 
      if (e.target) (e.target as HTMLElement).style.textShadow = 'none'; 
    };
    wordElements.forEach(word => {
      word.addEventListener('mouseenter', handleMouseEnter);
      word.addEventListener('mouseleave', handleMouseLeave);
    });
    return () => {
      wordElements.forEach(word => {
        if (word) {
          word.removeEventListener('mouseenter', handleMouseEnter);
          word.removeEventListener('mouseleave', handleMouseLeave);
        }
      });
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    
    const elements = document.querySelectorAll('.floating-element-animate');
    floatingElementsRef.current = Array.from(elements) as HTMLElement[];
    const handleScroll = () => {
      if (!scrolled) {
        setScrolled(true);
        floatingElementsRef.current.forEach((el, index) => {
          setTimeout(() => {
            if (el) {
              el.style.animationPlayState = 'running';
              el.style.opacity = ''; 
            }
          }, (parseFloat(el.style.animationDelay || "0") * 1000) + index * 100);
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <style jsx>{`
        #mouse-gradient-eubiosis {
          position: fixed;
          pointer-events: none;
          border-radius: 9999px;
          background-image: radial-gradient(circle, rgba(74, 174, 155, 0.08), rgba(74, 174, 155, 0.05), transparent 70%);
          transform: translate(-50%, -50%);
          will-change: left, top, opacity;
          transition: left 70ms linear, top 70ms linear, opacity 300ms ease-out;
        }
        @keyframes word-appear { 
          0% { opacity: 0; transform: translateY(30px) scale(0.8); filter: blur(10px); } 
          50% { opacity: 0.8; transform: translateY(10px) scale(0.95); filter: blur(2px); } 
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } 
        }
        @keyframes grid-draw { 
          0% { stroke-dashoffset: 1000; opacity: 0; } 
          50% { opacity: 0.3; } 
          100% { stroke-dashoffset: 0; opacity: 0.15; } 
        }
        @keyframes pulse-glow { 
          0%, 100% { opacity: 0.1; transform: scale(1); } 
          50% { opacity: 0.3; transform: scale(1.1); } 
        }
        .word-animate { 
          display: inline-block; 
          opacity: 0; 
          margin: 0 0.1em; 
          transition: color 0.3s ease, transform 0.3s ease; 
        }
        .word-animate:hover { 
          color: #8dcdc6; 
          transform: translateY(-2px); 
        }
        .grid-line { 
          stroke: rgba(141, 205, 198, 0.2); 
          stroke-width: 0.5; 
          opacity: 0; 
          stroke-dasharray: 5 5; 
          stroke-dashoffset: 1000; 
          animation: grid-draw 2s ease-out forwards; 
        }
        .detail-dot { 
          fill: #8dcdc6; 
          opacity: 0; 
          animation: pulse-glow 3s ease-in-out infinite; 
        }
        .corner-element-animate { 
          position: absolute; 
          width: 40px; 
          height: 40px; 
          border: 1px solid rgba(141, 205, 198, 0.2); 
          opacity: 0; 
          animation: word-appear 1s ease-out forwards; 
        }
        .text-decoration-animate { 
          position: relative; 
        }
        .text-decoration-animate::after { 
          content: ''; 
          position: absolute; 
          bottom: -4px; 
          left: 0; 
          width: 0; 
          height: 1px; 
          background: linear-gradient(90deg, transparent, #8dcdc6, transparent); 
          animation: underline-grow 2s ease-out forwards; 
          animation-delay: 2s; 
        }
        @keyframes underline-grow { 
          to { width: 100%; } 
        }
        .floating-element-animate { 
          position: absolute; 
          width: 2px; 
          height: 2px; 
          background: #8dcdc6; 
          border-radius: 50%; 
          opacity: 0; 
          animation: float 4s ease-in-out infinite; 
          animation-play-state: paused; 
        }
        @keyframes float { 
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; } 
          25% { transform: translateY(-10px) translateX(5px); opacity: 0.6; } 
          50% { transform: translateY(-5px) translateX(-3px); opacity: 0.4; } 
          75% { transform: translateY(-15px) translateX(7px); opacity: 0.8; } 
        }
        .ripple-effect { 
          position: fixed; 
          width: 4px; 
          height: 4px; 
          background: rgba(74, 174, 155, 0.6); 
          border-radius: 50%; 
          transform: translate(-50%, -50%); 
          pointer-events: none; 
          animation: pulse-glow 1s ease-out forwards; 
          z-index: 9999; 
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden">
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="gridEubiosisResponsive" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(74, 174, 155, 0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridEubiosisResponsive)" />
          <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: '0.5s' }} />
          <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: '1s' }} />
          <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" style={{ animationDelay: '1.5s' }} />
          <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" style={{ animationDelay: '2s' }} />
          <line x1="50%" y1="0" x2="50%" y2="100%" className="grid-line" style={{ animationDelay: '2.5s', opacity: '0.05' }} />
          <line x1="0" y1="50%" x2="100%" y2="50%" className="grid-line" style={{ animationDelay: '3s', opacity: '0.05' }} />
          <circle cx="20%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: '3s' }} />
          <circle cx="80%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: '3.2s' }} />
          <circle cx="20%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: '3.4s' }} />
          <circle cx="80%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: '3.6s' }} />
          <circle cx="50%" cy="50%" r="1.5" className="detail-dot" style={{ animationDelay: '4s' }} />
        </svg>

        {/* Responsive Corner Elements */}
        <div className="corner-element-animate top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8" style={{ animationDelay: '4s' }}>
          <div className="absolute top-0 left-0 w-2 h-2 bg-accent opacity-30 rounded-full"></div>
        </div>
        <div className="corner-element-animate top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8" style={{ animationDelay: '4.2s' }}>
          <div className="absolute top-0 right-0 w-2 h-2 bg-accent opacity-30 rounded-full"></div>
        </div>
        <div className="corner-element-animate bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8" style={{ animationDelay: '4.4s' }}>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-accent opacity-30 rounded-full"></div>
        </div>
        <div className="corner-element-animate bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8" style={{ animationDelay: '4.6s' }}>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-accent opacity-30 rounded-full"></div>
        </div>

        <div className="floating-element-animate" style={{ top: '25%', left: '15%', animationDelay: '0.5s' }}></div>
        <div className="floating-element-animate" style={{ top: '60%', left: '85%', animationDelay: '1s' }}></div>
        <div className="floating-element-animate" style={{ top: '40%', left: '10%', animationDelay: '1.5s' }}></div>
        <div className="floating-element-animate" style={{ top: '75%', left: '90%', animationDelay: '2s' }}></div>

        {/* Responsive Main Content Padding */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 py-10 sm:px-8 sm:py-12 md:px-16 md:py-20 mt-0 sm:-mt-20">
          
          {/* Two Column Layout */}
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-16 items-center">
            
            {/* Left Column - Text Content */}
            <div className="text-left relative">
              {/* Top tagline */}
              <div className="mb-6 mt-8 relative">
                <h2 className="text-lg sm:text-xl md:text-2xl font-mono font-medium text-white uppercase tracking-[0.3em] opacity-90">
                  <span className="word-animate" data-delay="0">Eubiosis</span>
                </h2>
                <h2 className="text-xs sm:text-sm font-mono font-light text-white/80 uppercase tracking-[0.2em] opacity-80 absolute top-2 left-44">
                  <span className="word-animate" data-delay="4200">Nourish,</span>{' '}
                  <span className="word-animate" data-delay="4400">heal,</span>{' '}
                  <span className="word-animate" data-delay="4600">thrive</span>
                </h2>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight leading-tight tracking-tight text-white text-decoration-animate mb-8">
                <div className="mb-4 md:mb-6">
                  <span className="word-animate" data-delay="1200">Restore</span>{' '}
                  <span className="word-animate" data-delay="1400">your</span>{' '}
                  <span className="word-animate" data-delay="1600">gut,</span>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin text-white/90 leading-relaxed tracking-wide">
                  <span className="word-animate" data-delay="1800">reclaim</span>{' '}
                  <span className="word-animate" data-delay="2000">your</span>{' '}
                  <span className="word-animate" data-delay="2200">vitality</span>
                </div>
              </h1>

              {/* Interactive Split Text */}
              <div className="mb-6 opacity-0" style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '3.8s' }}>
                <div className="text-2xl sm:text-3xl md:text-4xl font-light text-white/90">
                  <TextSplit
                    className=""
                    topClassName="text-white/90"
                    bottomClassName="text-white/60"
                    maxMove={80}
                    falloff={0.2}
                    autoDemo={true}
                    autoDemoDelay={2000}
                    align="left"
                  >
                    Nature in a bottle
                  </TextSplit>
                </div>
              </div>

              {/* Illness Buttons */}
              <div className="mt-8 w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                  <button
                    key="Diabetes"
                    onClick={() => onIllnessClick?.('Diabetes')}
                    className="btn-diabetes"
                  >
                    Diabetes
                  </button>
                  <button
                    key="IBS"
                    onClick={() => onIllnessClick?.('IBS')}
                    className="btn-ibs"
                  >
                    IBS
                  </button>
                  <button
                    key="Anxiety"
                    onClick={() => onIllnessClick?.('Anxiety')}
                    className="btn-anxiety"
                  >
                    Anxiety
                  </button>
                  <button
                    key="Depression"
                    onClick={() => onIllnessClick?.('Depression')}
                    className="btn-depression"
                  >
                    Depression
                  </button>
                  <button
                    key="Autoimmune"
                    onClick={() => onIllnessClick?.('Autoimmune')}
                    className="btn-autoimmune"
                  >
                    Autoimmune
                  </button>
                  <button
                    key="Digestive Issues"
                    onClick={() => onIllnessClick?.('Digestive Issues')}
                    className="btn-digestive"
                  >
                    Digestive Issues
                  </button>
                  <button
                    key="Skin Conditions"
                    onClick={() => onIllnessClick?.('Skin Conditions')}
                    className="btn-skin"
                  >
                    Skin Conditions
                  </button>
                  <button
                    key="Just Browsing"
                    onClick={() => onBrowsingClick?.()}
                    className="btn-browsing"
                  >
                    Just Browsing
                  </button>
                </div>
              </div>

              {/* Additional Action Buttons */}
              <div className="mt-6 flex justify-center gap-4">
                <button className="btn-secondary">
                  LEARN MORE
                </button>
                <Link href="/eubiosis-bottle/size-s/quantity-1">
                  <button className="btn">
                    SHOP NOW
                  </button>
                </Link>
              </div>

              {/* Detail Lines for Left Column */}
              <div className="absolute -left-6 sm:-left-8 top-1/2 transform -translate-y-1/2 w-3 sm:w-4 h-px bg-white/30 opacity-0 hidden lg:block" style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '5.0s' }}></div>
            </div>

            {/* Right Column - Product Image */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="w-full max-w-lg h-[500px] flex items-center justify-center relative">
                <Image
                  src="/images/bottles/bottle-combo.png"
                  alt="Eubiosis Bottle Combo"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain relative z-10"
                  priority
                />
                {/* Shadow underneath */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-black/20 rounded-full blur-xl"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Responsive Mouse Gradient */}
        <div 
          id="mouse-gradient-eubiosis"
          className="w-60 h-60 blur-xl sm:w-80 sm:h-80 sm:blur-2xl md:w-96 md:h-96 md:blur-3xl opacity-0"
          style={{
            left: mouseGradientStyle.left,
            top: mouseGradientStyle.top,
          }}
        ></div>

        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="ripple-effect"
            style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
          />
        ))}
      </div>
    </>
  );
};

export default EubiosisHero;
