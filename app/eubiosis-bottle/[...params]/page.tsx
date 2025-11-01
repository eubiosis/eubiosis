'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Droplet, FlaskConical, MapPin, Truck, Plus, Minus, ArrowLeft } from 'lucide-react'
import { productSchema } from '@/lib/seo'
import { useRouter } from 'next/navigation'

interface PageProps {
  params: {
    params?: string[]
  }
}

export default function EubiosisBottle({ params }: PageProps) {
  // Parse URL parameters
  const router = useRouter()
  const urlParams = params.params || []
  
  // Extract size and quantity from URL
  const getSizeFromUrl = () => {
    const sizeParam = urlParams.find(param => param.startsWith('size-'))
    if (sizeParam === 'size-s') return '50ml'
    if (sizeParam === 'size-j') return '100ml'
    return '50ml'
  }
  
  const getQuantityFromUrl = () => {
    const quantityParam = urlParams.find(param => param.startsWith('quantity-'))
    if (quantityParam) {
      const qty = parseInt(quantityParam.replace('quantity-', ''))
      return qty > 0 ? qty : 1
    }
    return 1
  }

  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>(getSizeFromUrl())
  const [quantity, setQuantity] = useState(getQuantityFromUrl())
  const [activeTab, setActiveTab] = useState<'ingredients' | 'usage' | 'faq' | 'reviews'>('ingredients')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [animatedSize, setAnimatedSize] = useState(50)
  const [animatedPrice, setAnimatedPrice] = useState(499)

  // Animation refs
  const productSectionRef = useRef<HTMLDivElement>(null)
  const tabsSectionRef = useRef<HTMLDivElement>(null)
  const trustSectionRef = useRef<HTMLDivElement>(null)
  
  // Animation triggers
  const productSectionInView = useInView(productSectionRef, { once: true, amount: 0.2 })
  const tabsSectionInView = useInView(tabsSectionRef, { once: true, amount: 0.3 })
  const trustSectionInView = useInView(trustSectionRef, { once: true, amount: 0.5 })

  // Product images array
  const productImages = [
    {
      src: "/images/Website Product Image.png",
      alt: "Eubiosis Main Product"
    },
    {
      src: "/images/bottles/bottle-combo.png",
      alt: "Eubiosis Bottle Combo"
    }
  ]

  // Animate number counting
  const animateNumber = (start: number, end: number, setter: (value: number) => void, duration: number = 500) => {
    const startTime = Date.now()
    const difference = end - start

    const updateNumber = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.round(start + (difference * easeOutQuart))
      
      setter(current)
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber)
      }
    }
    
    requestAnimationFrame(updateNumber)
  }

  // Update URL when parameters change without page refresh
  const updateUrl = (newSize?: '50ml' | '100ml', newQuantity?: number) => {
    const size = newSize || selectedSize
    const qty = newQuantity || quantity
    const sizeParam = size === '50ml' ? 'size-s' : 'size-j'
    const quantityParam = `quantity-${qty}`
    const newUrl = `/eubiosis-bottle/${sizeParam}/${quantityParam}`
    
    // Update URL without page refresh
    window.history.replaceState(null, '', newUrl)
  }

  // Handle size change with animation
  const handleSizeChange = (newSize: '50ml' | '100ml') => {
    const currentSize = selectedSize === '50ml' ? 50 : 100
    const targetSize = newSize === '50ml' ? 50 : 100
    
    setSelectedSize(newSize)
    animateNumber(currentSize, targetSize, setAnimatedSize, 600)
    updateUrl(newSize, quantity)
  }

  // Handle quantity change with price animation
  const handleQuantityChange = (newQuantity: number) => {
    const currentTotal = calculateTotal()
    setQuantity(newQuantity)
    
    // Calculate new total with new quantity
    const basePrice = pricing[selectedSize].basePrice
    const subtotal = basePrice * newQuantity
    const discount = getDiscount(newQuantity)
    const newTotal = Math.round(subtotal * (1 - discount))
    
    animateNumber(currentTotal, newTotal, setAnimatedPrice, 400)
    updateUrl(selectedSize, newQuantity)
  }

  // Update price when size changes
  useEffect(() => {
    const newTotal = calculateTotal()
    animateNumber(animatedPrice, newTotal, setAnimatedPrice, 400)
  }, [selectedSize])

  useEffect(() => {
    /** 
        very simply js to capture mouse position 
        and set variables to the % location. Everything else is css/svg.
    **/
    function moveBg(e: PointerEvent) {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        (e.target as HTMLElement).style.setProperty('--x', ((e.clientX - rect.x) / rect.width * 100).toString());
        (e.target as HTMLElement).style.setProperty('--y', ((e.clientY - rect.y) / rect.height * 100).toString());
    }
    document.querySelectorAll('.gooey-btn').forEach(button => {
      button.addEventListener('pointermove', moveBg as EventListener)
    });

    /** just some JS for the intro animation, nothing here is needed
    for the gooey interaction. **/
    let x: NodeJS.Timeout;
    function intro() {
        let i = 4; 
        x = setInterval(() => {
            document.querySelectorAll('.gooey-btn').forEach(button => {
              (button as HTMLElement).style.setProperty('--x', (Math.random() * 100).toString());
              (button as HTMLElement).style.setProperty('--y', (Math.random() * 100).toString());
            });
            i--;
            if (i === 0) {
                clearInterval(x);
            }
        }, 100);
    }
    
    function introTwo() {
        let i = 4; 
        x = setInterval(() => {
            document.querySelectorAll('.gooey-btn').forEach(button => {
              (button as HTMLElement).style.setProperty('--x', (Math.random() * 100).toString());
              (button as HTMLElement).style.setProperty('--y', (Math.random() * 100).toString());
            });
            i--;
            if (i === 0) {
                clearInterval(x);
            }
        }, 100);
    }
    
    function introThree() {
        let i = 4; 
        x = setInterval(() => {
            document.querySelectorAll('.gooey-btn').forEach(button => {
              (button as HTMLElement).style.setProperty('--x', (Math.random() * 100).toString());
              (button as HTMLElement).style.setProperty('--y', (Math.random() * 100).toString());
            });
            i--;
            if (i === 0) {
                clearInterval(x);
            }
        }, 100);
    }
    intro();
    introTwo();
    introThree();
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

  // Handle escape key to close zoom
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomed) {
        setIsZoomed(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isZoomed])

  const pricing = {
    '50ml': { basePrice: 499 },
    '100ml': { basePrice: 799 }
  }

  // Calculate discount based on quantity
  const getDiscount = (qty: number) => {
    if (qty >= 3) return 0.20 // 20% off for 3+
    if (qty >= 2) return 0.10 // 10% off for 2+
    return 0 // No discount for 1
  }

  // Calculate total price with discount
  const calculateTotal = () => {
    const basePrice = pricing[selectedSize].basePrice
    const subtotal = basePrice * quantity
    const discount = getDiscount(quantity)
    return Math.round(subtotal * (1 - discount))
  }

  // Get discount text
  const getDiscountText = () => {
    const discount = getDiscount(quantity)
    if (discount === 0.20) return '20% Saved!'
    if (discount === 0.10) return '10% Saved!'
    return null
  }

  return (
    <main>
      {/* Product Display Section */}
      <motion.section 
        ref={productSectionRef}
        className="py-12 px-4 bg-white relative"
        style={{
          backgroundImage: 'url(/images/hero%20bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">

          <div className="grid md:grid-cols-2 gap-8 items-start pt-1">
            {/* Product Image Gallery */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, x: -50 }}
              animate={productSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Main Image */}
              <div className="flex justify-center">
                <motion.div 
                  className={`w-full max-w-md h-[300px] md:h-[500px] rounded-eubiosis overflow-hidden cursor-zoom-in transition-all duration-300 ${
                    isZoomed ? 'fixed inset-0 bg-black/90 flex items-center justify-center cursor-zoom-out z-[60]' : ''
                  }`}
                  onClick={(e) => {
                    if (isZoomed && e.target === e.currentTarget) {
                      setIsZoomed(false)
                    } else if (!isZoomed) {
                      setIsZoomed(true)
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedImageIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={productImages[selectedImageIndex].src}
                        alt={productImages[selectedImageIndex].alt}
                        width={400}
                        height={500}
                        className={`transition-all duration-300 ${
                          isZoomed 
                            ? 'max-w-[90vw] max-h-[90vh] object-contain cursor-zoom-out' 
                            : 'w-full h-full object-contain'
                        }`}
                        priority
                        onClick={(e) => {
                          if (isZoomed) {
                            e.stopPropagation()
                            setIsZoomed(false)
                          }
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                  {isZoomed && (
                    <motion.div 
                      className="absolute top-4 right-4 text-white/70 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Press ESC or click to close
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Thumbnail Gallery */}
              <motion.div 
                className="flex justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={productSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {productImages.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-accent shadow-lg' 
                        : 'border-white/30 hover:border-accent/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={productSectionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={64}
                      height={80}
                      className="w-full h-full object-contain p-1"
                    />
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Product Info */}
            <motion.div 
              className="space-y-4 bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              animate={productSectionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div>
                <h1 className="text-3xl font-medium text-text mb-1">
                  Eubiosis — Nature in a Bottle ©
                </h1>
                <p className="text-lg md:text-base text-text/70">
                  <span className="font-mono">{animatedSize}</span>ml | Honey-based probiotic with 42 bacterial strains
                </p>
              </div>

              {/* Size Selection */}
              <div className="space-y-3 bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="text-lg font-medium text-text">Choose Size</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSizeChange('50ml')}
                    className={`px-4 py-2 rounded-eubiosis border-2 transition-all text-sm ${
                      selectedSize === '50ml'
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border text-text hover:border-accent/50'
                    }`}
                  >
                    50ml
                  </button>
                  <button
                    onClick={() => handleSizeChange('100ml')}
                    className={`px-4 py-2 rounded-eubiosis border-2 transition-all text-sm ${
                      selectedSize === '100ml'
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border text-text hover:border-accent/50'
                    }`}
                  >
                    100ml
                  </button>
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="space-y-3 bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="text-lg font-medium text-text">Quantity</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-11 h-11 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4 text-text" />
                    </button>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/40 min-w-[60px] text-center">
                      <span className="text-xl font-bold text-text transition-all duration-300">{quantity}</span>
                    </div>
                    
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-11 h-11 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/80 transition-all"
                    >
                      <Plus className="w-4 h-4 text-text" />
                    </button>
                  </div>
                  
                  {/* Discount Badge */}
                  {getDiscountText() && (
                    <div className="bg-accent text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                      {getDiscountText()}
                    </div>
                  )}
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-text">Total:</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent transition-all duration-500">
                      R<span className="font-mono">{animatedPrice}</span>
                    </div>
                    {getDiscount(quantity) > 0 && (
                      <div className="text-xs text-text/60 line-through">
                        R{pricing[selectedSize].basePrice * quantity}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-2 flex flex-row justify-between items-center gap-2">
                <Link href="/funnel" className="pay-btn">
                  <span className="btn-text">Buy Now</span>
                  <div className="icon-container">
                    <svg viewBox="0 0 24 24" className="icon card-icon">
                      <path
                        d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18C2,19.11 2.89,20 4,20H20C21.11,20 22,19.11 22,18V6C22,4.89 21.11,4 20,4Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg viewBox="0 0 24 24" className="icon payment-icon">
                      <path
                        d="M2,17H22V21H2V17M6.25,7H9V6H6V3H18V6H15V7H17.75L19,17H5L6.25,7M9,10H15V8H9V10M9,13H15V11H9V13Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg viewBox="0 0 24 24" className="icon dollar-icon">
                      <path
                        d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg viewBox="0 0 24 24" className="icon wallet-icon default-icon">
                      <path
                        d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18M12,16H22V8H12M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg viewBox="0 0 24 24" className="icon check-icon">
                      <path
                        d="M9,16.17L4.83,12L3.41,13.41L9,19L21,7L19.59,5.59L9,16.17Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </Link>
                
                {/* Back Home Button */}
                <Link 
                  href="/"
                  className="btn-secondary flex items-center gap-2 text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back Home</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Tabs Section */}
      <motion.section 
        ref={tabsSectionRef}
        id="details" 
        className="py-12 px-4 bg-[#f9f9f9]/50 backdrop-blur-sm"
        initial={{ opacity: 0, y: 50 }}
        animate={tabsSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Tab Headers */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`px-4 py-2 font-medium transition-colors text-sm ${
                activeTab === 'ingredients'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-text hover:text-accent'
              }`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`px-4 py-2 font-medium transition-colors text-sm ${
                activeTab === 'usage'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-text hover:text-accent'
              }`}
            >
              How to Use
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-2 font-medium transition-colors text-sm ${
                activeTab === 'faq'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-text hover:text-accent'
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 font-medium transition-colors text-sm ${
                activeTab === 'reviews'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-text hover:text-accent'
              }`}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl p-6 min-h-[250px]">
            {activeTab === 'ingredients' && (
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-text">Full Ingredient List</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-base font-medium text-accent mb-1">Organic Honey Base</h4>
                    <p className="text-sm text-text/80">Raw, unprocessed honey from sustainable sources, providing natural enzymes and prebiotics.</p>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-accent mb-1">42 Probiotic Strains</h4>
                    <p className="text-sm text-text/80">Including Lactobacillus, Bifidobacterium, and other beneficial bacteria for comprehensive gut support.</p>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-accent mb-1">Fulvic Acid</h4>
                    <p className="text-sm text-text/80">Enhances nutrient absorption and cellular transport for maximum effectiveness.</p>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-accent mb-1">Humic Acid</h4>
                    <p className="text-sm text-text/80">Supports digestive health and natural detoxification processes.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-text">How to Use Eubiosis</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-base font-medium text-accent mb-1">Dosage</h4>
                    <p className="text-sm text-text/80">Take 1 teaspoon (5ml) daily, preferably in the morning on an empty stomach.</p>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-accent mb-1">Best Practices</h4>
                    <p className="text-sm text-text/80">Can be taken directly or mixed with water, tea, or smoothies. Avoid hot liquids above 40°C to preserve probiotic activity.</p>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-accent mb-1">Duration</h4>
                    <p className="text-sm text-text/80">For best results, use consistently for at least 30 days. Most users notice improvements within 7-14 days.</p>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-accent mb-1">Storage</h4>
                    <p className="text-sm text-text/80">Store in a cool, dry place away from direct sunlight. Refrigeration not required but recommended after opening.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-text">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-base font-medium text-accent mb-1">Is Eubiosis suitable for vegans?</h4>
                    <p className="text-sm text-text/80">Yes, despite being honey-based, our formula uses ethically sourced honey and all ingredients are 100% plant-based and vegan-friendly.</p>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-accent mb-1">Are there any side effects?</h4>
                    <p className="text-sm text-text/80">Eubiosis is generally well-tolerated. Some users may experience mild digestive changes in the first few days as gut flora adjusts.</p>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-accent mb-1">Can I take it with other supplements?</h4>
                    <p className="text-sm text-text/80">Yes, Eubiosis is compatible with most supplements. However, consult your healthcare provider if you're on medication.</p>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-accent mb-1">How long does one bottle last?</h4>
                    <p className="text-sm text-text/80">Each {selectedSize} bottle provides approximately {selectedSize === '50ml' ? '10' : '20'} days of daily use at the recommended dosage. With {quantity} bottle{quantity > 1 ? 's' : ''}, you'll have approximately {quantity * (selectedSize === '50ml' ? 10 : 20)} days of supply.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-text">Customer Reviews</h3>
                <div className="space-y-4">
                  <div className="border-b border-border pb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-secondary text-sm">★★★★★</span>
                      <span className="font-medium text-sm">Thandi M.</span>
                      <span className="text-text/50 text-xs">• Durban</span>
                    </div>
                    <p className="text-sm text-text/80">"My digestion improved in days — I feel lighter and more energetic. Highly recommend!"</p>
                  </div>
                  <div className="border-b border-border pb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-secondary text-sm">★★★★★</span>
                      <span className="font-medium text-sm">Lindiwe K.</span>
                      <span className="text-text/50 text-xs">• Cape Town</span>
                    </div>
                    <p className="text-sm text-text/80">"I finally feel balanced again. This stuff works. Worth every cent."</p>
                  </div>
                  <div className="pb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-secondary text-sm">★★★★★</span>
                      <span className="font-medium text-sm">Marius V.</span>
                      <span className="text-text/50 text-xs">• Johannesburg</span>
                    </div>
                    <p className="text-sm text-text/80">"Pure, natural, and effective — it's now part of my daily routine. Can't imagine my mornings without it."</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Trust Row */}
      <motion.section 
        ref={trustSectionRef}
        className="py-8 px-4 bg-white/70 backdrop-blur-sm border-t border-white/30"
        initial={{ opacity: 0, y: 30 }}
        animate={trustSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            initial={{ opacity: 0 }}
            animate={trustSectionInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-1">
              <div className="flex justify-center">
                <Droplet className="w-8 h-8 text-accent" />
              </div>
              <p className="font-medium text-text text-sm">100% Natural</p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-center">
                <FlaskConical className="w-8 h-8 text-accent" />
              </div>
              <p className="font-medium text-text text-sm">Lab Tested</p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-center">
                <MapPin className="w-8 h-8 text-accent" />
              </div>
              <p className="font-medium text-text text-sm">Made in SA</p>
            </div>
            <div className="space-y-1">
              <div className="flex justify-center">
                <Truck className="w-8 h-8 text-accent" />
              </div>
              <p className="font-medium text-text text-sm">Free Shipping</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

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

      {/* Product Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
        suppressHydrationWarning
      />
    </main>
  )
}
