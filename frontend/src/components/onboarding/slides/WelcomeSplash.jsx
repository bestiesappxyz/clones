import React, { useEffect, useRef, useState } from 'react';
import { AnimatedHeart } from '../SVGGraphics';
import { textAnimations } from '../../../utils/magicalAnimations';

const WelcomeSplash = ({ onNext, particleSystem, isActive }) => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const messageRef = useRef(null);
  const [heartClickCount, setHeartClickCount] = useState(0);

  useEffect(() => {
    if (isActive && titleRef.current && subtitleRef.current && messageRef.current) {
      // Typewriter effect for title
      const titleTimer = setTimeout(() => {
        if (titleRef.current) {
          textAnimations.typewriter(titleRef.current, 'Hey bestie! 💕', 80);
        }
      }, 500);

      // Fade in subtitle
      const subtitleTimer = setTimeout(() => {
        if (subtitleRef.current) {
          subtitleRef.current.style.opacity = '1';
        }
      }, 2500);

      // Fade in message
      const messageTimer = setTimeout(() => {
        if (messageRef.current) {
          messageRef.current.style.opacity = '1';
        }
      }, 4000);

      // Create heart particles
      let heartInterval;
      if (particleSystem) {
        heartInterval = setInterval(() => {
          const x = Math.random() * window.innerWidth;
          particleSystem.burst(x, window.innerHeight, 2, 'heart');
          particleSystem.start();
        }, 400);
      }

      // Cleanup function to clear all timers and intervals
      return () => {
        clearTimeout(titleTimer);
        clearTimeout(subtitleTimer);
        clearTimeout(messageTimer);
        if (heartInterval) {
          clearInterval(heartInterval);
        }
      };
    }
  }, [isActive, particleSystem]);

  // Easter egg: Click the hero heart for surprises!
  const handleHeartClick = () => {
    if (!particleSystem) return;

    const newCount = heartClickCount + 1;
    setHeartClickCount(newCount);

    const heartElement = document.querySelector('.hero-heart-container');
    if (heartElement) {
      const rect = heartElement.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const burstTypes = ['heart', 'star', 'sparkle', 'circle'];
      const particleCount = Math.min(20 + (newCount * 10), 100);
      const type = burstTypes[newCount % burstTypes.length];

      particleSystem.burst(x, y, particleCount, type);
      particleSystem.start();

      if (newCount % 5 === 0) {
        setTimeout(() => {
          burstTypes.forEach((burstType, i) => {
            setTimeout(() => {
              particleSystem.burst(x, y, 30, burstType);
            }, i * 100);
          });
        }, 100);
      }
    }
  };

  const handleContinue = (e) => {
    const button = e.currentTarget;

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
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              fontSize: `${16 + Math.random() * 20}px`,
              opacity: 0.08 + Math.random() * 0.12
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="welcome-content animate-scale-up">
        {/* Large Animated Heart */}
        <div
          className="hero-heart-container"
          onClick={handleHeartClick}
          style={{ cursor: 'pointer' }}
          title="💕 Tap me!"
        >
          <AnimatedHeart size={100} className="hero-heart" animate={true} />
          <div className="heart-glow" />
          {heartClickCount > 0 && (
            <div className="click-counter">
              {heartClickCount} 💕
            </div>
          )}
        </div>

        {/* Title with Typewriter */}
        <h1
          ref={titleRef}
          className="welcome-title"
          style={{ minHeight: '50px' }}
        >
          {/* Text will be filled by typewriter */}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="welcome-subtitle"
          style={{ opacity: 0, transition: 'opacity 1s' }}
        >
          We've got your back
        </p>

        {/* Warm welcome message */}
        <p
          ref={messageRef}
          className="welcome-message"
          style={{ opacity: 0, transition: 'opacity 1s' }}
        >
          You deserve to feel safe, supported, and empowered — no matter where you go or who you're with.
          Let's build your safety circle together. 🌸
        </p>

        {/* Feature Pills - mobile optimized */}
        <div className="feature-pills">
          {[
            { icon: '🛡️', text: 'Stay Safe', color: '#9370DB' },
            { icon: '💝', text: 'Feel Supported', color: '#FF69B4' },
            { icon: '✨', text: 'Take Control', color: '#FFB6C1' }
          ].map((feature, i) => (
            <div
              key={i}
              className="feature-pill animate-slide-up"
              style={{
                animationDelay: `${0.5 + i * 0.15}s`,
                borderLeft: `3px solid ${feature.color}`
              }}
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
          Let's Get Started
          <span className="btn-arrow">→</span>
        </button>

        {/* Swipe Hint for mobile */}
        <div className="swipe-hint animate-bounce">
          <span className="hint-icon">👆</span>
          <p className="hint-text">Tap to begin your journey</p>
        </div>
      </div>

      <style jsx>{`
        .welcome-splash {
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh; /* Mobile viewport height */
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 20px;
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
          width: 100%;
          padding: 0 20px;
          z-index: 1;
        }

        .hero-heart-container {
          position: relative;
          display: inline-block;
          margin-bottom: 24px;
          transition: transform 200ms;
          -webkit-tap-highlight-color: transparent;
        }

        .hero-heart-container:active {
          transform: scale(0.95);
        }

        .hero-heart {
          animation: pulse 2s ease-in-out infinite;
        }

        .click-counter {
          position: absolute;
          top: -12px;
          right: -12px;
          background: linear-gradient(135deg, #FFD93D, #FFA500);
          color: white;
          font-family: 'Fredoka One', cursive;
          font-size: 13px;
          padding: 4px 10px;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(255, 165, 0, 0.4);
          animation: bounce-in 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 10;
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .heart-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 130px;
          height: 130px;
          background: radial-gradient(circle, rgba(255,105,180,0.3) 0%, transparent 70%);
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
          font-size: clamp(32px, 8vw, 48px);
          color: #FF1493;
          margin-bottom: 12px;
          text-shadow: 2px 2px 0 rgba(147, 112, 219, 0.2);
          line-height: 1.2;
        }

        .welcome-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(18px, 4vw, 24px);
          color: #9370DB;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .welcome-message {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(14px, 3.5vw, 16px);
          color: #666;
          line-height: 1.7;
          margin-bottom: 28px;
          padding: 0 10px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .feature-pills {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
          width: 100%;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        .feature-pill {
          background: white;
          padding: 14px 20px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.15);
          transition: all 300ms;
          -webkit-tap-highlight-color: transparent;
        }

        .feature-pill:active {
          transform: scale(0.98);
        }

        .feature-icon {
          font-size: 24px;
          flex-shrink: 0;
        }

        .feature-text {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          color: #333;
          font-size: 15px;
          text-align: left;
        }

        .btn-continue {
          background: linear-gradient(135deg, #9370DB 0%, #FF69B4 100%);
          color: white;
          border: none;
          padding: 16px 40px;
          border-radius: 50px;
          font-size: 18px;
          font-weight: bold;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
          transition: all 300ms;
          position: relative;
          overflow: hidden;
          width: 100%;
          max-width: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 0 auto 24px;
          -webkit-tap-highlight-color: transparent;
          min-height: 52px;
        }

        .btn-continue:active {
          transform: translateY(2px) scale(0.98);
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
        }

        .btn-arrow {
          font-size: 20px;
          transition: transform 300ms;
        }

        .btn-continue:hover .btn-arrow {
          transform: translateX(4px);
        }

        .swipe-hint {
          color: #9370DB;
          font-family: 'Quicksand', sans-serif;
          opacity: 0.6;
          font-size: 13px;
        }

        .hint-icon {
          font-size: 24px;
          display: block;
          margin-bottom: 4px;
        }

        .hint-text {
          margin: 0;
          font-size: 13px;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        /* Tablet and up */
        @media (min-width: 768px) {
          .welcome-content {
            padding: 40px;
          }

          .hero-heart-container {
            margin-bottom: 30px;
          }

          .feature-pills {
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
          }

          .feature-pill {
            flex: 0 1 auto;
            min-width: 150px;
          }

          .btn-continue {
            width: auto;
            padding: 18px 50px;
          }

          .btn-continue:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 12px 35px rgba(255, 105, 180, 0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomeSplash;
