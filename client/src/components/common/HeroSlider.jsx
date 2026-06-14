import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

// Animated Counter Component
const AnimatedCounter = ({ value, suffix, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const duration = 1.8; // Duration of count-up in seconds
    const totalMiliseconds = duration * 1000;
    const intervalTime = 30; // 30ms step updates
    const totalSteps = Math.round(totalMiliseconds / intervalTime);
    const increment = end / totalSteps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(increment * currentStep));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
      <div className="text-xl md:text-2xl font-black text-white tracking-tight">
        <span>{count}</span>
        {suffix}
      </div>
      <div className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">
        {label}
      </div>
    </div>
  );
};

// Floating Product Card Component for high-fidelity 3D visualization
const FloatingProductCard = ({ slide, productX, productY, productRotateX, productRotateY }) => {
  return (
    <motion.div
      style={{
        x: productX,
        y: productY,
        rotateX: productRotateX,
        rotateY: productRotateY,
        transformStyle: "preserve-3d"
      }}
      animate={{
        y: [0, -12, 0]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="relative w-72 md:w-80 rounded-[2rem] p-6 backdrop-blur-2xl bg-white/10 dark:bg-black/30 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden group select-none cursor-pointer"
    >
      {/* Background radial gradient spotlight glow */}
      <div className={`absolute -inset-10 bg-gradient-to-tr ${slide.gradient} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700`} />
      
      {/* Card Glare effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Preserve 3D depth content container */}
      <div style={{ transform: "translateZ(60px)" }} className="relative z-10 flex flex-col gap-4">
        {/* Badging and info */}
        <div className="flex justify-between items-center">
          <span className={`text-[9px] font-extrabold px-3 py-1 rounded-full border ${slide.badgeColor} tracking-widest uppercase shadow-sm`}>
            {slide.discount}
          </span>
          <span className="text-[9px] text-white/50 font-black tracking-widest uppercase">
            {slide.productCategory}
          </span>
        </div>
        
        {/* Center Product Showcase */}
        <div className="h-44 w-full flex items-center justify-center relative">
          {/* Spotlight behind element */}
          <div className="absolute w-24 h-24 bg-white/10 rounded-full blur-xl scale-125 group-hover:scale-150 transition-all duration-700" />
          
          <img
            src={slide.productImage}
            alt={slide.productName}
            loading="lazy"
            className="max-h-full max-w-[85%] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.65)] transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500"
          />
        </div>
        
        {/* Titles & Product details */}
        <div>
          <h3 className="text-lg font-extrabold text-white leading-tight tracking-tight mb-1">
            {slide.productName}
          </h3>
          
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] font-bold text-white/60">
              {slide.stats.rating} ({slide.stats.products})
            </span>
          </div>
          
          {/* Pricing Row and CTA button */}
          <div className="flex items-center justify-between pt-3.5 border-t border-white/10 mt-1">
            <div>
              <span className="text-xl font-black text-white">{slide.productPrice}</span>
              <span className="text-xs font-semibold text-white/40 line-through ml-2">{slide.productOldPrice}</span>
            </div>
            
            <Link
              to={slide.ctaLink}
              className="bg-white hover:bg-slate-100 text-slate-950 p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center shadow-lg"
              aria-label={`Buy ${slide.productName}`}
            >
              <svg className="w-4 h-4 stroke-current fill-none stroke-[3]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Cinematic Hero Carousel Slider Component
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  // High-converting slide content details
  const slides = [
    {
      id: 1,
      title: "Elevate Your Summer Style",
      subtitle: "The Summer Collection",
      description: "Discover designer sunglasses, lightweight apparel, and coastal accessories. Designed for comfort, styled for impact.",
      discount: "UP TO 50% OFF",
      ctaText: "Shop the Collection",
      ctaLink: "/products",
      gradient: "from-amber-600 via-orange-600 to-rose-600",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80",
      productName: "AeroShade Pro",
      productCategory: "Premium Eyewear",
      productPrice: "$149.00",
      productOldPrice: "$298.00",
      productImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
      badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      stats: { products: "15K+", rating: "4.9", badge: "Fast Shipping" }
    },
    {
      id: 2,
      title: "Next-Gen Sound & Acoustics",
      subtitle: "Audio Engineering Week",
      description: "Immerse yourself in precision sound. Studio-grade active noise cancelling headphones, wireless earbuds, and spatial smart speakers.",
      discount: "SAVE $150 TODAY",
      ctaText: "Explore Sound",
      ctaLink: "/products",
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600&q=80",
      productName: "Quantum Beats Studio",
      productCategory: "Spatial Audio",
      productPrice: "$299.00",
      productOldPrice: "$449.00",
      productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
      stats: { products: "8.5K+", rating: "4.8", badge: "2-Year Warranty" }
    },
    {
      id: 3,
      title: "Step Into High-Performance",
      subtitle: "Running & Athletic Wear",
      description: "Engineered with responsive knit mesh, carbon-fiber energy return plates, and ultimate grip. Made for breaking personal records.",
      discount: "40% CLEARANCE",
      ctaText: "Get Moving",
      ctaLink: "/products",
      gradient: "from-rose-600 via-pink-600 to-red-600",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
      productName: "Veloce Carbon Knit",
      productCategory: "Elite Footwear",
      productPrice: "$180.00",
      productOldPrice: "$300.00",
      productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
      badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/20",
      stats: { products: "20K+", rating: "4.95", badge: "Free Returns" }
    },
    {
      id: 4,
      title: "Reimagine Your Living Space",
      subtitle: "Contemporary Minimalist Design",
      description: "Upgrade your environment with smart ambient lighting, custom ergonomic seating, and hand-finished Scandinavian oak tables.",
      discount: "MEMBER SPECIAL - 25% OFF",
      ctaText: "Shop Living",
      ctaLink: "/products",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80",
      productName: "AuraGlow Smart Sphere",
      productCategory: "Home Lighting",
      productPrice: "$89.00",
      productOldPrice: "$120.00",
      productImage: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80",
      badgeColor: "bg-teal-500/10 text-teal-300 border-teal-500/20",
      stats: { products: "12K+", rating: "4.7", badge: "Express Delivery" }
    },
    {
      id: 5,
      title: "Knowledge Without Limits",
      subtitle: "Bestseller Library",
      description: "Dive into award-winning biographies, design monographs, and tech publications. Expand your perspective one page at a time.",
      discount: "BUY 2 GET 1 FREE",
      ctaText: "Browse Library",
      ctaLink: "/products",
      gradient: "from-amber-500 via-yellow-600 to-orange-600",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1600&q=80",
      productName: "Limitless Mind",
      productCategory: "Non-Fiction",
      productPrice: "$24.99",
      productOldPrice: "$39.99",
      productImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
      badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      stats: { products: "40K+", rating: "4.85", badge: "Same-Day Courier" }
    }
  ];

  // Starts the 5-second slide auto-rotation
  const startTimer = () => {
    stopTimer();
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  // Stops active timers
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isAutoPlaying) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    if (isAutoPlaying) startTimer();
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    if (isAutoPlaying) startTimer();
  };

  const handleGoTo = (index) => {
    setCurrentSlide(index);
    if (isAutoPlaying) startTimer();
  };

  // Parallax configuration setup using Direct Framer Motion values to optimize performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Background shifts opposite to mouse movements
  const bgX = useTransform(springX, [-1, 1], [25, -25]);
  const bgY = useTransform(springY, [-1, 1], [25, -25]);

  // Foreground card overlay tilting and translation
  const cardX = useTransform(springX, [-1, 1], [8, -8]);
  const cardY = useTransform(springY, [-1, 1], [8, -8]);
  const cardRotateX = useTransform(springY, [-1, 1], [-4, 4]);
  const cardRotateY = useTransform(springX, [-1, 1], [4, -4]);

  // Floating product card moves more aggressively to trigger strong depth perception
  const productX = useTransform(springX, [-1, 1], [25, -25]);
  const productY = useTransform(springY, [-1, 1], [25, -25]);
  const productRotateX = useTransform(springY, [-1, 1], [-10, 10]);
  const productRotateY = useTransform(springX, [-1, 1], [10, -10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
    setIsAutoPlaying(false); // Pause timer during mouse interactions
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsAutoPlaying(true); // Resume autoplay
  };

  // Content enter animations (Stagger system)
  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const slideVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.4 } }
  };

  // Trust Badges with matching styling
  const trustBadges = [
    {
      text: "Fast Delivery",
      icon: (
        <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    {
      text: "Secure Payments",
      icon: (
        <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    {
      text: "Easy Returns",
      icon: (
        <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )
    }
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[650px] md:h-[700px] overflow-hidden bg-slate-950 flex items-center justify-center select-none"
      style={{ perspective: "1000px" }}
    >
      {/* Background Imagery Layer - Lazy Loaded & Faded */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slides[currentSlide].image}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover object-center opacity-30 select-none pointer-events-none"
            />
            {/* Soft dark overlay that reduces visual layout shifts */}
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Background Glow Blobs */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -60, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-tr from-orange-500/20 to-rose-500/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.92, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-500/15 to-indigo-500/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-gradient-to-tr ${slides[currentSlide].gradient} opacity-15 blur-3xl`}
        />
      </motion.div>

      {/* Foreground content grid layout */}
      <div className="container mx-auto px-4 md:px-8 z-10 w-full h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Left Column: Glassmorphic Overlay Content Card */}
          <div className="lg:col-span-7 w-full flex flex-col justify-center transform-gpu">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  x: cardX,
                  y: cardY,
                  rotateX: cardRotateX,
                  rotateY: cardRotateY,
                  transformStyle: "preserve-3d"
                }}
                className="backdrop-blur-xl bg-white/10 dark:bg-black/35 border border-white/20 rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative w-full overflow-hidden"
              >
                {/* Visual Glass glare lines */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />

                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  style={{ transform: "translateZ(30px)" }}
                  className="relative z-10 flex flex-col gap-4"
                >
                  {/* Category Discount Badge */}
                  <motion.div variants={fadeInUpVariants} className="flex items-center">
                    <span className={`text-[10px] font-black px-4 py-1.5 rounded-full border ${slides[currentSlide].badgeColor} tracking-widest uppercase shadow-inner`}>
                      {slides[currentSlide].discount}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1 
                    variants={fadeInUpVariants}
                    className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none"
                  >
                    {slides[currentSlide].title}
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.h2 
                    variants={fadeInUpVariants}
                    className="text-lg md:text-xl font-bold bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.h2>

                  {/* Description */}
                  <motion.p 
                    variants={fadeInUpVariants}
                    className="text-sm md:text-base text-slate-200 leading-relaxed max-w-xl opacity-90"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  {/* Action buttons */}
                  <motion.div 
                    variants={fadeInUpVariants}
                    className="flex flex-wrap gap-4 mt-2"
                  >
                    {/* Primary Call-to-Action */}
                    <Link
                      to={slides[currentSlide].ctaLink}
                      className="group/btn relative px-7 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-300 transform-gpu hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      <span>{slides[currentSlide].ctaText}</span>
                      <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>

                    {/* Secondary Call-to-Action */}
                    <Link
                      to="/products"
                      className="relative px-7 py-3 rounded-xl font-bold text-sm border border-white/20 text-white hover:bg-white hover:text-slate-950 transition-all duration-300 transform-gpu active:scale-95 overflow-hidden"
                    >
                      <span className="relative z-10">Browse Offers</span>
                    </Link>
                  </motion.div>

                  {/* Trust Badges */}
                  <motion.div 
                    variants={staggerContainer}
                    className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 pt-6 border-t border-white/10"
                  >
                    {trustBadges.map((badge, idx) => (
                      <motion.div
                        key={idx}
                        variants={fadeInUpVariants}
                        className="flex items-center gap-1.5 text-xs text-slate-300 font-bold bg-white/5 border border-white/5 px-3.5 py-1.5 rounded-full"
                      >
                        {badge.icon}
                        <span>{badge.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Trust Counters */}
                  <motion.div 
                    variants={staggerContainer}
                    className="grid grid-cols-3 gap-2 border-t border-white/10 pt-5 mt-2"
                  >
                    <AnimatedCounter value={50} suffix="K+" label="Products" />
                    <AnimatedCounter value={10} suffix="K+" label="Reviews" />
                    <AnimatedCounter value={24} suffix="/7" label="Support" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Floating 3D Product Card Visualizer */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center relative transform-gpu">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.85, y: 50, rotateZ: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateZ: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -50, rotateZ: -5 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <FloatingProductCard
                  slide={slides[currentSlide]}
                  productX={productX}
                  productY={productY}
                  productRotateX={productRotateX}
                  productRotateY={productRotateY}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows (Glassmorphic layout overlay) */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
        <button
          onClick={handlePrev}
          className="pointer-events-auto backdrop-blur-md bg-white/5 hover:bg-white/15 border border-white/10 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="pointer-events-auto backdrop-blur-md bg-white/5 hover:bg-white/15 border border-white/10 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Visual Slide Dash Indicators with filling dynamic progress bars */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleGoTo(index)}
            className="group relative py-2 px-1 focus:outline-none"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="h-1.5 rounded-full bg-white/20 transition-all duration-300 relative overflow-hidden w-8 group-hover:bg-white/40">
              {index === currentSlide ? (
                <motion.div
                  key={currentSlide}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: isAutoPlaying ? 5 : 0, ease: "linear" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                />
              ) : null}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
