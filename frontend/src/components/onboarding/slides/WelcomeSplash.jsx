import React, { useEffect, useRef } from 'react';
import { AnimatedHeart } from '../SVGGraphics';
import { textAnimations } from '../../../utils/magicalAnimations';

const WelcomeSplash = ({ onNext, particleSystem, isActive }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    if (isActive && titleRef.current && subtitleRef.current) {
      // Typewriter effect for title
      setTimeout(() => {
        textAnimations.typewriter(titleRef.current, 'Welcome to Besties! 💕', 80);
      }, 500);

      // Fade in subtitle
      setTimeout(() => {
        subtitleRef.current.style.opacity = '1';
      }, 3000);

      // Create heart particles
      if (particleSystem) {
        const interval = setInterval(() => {
          const x = Math.random() * window.innerWidth;
          particleSystem.burst(x, window.innerHeight, 3, 'heart');
          particleSystem.start();
        }, 300);

        return () => clearInterval(interval);
      }
    }
  }, [isActive, particleSystem]);

  const handleContinue = (e) => {
    const button = e.currentTarget;

    // Heart burst from button
    if (particleSystem) {
      const rect = button.getBoundingClientRect();
      particleSystem.burst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        40,
        'heart'
      );
      particleSystem.start();
    }

    setTimeout(() => {
      onNext(button, 'slide');
    }, 300);
  };

  return (
    <div className="welcome-splash">
      {/* Floating Hearts Background */}
      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              fontSize: `${20 + Math.random() * 30}px`,
              opacity: 0.1 + Math.random() * 0.2
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="welcome-content animate-scale-up">
        {/* Large Animated Heart */}
        <div className="hero-heart-container">
          <AnimatedHeart size={120} className="hero-heart" animate={true} />
          <div className="heart-glow" />
        </div>

        {/* Title with Typewriter */}
        <h1
          ref={titleRef}
          className="welcome-title"
          style={{ minHeight: '60px' }}
        >
          {/* Text will be filled by typewriter */}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="welcome-subtitle"
          style={{ opacity: 0, transition: 'opacity 1s' }}
        >
          Your besties have your back
        </p>

        {/* Feature Pills */}
        <div className="feature-pills">
          {[
            { icon: '🛡️', text: 'Stay Safe', delay: '0.5s' },
            { icon: '💝', text: 'Feel Supported', delay: '0.7s' },
            { icon: '⚡', text: 'Super Easy', delay: '0.9s' }
          ].map((feature, i) => (
            <div
              key={i}
              className="feature-pill animate-slide-up"
              style={{ animationDelay: feature.delay }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <span className="feature-text">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <button
          className="btn-continue flying-element"
          onClick={handleContinue}
        >
          Let's Begin! ✨
          <span className="btn-shine" />
        </button>

        {/* Swipe Hint */}
        <div className="swipe-hint animate-bounce">
          <span>👇</span>
          <p>Tap to continue</p>
        </div>
      </div>

      <style jsx>{`
        .welcome-splash {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .floating-hearts {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .floating-heart {
          position: absolute;
          bottom: -50px;
          animation: float-up linear infinite;
        }

        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .welcome-content {
          text-align: center;
          max-width: 600px;
          padding: 40px;
          z-index: 1;
        }

        .hero-heart-container {
          position: relative;
          display: inline-block;
          margin-bottom: 30px;
        }

        .hero-heart {
          animation: pulse 2s ease-in-out infinite;
        }

        .heart-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(255,105,180,0.4) 0%, transparent 70%);
          animation: glow 2s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        .welcome-title {
          font-family: 'Fredoka One', cursive;
          font-size: 48px;
          color: #FF1493;
          margin-bottom: 15px;
          text-shadow: 2px 2px 0 rgba(147, 112, 219, 0.3);
          line-height: 1.2;
        }

        .welcome-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: 24px;
          color: #9370DB;
          margin-bottom: 40px;
          font-weight: 500;
        }

        .feature-pills {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .feature-pill {
          background: white;
          padding: 12px 24px;
          border-radius: 30px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.2);
          transition: all 300ms;
        }

        .feature-pill:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
        }

        .feature-icon {
          font-size: 20px;
        }

        .feature-text {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .btn-continue {
          background: linear-gradient(135deg, #9370DB 0%, #FF69B4 100%);
          color: white;
          border: none;
          padding: 18px 50px;
          border-radius: 50px;
          font-size: 20px;
          font-weight: bold;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
          transition: all 300ms;
          position: relative;
          overflow: hidden;
        }

        .btn-continue:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 12px 35px rgba(255, 105, 180, 0.5);
        }

        .btn-continue:active {
          transform: translateY(-1px) scale(1.02);
        }

        .btn-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        .swipe-hint {
          margin-top: 40px;
          color: #9370DB;
          font-family: 'Quicksand', sans-serif;
          opacity: 0.6;
        }

        .swipe-hint span {
          font-size: 30px;
          display: block;
          margin-bottom: 5px;
        }

        .swipe-hint p {
          font-size: 14px;
          margin: 0;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomeSplash;
