import React, { useState, useEffect } from 'react';
import { TimerClock, PhoneNotification, SafetyShield } from '../SVGGraphics';

const steps = [
  {
    id: 'create',
    icon: TimerClock,
    title: 'Create a Check-in',
    description: 'Set when you need to check in as safe',
    detail: 'Choose your time, add location, and select which besties to notify',
    color: '#9370DB',
    emoji: '⏰'
  },
  {
    id: 'notify',
    icon: PhoneNotification,
    title: 'Get Reminders',
    description: 'We\'ll send you friendly nudges',
    detail: 'You\'ll get notifications at 10min, 5min, 1min, and 30sec before your check-in time',
    color: '#FF69B4',
    emoji: '🔔'
  },
  {
    id: 'safe',
    icon: SafetyShield,
    title: 'Mark Yourself Safe',
    description: 'One tap and you\'re all set!',
    detail: 'If you don\'t check in, your besties get alerted with your last known location',
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
          How It Works ✨
        </h2>
        <p className="how-subtitle animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Simple, quick, and always there for you
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
          Got it! Let's keep going 🚀
        </button>
      </div>

      <style jsx>{`
        .how-it-works {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .how-content {
          max-width: 800px;
          width: 100%;
        }

        .how-title {
          font-family: 'Fredoka One', cursive;
          font-size: 36px;
          color: #FF1493;
          text-align: center;
          margin-bottom: 10px;
        }

        .how-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: 18px;
          color: #666;
          text-align: center;
          margin-bottom: 40px;
        }

        .step-indicators {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 40px;
          gap: 20px;
        }

        .step-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          position: relative;
          transition: all 300ms;
        }

        .step-indicator:hover .step-number {
          transform: scale(1.1);
        }

        .step-number {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #f0f0f0;
          border: 3px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fredoka One', cursive;
          font-size: 20px;
          color: #999;
          transition: all 400ms;
        }

        .step-indicator.active .step-number {
          background: linear-gradient(135deg, #9370DB, #FF69B4);
          border-color: transparent;
          color: white;
          transform: scale(1.2);
          box-shadow: 0 8px 20px rgba(255, 105, 180, 0.4);
        }

        .step-indicator.completed .step-number {
          background: #4CAF50;
          border-color: transparent;
          color: white;
        }

        .step-label {
          font-family: 'Quicksand', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #999;
          transition: all 300ms;
          text-align: center;
          max-width: 80px;
        }

        .step-indicator.active .step-label {
          color: #FF1493;
          font-size: 14px;
        }

        .step-connector {
          position: absolute;
          top: 25px;
          left: calc(100% + 10px);
          width: 40px;
          height: 3px;
          background: #ddd;
          transition: all 400ms;
        }

        .step-connector.completed {
          background: linear-gradient(90deg, #9370DB, #FF69B4);
        }

        .step-display {
          background: white;
          border-radius: 25px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(255, 105, 180, 0.15);
          margin-bottom: 30px;
          min-height: 400px;
        }

        .step-content {
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }

        .step-icon-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-decoration {
          position: absolute;
          border: 2px solid;
          border-radius: 50%;
          opacity: 0.3;
        }

        .decoration-1 {
          width: 180px;
          height: 180px;
          animation: rotate-slow 10s linear infinite;
        }

        .decoration-2 {
          width: 220px;
          height: 220px;
          animation: rotate-slow 15s linear infinite reverse;
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .step-info {
          text-align: center;
          max-width: 500px;
        }

        .step-emoji {
          font-size: 40px;
          margin-bottom: 10px;
        }

        .step-title {
          font-family: 'Fredoka One', cursive;
          font-size: 28px;
          margin-bottom: 10px;
        }

        .step-description {
          font-family: 'Quicksand', sans-serif;
          font-size: 18px;
          color: #666;
          margin-bottom: 20px;
        }

        .detail-badge {
          background: linear-gradient(135deg, #FFF5F7, #FFE8F0);
          border: 2px solid #FFB6C1;
          border-radius: 15px;
          padding: 15px 20px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }

        .detail-icon {
          font-size: 24px;
        }

        .detail-text {
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }

        .autoplay-toggle {
          text-align: center;
          cursor: pointer;
          color: #9370DB;
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 200ms;
        }

        .autoplay-toggle:hover {
          color: #FF69B4;
          transform: scale(1.05);
        }

        .btn-continue {
          background: linear-gradient(135deg, #9370DB 0%, #FF69B4 100%);
          color: white;
          border: none;
          padding: 18px 40px;
          border-radius: 50px;
          font-size: 18px;
          font-weight: bold;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
          transition: all 300ms;
          display: block;
          margin: 0 auto;
        }

        .btn-continue:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 105, 180, 0.5);
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;
