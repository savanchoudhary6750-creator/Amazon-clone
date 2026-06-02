import { useEffect, useState } from "react";
import "./Hero.css";

function Hero() {

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      title: "Mega Electronics Sale",
      offer: "Up To 50% OFF",
    },

    {
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      title: "Headphones Festival",
      offer: "Starting From ₹999",
    },

    {
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
      title: "Fashion Week Deals",
      offer: "Flat 50% OFF",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto Slider
  useEffect(() => {

    const slider = setInterval(() => {

      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );

    }, 3000);

    return () => clearInterval(slider);

  }, []);

  return (

    <div
      className="hero"
      style={{
        backgroundImage: `url(${slides[currentSlide].image})`,
      }}
    >

      {/* Overlay */}
      <div className="heroOverlay">

        <h1>{slides[currentSlide].title}</h1>

        <h2>{slides[currentSlide].offer}</h2>

        <button>Shop Now</button>

      </div>

      {/* Previous Button */}
      <button
        className="prevBtn"
        onClick={() =>
          setCurrentSlide(
            currentSlide === 0
              ? slides.length - 1
              : currentSlide - 1
          )
        }
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        className="nextBtn"
        onClick={() =>
          setCurrentSlide(
            currentSlide === slides.length - 1
              ? 0
              : currentSlide + 1
          )
        }
      >
        ❯
      </button>

    </div>
  );
}

export default Hero;