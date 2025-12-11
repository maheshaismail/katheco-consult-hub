import { useState, useEffect, useCallback } from "react";

import heroSlide1 from "@/assets/hero-slide-1.png";
import heroSlide2 from "@/assets/hero-slide-2.png";
import heroSlide3 from "@/assets/hero-slide-3.png";
import heroSlide4 from "@/assets/hero-slide-4.png";
import heroSlide5 from "@/assets/hero-slide-5.png";
import heroSlide6 from "@/assets/hero-slide-6.png";
import heroSlide7 from "@/assets/hero-slide-7.png";
import heroSlide8 from "@/assets/hero-slide-8.png";

const slides = [
  heroSlide1,
  heroSlide2,
  heroSlide3,
  heroSlide4,
  heroSlide5,
  heroSlide6,
  heroSlide7,
  heroSlide8,
];

interface HeroCarouselProps {
  children: React.ReactNode;
  className?: string;
  interval?: number;
}

export const HeroCarousel = ({ children, className = "", interval = 5000 }: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [nextSlide, interval]);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Background Slides */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        const isPrev = index === (currentSlide - 1 + slides.length) % slides.length;
        
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              isActive 
                ? "opacity-100 scale-100 translate-x-0" 
                : isPrev 
                  ? "opacity-0 scale-110 -translate-x-full" 
                  : "opacity-0 scale-105 translate-x-full"
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[8000ms] ease-linear ${
                isActive ? "scale-105" : "scale-100"
              }`}
              style={{ backgroundImage: `url(${slide})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-black/40" />
          </div>
        );
      })}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary-foreground w-6"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
