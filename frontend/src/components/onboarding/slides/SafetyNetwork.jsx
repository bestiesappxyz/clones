import React, { useEffect, useState } from 'react';
import { FriendsCircle } from '../SVGGraphics';

const SafetyNetwork = ({ onNext, particleSystem, isActive }) => {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    if (isActive) {
      const timers = [
        setTimeout(() => setAnimationStage(1), 500),
        setTimeout(() => setAnimationStage(2), 1500),
        setTimeout(() => setAnimationStage(3), 2500),
      ];

      return () => timers.forEach(clearTimeout);
    }
  }, [isActive]);

  const handleContinue = () => {
    if (particleSystem) {
      // Create heart bursts from each bestie position
      const angles = [0, 72, 144, 216, 288];
      angles.forEach((angle, i) => {
        setTimeout(() => {
          const rad = (angle * Math.PI) / 180;
          const x = window.innerWidth / 2 + Math.cos(rad) * 100;
          const y = window.innerHeight / 2 + Math.sin(rad) * 100;

          particleSystem.burst(x, y, 15, 'heart');
          particleSystem.start();
        }, i * 100);
      });
    }

    setTimeout(() => onNext(null, 'fly'), 500);
  };

  return (
    <div className="safety-network">
      <div className="network-content">
        <h2 className="network-title animate-slide-up">
          Build your safety circle 💝
        </h2>
        <p className="network-subtitle animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Stronger together, always connected
        </p>

        {/* Main Illustration */}
        <div className="network-illustration">
          <FriendsCircle size={300} />

          {/* Animated Info Bubbles */}
          <div className={`info-bubble bubble-1 ${animationStage >= 1 ? 'show' : ''}`}>
            <div className="bubble-icon">👑</div>
            <div className="bubble-text">
              <strong>You</strong>
              <span>At the center</span>
            </div>
          </div>

          <div className={`info-bubble bubble-2 ${animationStage >= 2 ? 'show' : ''}`}>
            <div className="bubble-icon">🤝</div>
            <div className="bubble-text">
              <strong>Your Besties</strong>
              <span>Have your back</span>
            </div>
          </div>

          <div className={`info-bubble bubble-3 ${animationStage >= 3 ? 'show' : ''}`}>
            <div className="bubble-icon">💕</div>
            <div className="bubble-text">
              <strong>Connected</strong>
              <span>Always together</span>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="feature-cards">
          <div className="feature-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="feature-card-icon">🎯</div>
            <div className="feature-card-title">Your Inner Circle</div>
            <div className="feature-card-text">
              Pick the people who always have your back
            </div>
          </div>

          <div className="feature-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="feature-card-icon">🔔</div>
            <div className="feature-card-title">They've Got You</div>
            <div className="feature-card-text">
              Notified automatically if you don't check in
            </div>
          </div>

          <div className="feature-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="feature-card-icon">🗺️</div>
            <div className="feature-card-title">Stay Connected</div>
            <div className="feature-card-text">
              Share your location on your terms, when you want
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="trust-badge animate-scale-up" style={{ animationDelay: '0.5s' }}>
          <div className="trust-icon">🛡️</div>
          <div className="trust-text">
            <strong>Private & Secure</strong>
            <p>Your data is encrypted and never shared without your permission</p>
          </div>
        </div>

        {/* Continue Button */}
        <button className="btn-continue flying-element" onClick={handleContinue}>
          I'm ready to build my circle
          <span className="btn-arrow">→</span>
        </button>
      </div>

      <style jsx>{`
        .safety-network {
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

        .network-content {
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
        }

        .network-title {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(26px, 7vw, 36px);
          color: #FF1493;
          text-align: center;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .network-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(16px, 4vw, 19px);
          color: #9370DB;
          text-align: center;
          margin-bottom: 28px;
          font-weight: 600;
          line-height: 1.4;
        }

        .network-illustration {
          position: relative;
          display: flex;
          justify-content: center;
          margin-bottom: 28px;
          min-height: 240px;
        }

        .info-bubble {
          position: absolute;
          background: white;
          border-radius: 14px;
          padding: 10px 14px;
          box-shadow: 0 6px 20px rgba(255, 105, 180, 0.2);
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transform: scale(0.5);
          transition: all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 2;
        }

        .info-bubble.show {
          opacity: 1;
          transform: scale(1);
        }

        .bubble-1 {
          top: 5%;
          left: 50%;
          transform: translateX(-50%) scale(0.5);
        }

        .bubble-1.show {
          transform: translateX(-50%) scale(1);
        }

        .bubble-2 {
          top: 35%;
          right: 2%;
        }

        .bubble-3 {
          bottom: 15%;
          left: 2%;
        }

        .bubble-icon {
          font-size: 22px;
          line-height: 1;
          flex-shrink: 0;
        }

        .bubble-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .bubble-text strong {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(11px, 2.5vw, 13px);
          color: #FF1493;
          line-height: 1.2;
        }

        .bubble-text span {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(10px, 2.3vw, 11px);
          color: #666;
          line-height: 1.2;
        }

        .feature-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-bottom: 20px;
        }

        .feature-card {
          background: linear-gradient(135deg, #FFF5F7, #FFE8F0);
          border: 2px solid #FFB6C1;
          border-radius: 14px;
          padding: 18px;
          text-align: center;
          transition: all 300ms;
          -webkit-tap-highlight-color: transparent;
        }

        .feature-card:active {
          transform: scale(0.98);
        }

        .feature-card-icon {
          font-size: 32px;
          margin-bottom: 8px;
          line-height: 1;
        }

        .feature-card-title {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(15px, 3.5vw, 16px);
          color: #FF1493;
          margin-bottom: 6px;
          line-height: 1.2;
        }

        .feature-card-text {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(13px, 3vw, 14px);
          color: #666;
          line-height: 1.6;
        }

        .trust-badge {
          background: linear-gradient(135deg, #E8F5E9, #C8E6C9);
          border: 2px solid #4CAF50;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }

        .trust-icon {
          font-size: 40px;
          flex-shrink: 0;
          line-height: 1;
        }

        .trust-text strong {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(15px, 3.5vw, 17px);
          color: #4CAF50;
          display: block;
          margin-bottom: 4px;
          line-height: 1.2;
        }

        .trust-text p {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(12px, 3vw, 13px);
          color: #666;
          margin: 0;
          line-height: 1.6;
        }

        .btn-continue {
          background: linear-gradient(135deg, #9370DB 0%, #FF69B4 100%);
          color: white;
          border: none;
          padding: 16px 28px;
          border-radius: 50px;
          font-size: clamp(14px, 3.5vw, 16px);
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
          .network-illustration {
            min-height: 320px;
          }

          .bubble-icon {
            font-size: 26px;
          }

          .feature-cards {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 28px;
          }

          .feature-card-icon {
            font-size: 36px;
          }

          .trust-badge {
            padding: 20px;
            gap: 18px;
          }

          .trust-icon {
            font-size: 46px;
          }
        }

        /* Desktop */
        @media (min-width: 900px) {
          .network-illustration {
            min-height: 350px;
          }

          .bubble-icon {
            font-size: 28px;
          }

          .bubble-2 {
            right: 5%;
          }

          .bubble-3 {
            left: 5%;
          }

          .feature-cards {
            gap: 20px;
            margin-bottom: 30px;
          }

          .feature-card {
            padding: 20px;
          }

          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(255, 105, 180, 0.25);
          }

          .trust-icon {
            font-size: 48px;
          }

          .btn-continue {
            width: auto;
            min-width: 300px;
            padding: 18px 36px;
          }

          .btn-continue:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 12px 35px rgba(255, 105, 180, 0.5);
          }

          .btn-continue:hover .btn-arrow {
            transform: translateX(4px);
          }
        }
      `}</style>
    </div>
  );
};

export default SafetyNetwork;
