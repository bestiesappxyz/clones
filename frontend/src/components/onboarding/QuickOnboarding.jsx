import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useTour } from '../../contexts/TourContext';

/**
 * Quick Onboarding - Skips all slides, goes straight to interactive tour
 * This replaces the complex slide-based onboarding with immediate access to the real app
 */
const QuickOnboarding = () => {
  const navigate = useNavigate();
  const { startTour, resetTour } = useTour();
  const hasRun = useRef(false);

  // Safe auth access - handles cases where Firebase isn't configured
  let currentUser = null;
  try {
    const auth = useAuth();
    currentUser = auth?.currentUser;
  } catch (error) {
    console.log('Running in demo mode - Firebase not configured');
  }

  useEffect(() => {
    // Prevent running multiple times
    if (hasRun.current) return;
    hasRun.current = true;

    const completeOnboarding = async () => {
      try {
        // Mark onboarding as complete in Firebase (skip in demo mode)
        if (currentUser && db) {
          const userRef = doc(db, 'users', currentUser.uid);
          await updateDoc(userRef, {
            onboardingCompleted: true,
            onboardingCompletedAt: new Date()
          });
          console.log('✅ Onboarding marked as complete');
        } else {
          console.log('🎮 Demo mode - skipping Firebase update');
          // Store in localStorage for demo mode
          localStorage.setItem('demo_onboarding_completed', 'true');
        }

        // Navigate to home and start the interactive tour
        resetTour();
        navigate('/');

        // Start tour after a short delay to let home page load
        setTimeout(() => {
          startTour();
          console.log('🎯 Interactive tour started - showing REAL app!');
        }, 800);
      } catch (error) {
        console.error('Error completing onboarding:', error);
        // Still navigate to home even if there's an error
        navigate('/');
      }
    };

    completeOnboarding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  return (
    <div className="quick-onboarding">
      <div className="loading-content">
        <div className="loader">
          <div className="spinner"></div>
        </div>
        <h2 className="loading-title">Welcome to Besties! 💕</h2>
        <p className="loading-subtitle">
          Loading your interactive tour...
        </p>
        <p className="loading-hint">
          We'll show you around the REAL app in just a moment!
        </p>
      </div>

      <style jsx>{`
        .quick-onboarding {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #FFF5F7 0%, #FFE8F0 50%, #F0E6FF 100%);
        }

        .loading-content {
          text-align: center;
          padding: 20px;
          max-width: 500px;
        }

        .loader {
          margin-bottom: 30px;
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 6px solid rgba(255, 105, 180, 0.2);
          border-top-color: #FF69B4;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-title {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(28px, 6vw, 42px);
          color: #FF1493;
          margin-bottom: 12px;
          text-shadow: 2px 2px 0 rgba(147, 112, 219, 0.2);
        }

        .loading-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(16px, 4vw, 20px);
          color: #9370DB;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .loading-hint {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(14px, 3.5vw, 16px);
          color: #666;
          opacity: 0.8;
        }

        @media (prefers-reduced-motion: reduce) {
          .spinner {
            animation: none;
            border-top-color: #9370DB;
          }
        }
      `}</style>
    </div>
  );
};

export default QuickOnboarding;
