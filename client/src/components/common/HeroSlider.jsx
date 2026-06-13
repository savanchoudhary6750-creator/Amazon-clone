import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Hero Slider Component
 * Displays promotional slides with offers and discounts
 */
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Summer Sale",
      subtitle: "Up to 50% Off",
      description: "Shop the hottest deals of the season on electronics, fashion, and more!",
      discount: "50%",
      ctaText: "Shop Now",
      ctaLink: "/products",
      bgColor: "from-orange-500 to-red-600",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop"
    },
    {
      id: 2,
      title: "Electronics Week",
      subtitle: "Special Offers",
      description: "Get amazing discounts on smartphones, laptops, headphones and more tech gadgets.",
      discount: "30%",
      ctaText: "Explore Tech",
      ctaLink: "/products?category=electronics",
      bgColor: "from-blue-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop"
    },
    {
      id: 3,
      title: "Fashion Fiesta",
      subtitle: "New Arrivals",
      description: "Discover the latest trends in clothing, shoes, and accessories at unbeatable prices.",
      discount: "40%",
      ctaText: "Shop Fashion",
      ctaLink: "/products?category=clothing",
      bgColor: "from-pink-500 to-rose-600",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop"
    },
    {
      id: 4,
      title: "Home & Living",
      subtitle: "Clearance Sale",
      description: "Transform your home with our exclusive collection of furniture and decor items.",
      discount: "25%",
      ctaText: "Shop Home",
      ctaLink: "/products?category=home",
      bgColor: "from-green-500 to-teal-600",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop"
    },
    {
      id: 5,
      title: "Book Bonanza",
      subtitle: "Read More, Save More",
      description: "Expand your library with our vast collection of books at incredible prices.",
      discount: "35%",
      ctaText: "Browse Books",
      ctaLink: "/products?category=books",
      bgColor: "from-yellow-500 to-orange-600",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=600&fit=crop"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <div 
      className="relative w-full h-[500px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-80`} />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  {/* Discount Badge */}
                  <div className="inline-block bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-lg mb-4">
                    {slide.discount} OFF
                  </div>

                  {/* Title */}
                  <h1 className="text-5xl md:text-6xl font-bold mb-2">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                    {slide.subtitle}
                  </h2>

                  {/* Description */}
                  <p className="text-lg mb-6 opacity-90">
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <Link
                    to={slide.ctaLink}
                    className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    {slide.ctaText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all hover:scale-110 z-20"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-lg transition-all hover:scale-110 z-20"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
