import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { SliderImage } from "@shared/schema";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: sliderImages = [], isLoading } = useQuery({
    queryKey: ["/api/slider-images"],
  });

  useEffect(() => {
    if (sliderImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  if (isLoading) {
    return (
      <section className="hero-slider bg-muted animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground max-w-4xl px-4">
            <div className="h-12 bg-muted-foreground/20 rounded mb-6"></div>
            <div className="h-6 bg-muted-foreground/20 rounded mb-8"></div>
            <div className="h-12 w-48 bg-muted-foreground/20 rounded mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (sliderImages.length === 0) {
    return (
      <section className="hero-slider bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground max-w-4xl px-4">
            <h2 className="text-5xl font-bold mb-6">Welcome to Abaan Travel</h2>
            <p className="text-xl mb-8">Your trusted partner for Hajj and Umrah journeys</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-slider">
      {sliderImages.map((slide: SliderImage, index: number) => (
        <div
          key={slide.id}
          className={`slider-item ${index === currentSlide ? "active" : ""}`}
          style={{
            background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${slide.imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          data-testid={`slider-item-${index}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h2 className="text-5xl font-bold mb-6" data-testid={`slider-title-${index}`}>
                {slide.title}
              </h2>
              <p className="text-xl mb-8" data-testid={`slider-subtitle-${index}`}>
                {slide.subtitle}
              </p>
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 text-lg font-semibold"
                data-testid={`slider-button-${index}`}
              >
                {slide.buttonText}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Slider Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
            data-testid={`slider-dot-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
