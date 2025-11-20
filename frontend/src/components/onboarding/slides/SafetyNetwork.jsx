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
          Your Safety Network 💝
        </h2>
        <p className="network-subtitle animate-slide-up" style={{ animationDelay: '0.1s' }}>
          You + Your Besties = Unstoppable
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
            <div className="feature-card-title">Featured Circle</div>
            <div className="feature-card-text">
              Choose 5 besties who get notified first
            </div>
          </div>

          <div className="feature-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="feature-card-icon">🔔</div>
            <div className="feature-card-title">Smart Alerts</div>
            <div className="feature-card-text">
              They're alerted only if you miss your check-in
            </div>
          </div>

          <div className="feature-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="feature-card-icon">🗺️</div>
            <div className="feature-card-title">Location Sharing</div>
            <div className="feature-card-text">
              Your last known location is shared if needed
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
          Love it! Next 💜
        </button>
      </div>

      <style jsx>{`
        .safety-network {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .network-content {
          max-width: 900px;
          width: 100%;
        }

        .network-title {
          font-family: 'Fredoka One', cursive;
          font-size: 36px;
          color: #FF1493;
          text-align: center;
          margin-bottom: 10px;
        }

        .network-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: 20px;
          color: #9370DB;
          text-align: center;
          margin-bottom: 40px;
          font-weight: 600;
        }

        .network-illustration {
          position: relative;
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
          min-height: 350px;
        }

        .info-bubble {
          position: absolute;
          background: white;
          border-radius: 20px;
          padding: 12px 18px;
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.25);
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: scale(0.5);
          transition: all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .info-bubble.show {
          opacity: 1;
          transform: scale(1);
        }

        .bubble-1 {
          top: 10%;
          left: 50%;
          transform: translateX(-50%) scale(0.5);
        }

        .bubble-1.show {
          transform: translateX(-50%) scale(1);
        }

        .bubble-2 {
          top: 40%;
          right: 5%;
        }

        .bubble-3 {
          bottom: 20%;
          left: 5%;
        }

        .bubble-icon {
          font-size: 28px;
        }

        .bubble-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .bubble-text strong {
          font-family: 'Fredoka One', cursive;
          font-size: 14px;
          color: #FF1493;
        }

        .bubble-text span {
          font-family: 'Quicksand', sans-serif;
          font-size: 12px;
          color: #666;
        }

        .feature-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .feature-card {
          background: linear-gradient(135deg, #FFF5F7, #FFE8F0);
          border: 2px solid #FFB6C1;
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          transition: all 300ms;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(255, 105, 180, 0.25);
        }

        .feature-card-icon {
          font-size: 36px;
          margin-bottom: 10px;
        }

        .feature-card-title {
          font-family: 'Fredoka One', cursive;
          font-size: 16px;
          color: #FF1493;
          margin-bottom: 8px;
        }

        .feature-card-text {
          font-family: 'Quicksand', sans-serif;
          font-size: 13px;
          color: #666;
          line-height: 1.5;
        }

        .trust-badge {
          background: linear-gradient(135deg, #E8F5E9, #C8E6C9);
          border: 2px solid #4CAF50;
          border-radius: 20px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .trust-icon {
          font-size: 48px;
        }

        .trust-text strong {
          font-family: 'Fredoka One', cursive;
          font-size: 18px;
          color: #4CAF50;
          display: block;
          margin-bottom: 5px;
        }

        .trust-text p {
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          color: #666;
          margin: 0;
          line-height: 1.5;
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

export default SafetyNetwork;
