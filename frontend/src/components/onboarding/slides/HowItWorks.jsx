import React, { useState, useEffect } from 'react';
import { TimerClock, PhoneNotification, SafetyShield } from '../SVGGraphics';

const steps = [
  {
    id: 'create',
    icon: TimerClock,
    title: 'Start a Check-in',
    description: 'Let your circle know you\'re heading out',
    detail: 'Pick your check-in time, share your location if you want, and choose who to notify',
    color: '#9370DB',
    emoji: '⏰'
  },
  {
    id: 'notify',
    icon: PhoneNotification,
    title: 'We\'ve Got You',
    description: 'Gentle reminders keep you on track',
    detail: 'We\'ll send friendly nudges at 10, 5, and 1 minute out — never pushy, always supportive',
    color: '#FF69B4',
    emoji: '🔔'
  },
  {
    id: 'safe',
    icon: SafetyShield,
    title: 'Check In Safe',
    description: 'One simple tap brings peace of mind',
    detail: 'Your besties will know you\'re okay. If you miss check-in, they\'ll be alerted automatically',
    color: '#4CAF50',
    emoji: '✅'
  }
];

const HowItWorks = ({ onNext, particleSystem, isActive }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [autoPlayActive, setAutoPlayActive] = useState(true);

  useEffect(() => {
    if (isActive && autoPlayActive) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isActive, autoPlayActive]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    setAutoPlayActive(false);

    if (particleSystem) {
      particleSystem.burst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        15,
        'star'
      );
      particleSystem.start();
    }
  };

  const handleContinue = () => {
    if (particleSystem) {
      particleSystem.burst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        40,
        'sparkle'
      );
      particleSystem.start();
    }

    onNext(null, 'explode');
  };

  return (
    <div className="how-it-works">
      <div className="how-content">
        <h2 className="how-title animate-slide-up">
          It's super simple ✨
        </h2>
        <p className="how-subtitle animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Three easy steps to feel safer, wherever you go
        </p>

        {/* Step Indicators */}
        <div className="step-indicators">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`step-indicator ${index === activeStep ? 'active' : ''} ${
                index < activeStep ? 'completed' : ''
              }`}
              onClick={() => handleStepClick(index)}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-label">{step.title}</div>
              {index < steps.length - 1 && (
                <div className={`step-connector ${index < activeStep ? 'completed' : ''}`} />
              )}
            </div>
          ))}
        </div>

        {/* Active Step Display */}
        <div className="step-display">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;

            return (
              <div
                key={step.id}
                className={`step-content ${isActive ? 'active' : ''}`}
                style={{ display: isActive ? 'flex' : 'none' }}
              >
                {/* Animated Icon */}
                <div className="step-icon-container">
                  <Icon
                    size={150}
                    className="step-icon animate-scale-up"
                    progress={index === 0 ? 0.75 : undefined}
                  />

                  {/* Decorative circles */}
                  <div className="icon-decoration decoration-1" style={{ borderColor: step.color }} />
                  <div className="icon-decoration decoration-2" style={{ borderColor: step.color }} />
                </div>

                {/* Step Info */}
                <div className="step-info">
                  <div className="step-emoji">{step.emoji}</div>
                  <h3 className="step-title" style={{ color: step.color }}>
                    {step.title}
                  </h3>
                  <p className="step-description">{step.description}</p>
                  <div className="step-detail">
                    <div className="detail-badge">
                      <span className="detail-icon">💡</span>
                      <span className="detail-text">{step.detail}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Auto-play toggle */}
        <div className="autoplay-toggle" onClick={() => setAutoPlayActive(!autoPlayActive)}>
          <span className="toggle-icon">{autoPlayActive ? '⏸️' : '▶️'}</span>
          <span className="toggle-text">
            {autoPlayActive ? 'Pause auto-play' : 'Resume auto-play'}
          </span>
        </div>

        {/* Continue Button */}
        <button className="btn-continue flying-element" onClick={handleContinue}>
          Makes sense! Let's continue
          <span className="btn-arrow">→</span>
        </button>
      </div>

      <style jsx>{`
        .how-it-works {
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 20px;
          padding-top: 40px;
          padding-bottom: 40px;
          overflow-y: auto;
        }

        .how-content {
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
        }

        .how-title {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(26px, 7vw, 36px);
          color: #FF1493;
          text-align: center;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .how-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(14px, 3.5vw, 17px);
          color: #666;
          text-align: center;
          margin-bottom: 28px;
          line-height: 1.6;
          padding: 0 10px;
        }

        .step-indicators {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 24px;
          gap: 12px;
        }

        .step-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          position: relative;
          transition: all 300ms;
          -webkit-tap-highlight-color: transparent;
        }

        .step-indicator:active .step-number {
          transform: scale(0.95);
        }

        .step-number {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #f0f0f0;
          border: 3px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fredoka One', cursive;
          font-size: 18px;
          color: #999;
          transition: all 400ms;
        }

        .step-indicator.active .step-number {
          background: linear-gradient(135deg, #9370DB, #FF69B4);
          border-color: transparent;
          color: white;
          transform: scale(1.15);
          box-shadow: 0 6px 18px rgba(255, 105, 180, 0.4);
        }

        .step-indicator.completed .step-number {
          background: #4CAF50;
          border-color: transparent;
          color: white;
        }

        .step-label {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(10px, 2.5vw, 12px);
          font-weight: 600;
          color: #999;
          transition: all 300ms;
          text-align: center;
          max-width: 70px;
          line-height: 1.2;
        }

        .step-indicator.active .step-label {
          color: #FF1493;
          font-size: clamp(11px, 2.8vw, 13px);
        }

        .step-connector {
          position: absolute;
          top: 22px;
          left: calc(100% + 6px);
          width: 20px;
          height: 3px;
          background: #ddd;
          transition: all 400ms;
        }

        .step-connector.completed {
          background: linear-gradient(90deg, #9370DB, #FF69B4);
        }

        .step-display {
          background: white;
          border-radius: 20px;
          padding: 24px 16px;
          box-shadow: 0 8px 30px rgba(255, 105, 180, 0.12);
          margin-bottom: 20px;
          min-height: 380px;
        }

        .step-content {
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .step-icon-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }

        .icon-decoration {
          position: absolute;
          border: 2px solid;
          border-radius: 50%;
          opacity: 0.25;
        }

        .decoration-1 {
          width: 120px;
          height: 120px;
          animation: rotate-slow 10s linear infinite;
        }

        .decoration-2 {
          width: 150px;
          height: 150px;
          animation: rotate-slow 15s linear infinite reverse;
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .step-info {
          text-align: center;
          max-width: 500px;
          padding: 0 10px;
        }

        .step-emoji {
          font-size: 36px;
          margin-bottom: 8px;
          line-height: 1;
        }

        .step-title {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(22px, 5vw, 28px);
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .step-description {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(15px, 3.5vw, 17px);
          color: #666;
          margin-bottom: 16px;
          line-height: 1.5;
        }

        .detail-badge {
          background: linear-gradient(135deg, #FFF5F7, #FFE8F0);
          border: 2px solid #FFB6C1;
          border-radius: 14px;
          padding: 12px 16px;
          display: inline-flex;
          align-items: flex-start;
          gap: 10px;
          max-width: 100%;
        }

        .detail-icon {
          font-size: 20px;
          flex-shrink: 0;
          line-height: 1;
        }

        .detail-text {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(13px, 3vw, 14px);
          color: #666;
          line-height: 1.6;
          text-align: left;
        }

        .autoplay-toggle {
          text-align: center;
          cursor: pointer;
          color: #9370DB;
          font-family: 'Quicksand', sans-serif;
          font-size: 13px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 200ms;
          padding: 6px;
          -webkit-tap-highlight-color: transparent;
        }

        .autoplay-toggle:active {
          color: #FF69B4;
          transform: scale(0.98);
        }

        .toggle-icon {
          font-size: 16px;
        }

        .btn-continue {
          background: linear-gradient(135deg, #9370DB 0%, #FF69B4 100%);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 50px;
          font-size: clamp(15px, 3.5vw, 17px);
          font-weight: bold;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
          transition: all 300ms;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 0 auto;
          width: 100%;
          max-width: 340px;
          min-height: 52px;
          -webkit-tap-highlight-color: transparent;
        }

        .btn-continue:active {
          transform: translateY(2px) scale(0.98);
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
        }

        .btn-arrow {
          font-size: 18px;
          transition: transform 300ms;
        }

        /* Tablet and up */
        @media (min-width: 600px) {
          .step-indicators {
            gap: 16px;
          }

          .step-number {
            width: 48px;
            height: 48px;
            font-size: 20px;
          }

          .step-connector {
            width: 30px;
          }

          .step-display {
            padding: 32px 24px;
          }

          .step-emoji {
            font-size: 40px;
          }

          .decoration-1 {
            width: 160px;
            height: 160px;
          }

          .decoration-2 {
            width: 200px;
            height: 200px;
          }
        }

        /* Desktop */
        @media (min-width: 900px) {
          .step-indicators {
            gap: 20px;
          }

          .step-number {
            width: 52px;
            height: 52px;
          }

          .step-indicator:hover .step-number {
            transform: scale(1.1);
          }

          .step-connector {
            width: 40px;
          }

          .step-display {
            padding: 40px;
            min-height: 400px;
          }

          .decoration-1 {
            width: 180px;
            height: 180px;
          }

          .decoration-2 {
            width: 220px;
            height: 220px;
          }

          .btn-continue {
            width: auto;
            min-width: 280px;
          }

          .btn-continue:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 12px 35px rgba(255, 105, 180, 0.5);
          }

          .btn-continue:hover .btn-arrow {
            transform: translateX(4px);
          }

          .autoplay-toggle:hover {
            color: #FF69B4;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;
