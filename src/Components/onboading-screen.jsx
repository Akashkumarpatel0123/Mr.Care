"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OnboardingScreen({
  onGetStarted,
  isFullscreen = false,
  images = [
    "/image4.jpg",
    "/image11.jpg"
  ],
  headings = [
    "Premium Healthcare At Your Doorstep",
    "Expert Medical Professionals On Demand"
  ],
  descriptions = [
    "Experience seamless medical care with Mr.care professional in-home services.",
    "Our certified nurses provide compassionate care in the comfort of your home."
  ]
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const handleGetStarted = () => {
    onGetStarted?.();
    navigate("/home"); // ✅ Navigates to /home
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 p-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full overflow-hidden bg-white"
      >
        {/* Hero Image Section */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-[70vh] w-full"
        >
          <div className="absolute inset-0">
            <img
              src={images[activeIndex]}
              alt={`Slide ${activeIndex + 1}`}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#8D2E7D]/90 to-[#8D2E7D]/20" />

          {/* Pagination dots */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-5 bg-white"
                    : "bg-white/60 hover:bg-white/80"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#8D2E7D] px-6 py-4 text-white h-[30vh]">
          <motion.div
            key={`content-${activeIndex}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 text-center"
          >
            <h2 className="mb-2 text-xl font-bold leading-tight md:text-2xl">
              {headings[activeIndex]}
            </h2>
            <p className="mx-auto text-sm leading-relaxed text-white/90 md:text-base md:max-w-lg">
              {descriptions[activeIndex]}
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-6 left-0 right-0 px-3"
          >
            <button
              onClick={handleGetStarted}
              className="w-full py-3 font-medium text-white bg-white rounded-xl shadow-lg transform transition-all hover:scale-[1.02] active:scale-95"
            >
              <span className="bg-gradient-to-r from-[#8D2E7D] to-[#6B1D5E] bg-clip-text text-transparent">
                Begin Your Care Journey
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
