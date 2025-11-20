import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Interactive Demo - Uses REAL CreateCheckInPage instead of fake UI
 * Navigates user to actual check-in page in demo mode
 */
const InteractiveDemo = ({ onNext }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Small delay for transition, then navigate to real check-in page in demo mode
    const timer = setTimeout(() => {
      navigate('/create?demo=true&onboarding=true');
    }, 800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="interactive-demo-loader">
      <div className="loader-content">
        <h2 className="loader-title animate-pulse">
          Loading Your Real Check-In Page... 🎮
        </h2>
        <p className="loader-subtitle">
          You're about to see the ACTUAL interface you'll use!
        </p>

        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      </div>

      <style jsx>{`
        .interactive-demo-loader {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .loader-content {
          text-align: center;
        }

        .loader-title {
          font-family: 'Fredoka One', cursive;
          font-size: 32px;
          color: #FF1493;
          margin-bottom: 10px;
        }

        .loader-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: 18px;
          color: #9370DB;
          margin-bottom: 40px;
        }

        .spinner-container {
          display: flex;
          justify-content: center;
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 6px solid #f3f3f3;
          border-top: 6px solid #FF69B4;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default InteractiveDemo;
