"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Sparkles } from "lucide-react";

interface TourStep {
  title: string;
  description: string;
  target?: string;
  position: "top" | "bottom" | "left" | "right" | "center";
}

const tourSteps: TourStep[] = [
  {
    title: "Welcome to DesignHour! ✨",
    description: "Discover the best design tools, animation libraries, and UI components all in one place. Let's take a quick tour!",
    position: "center",
  },
  {
    title: "Search & Filter",
    description: "Use the search bar to find tools quickly. Recent searches and smart suggestions help you discover more!",
    target: "input[type='text']",
    position: "bottom",
  },
  {
    title: "Category Filters",
    description: "Browse by category or use the pricing filter to find free or paid tools. Active filters show as chips below.",
    position: "center",
  },
  {
    title: "Favorite Tools",
    description: "Click the heart icon to save your favorite tools. Access them anytime by clicking the Favorites filter!",
    position: "center",
  },
  {
    title: "View & Sort Options",
    description: "Switch between grid layouts and sort tools by newest, A-Z, or popularity. Find what works best for you!",
    position: "center",
  },
  {
    title: "Keyboard Shortcuts",
    description: "Press '/' to search, 'Esc' to clear filters, or '?' to see all shortcuts. Work faster with your keyboard!",
    position: "center",
  },
];

export default function OnboardingTour() {
  const [showTour, setShowTour] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("onboardingTourSeen");
    if (!hasSeenTour) {
      setTimeout(() => setShowTour(true), 1500);
    }
  }, []);

  useEffect(() => {
    if (showTour && tourSteps[currentStep].target) {
      const element = document.querySelector(tourSteps[currentStep].target!);
      if (element) {
        const rect = element.getBoundingClientRect();
        setSpotlightPosition({
          x: rect.left - 10,
          y: rect.top - 10,
          width: rect.width + 20,
          height: rect.height + 20,
        });
      }
    }
  }, [currentStep, showTour]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  const handleClose = () => {
    setShowTour(false);
    localStorage.setItem("onboardingTourSeen", "true");
  };

  const step = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <AnimatePresence>
      {showTour && (
        <>
          {/* Dark overlay with spotlight */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
              zIndex: 300,
              pointerEvents: "auto",
            }}
            onClick={handleSkip}
          />

          {/* Spotlight effect */}
          {step.target && (
            <motion.div
              animate={{
                x: spotlightPosition.x,
                y: spotlightPosition.y,
                width: spotlightPosition.width,
                height: spotlightPosition.height,
              }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              style={{
                position: "fixed",
                borderRadius: 12,
                boxShadow: "0 0 0 9999px rgba(0,0,0,0.75), 0 0 40px rgba(249,115,22,0.5)",
                pointerEvents: "none",
                zIndex: 301,
              }}
            />
          )}

          {/* Tour card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: 500,
              width: "calc(100% - 32px)",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "white",
              borderRadius: 20,
              padding: 24,
              boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
              zIndex: 302,
            }}
            className="dark:bg-[#0f1923] md:w-[90%] md:p-8"
          >
            {/* Skip button */}
            <button
              onClick={handleSkip}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.05)",
                border: "none",
                cursor: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              className="dark:bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-[rgba(255,255,255,0.1)]"
            >
              <X size={16} className="text-gray-600 dark:text-gray-400" />
            </button>

            {/* Icon */}
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
              className="md:w-14 md:h-14 md:mb-5"
            >
              <Sparkles size={24} color="white" className="md:w-7 md:h-7" />
            </motion.div>

            {/* Content */}
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }} className="text-gray-900 dark:text-white md:text-xl md:mb-3">
              {step.title}
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 20 }} className="text-gray-600 dark:text-gray-400 md:text-base md:leading-relaxed md:mb-6">
              {step.description}
            </p>

            {/* Progress dots */}
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }} className="md:gap-8 md:mb-5">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    height: 3,
                    borderRadius: 2,
                    background: index <= currentStep ? "#f97316" : "rgba(0,0,0,0.1)",
                    transition: "all 0.3s",
                  }}
                  className={`md:h-1 ${index > currentStep ? "dark:bg-[rgba(255,255,255,0.1)]" : ""}`}
                />
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 8, flexDirection: "column" }} className="sm:flex-row sm:gap-12">
              <button
                onClick={handleSkip}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  background: "rgba(0,0,0,0.05)",
                  border: "none",
                  cursor: "none",
                  transition: "all 0.2s",
                }}
                className="text-gray-700 dark:text-gray-300 dark:bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(0,0,0,0.08)] dark:hover:bg-[rgba(255,255,255,0.08)] md:text-sm md:py-3"
              >
                Skip Tour
              </button>
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  color: "white",
                  border: "none",
                  cursor: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  boxShadow: "0 4px 12px rgba(249,115,22,0.3)",
                }}
                className="md:text-sm md:py-3"
              >
                {currentStep < tourSteps.length - 1 ? "Next" : "Get Started"}
                <ChevronRight size={16} />
              </motion.button>
            </div>

            {/* Step counter */}
            <div style={{ textAlign: "center", marginTop: 12 }} className="md:mt-4">
              <span style={{ fontSize: 11, fontWeight: 600 }} className="text-gray-500 dark:text-gray-400 md:text-xs">
                {currentStep + 1} of {tourSteps.length}
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
