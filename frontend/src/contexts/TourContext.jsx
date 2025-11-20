import React, { createContext, useContext, useState, useEffect } from 'react';

const TourContext = createContext();

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

export const TourProvider = ({ children }) => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourCompleted, setTourCompleted] = useState(false);

  // Check if user has completed tour
  useEffect(() => {
    const completed = localStorage.getItem('tour_completed');
    if (completed === 'true') {
      setTourCompleted(true);
    }
  }, []);

  const startTour = () => {
    console.log('🎬 Tour requested to start, checking if page is ready...');

    // Wait for the first tour element to be available before starting
    const firstElement = '[data-tour="header-logo"]';
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max (50 * 100ms)

    const checkAndStart = () => {
      const element = document.querySelector(firstElement);

      if (element) {
        console.log('✅ First tour element found, starting tour!');
        setIsTourActive(true);
      } else if (attempts < maxAttempts) {
        attempts++;
        console.log(`⏳ Waiting for page to be ready... (attempt ${attempts}/${maxAttempts})`);
        setTimeout(checkAndStart, 100);
      } else {
        console.error('❌ Tour could not start: first element not found after 5 seconds');
        // Start anyway to show the user something
        setIsTourActive(true);
      }
    };

    checkAndStart();
  };

  const completeTour = () => {
    setIsTourActive(false);
    setTourCompleted(true);
    localStorage.setItem('tour_completed', 'true');
    localStorage.setItem('onboarding_completed', 'true'); // Also mark onboarding complete
  };

  const skipTour = () => {
    setIsTourActive(false);
    setTourCompleted(true);
    localStorage.setItem('tour_completed', 'true');
    localStorage.setItem('onboarding_skipped', 'true');
  };

  const resetTour = () => {
    setIsTourActive(false);
    setTourCompleted(false);
    localStorage.removeItem('tour_completed');
    localStorage.removeItem('onboarding_completed');
    localStorage.removeItem('onboarding_skipped');
  };

  return (
    <TourContext.Provider
      value={{
        isTourActive,
        tourCompleted,
        startTour,
        completeTour,
        skipTour,
        resetTour
      }}
    >
      {children}
    </TourContext.Provider>
  );
};
