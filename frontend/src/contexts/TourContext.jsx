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
    setIsTourActive(true);
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
