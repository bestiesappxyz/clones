import React, { useState, useEffect } from 'react';
import { TimerClock, SafetyShield } from '../SVGGraphics';

const InteractiveDemo = ({ onNext, particleSystem }) => {
  const [demoStage, setDemoStage] = useState('setup'); // 'setup', 'timer', 'success'
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 seconds demo
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining]);

  const startDemo = () => {
    setDemoStage('timer');
    setIsTimerActive(true);

    if (particleSystem) {
      particleSystem.burst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        30,
        'star'
      );
      particleSystem.start();
    }
  };

  const markSafe = () => {
    setDemoStage('success');
    setIsTimerActive(false);

    // Epic celebration!
    if (particleSystem) {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          particleSystem.burst(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight / 2,
            25,
            ['heart', 'star', 'sparkle'][i % 3]
          );
        }, i * 150);
      }
      particleSystem.start();
    }

    setTimeout(() => {
      onNext(null, 'slide');
    }, 3500);
  };

  const progress = 1 - (timeRemaining / 30);

  return (
    <div className="interactive-demo">
      <div className="demo-content">
        {demoStage === 'setup' && (
          <>
            <h2 className="demo-title animate-slide-up">
              Let's Try It Out! 🎮
            </h2>
            <p className="demo-subtitle animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Interactive demo - see how easy it is
            </p>

            <div className="demo-phone">
              <div className="phone-screen">
                <div className="demo-app">
                  <div className="demo-header">
                    <h3>Create Check-In</h3>
                  </div>

                  <div className="demo-field">
                    <label>⏰ Duration</label>
                    <div className="demo-value">30 seconds (for demo)</div>
                  </div>

                  <div className="demo-field">
                    <label>📍 Location</label>
                    <div className="demo-value">Current Location</div>
                  </div>

                  <div className="demo-field">
                    <label>👥 Notify</label>
                    <div className="demo-value">Your Besties</div>
                  </div>

                  <button className="demo-start-btn" onClick={startDemo}>
                    Start Demo Check-In ▶️
                  </button>
                </div>
              </div>
            </div>

            <div className="demo-instruction">
              <span className="instruction-icon">👆</span>
              <span className="instruction-text">Tap the button to start</span>
            </div>
          </>
        )}

        {demoStage === 'timer' && (
          <>
            <h2 className="demo-title">
              Check-In Active! ⏰
            </h2>
            <p className="demo-subtitle">
              This is what you'll see when a check-in is running
            </p>

            <div className="timer-display">
              <TimerClock size={200} progress={progress} />
              <div className="timer-number">
                <span className="time-value">{timeRemaining}</span>
                <span className="time-unit">seconds</span>
              </div>
            </div>

            <div className="timer-info">
              <div className="info-card">
                <div className="info-icon">📍</div>
                <div className="info-text">
                  <strong>Location tracked</strong>
                  <span>Your besties can find you if needed</span>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">🔔</div>
                <div className="info-text">
                  <strong>Reminders sent</strong>
                  <span>You'd get notifications as time runs out</span>
                </div>
              </div>
            </div>

            <button className="btn-safe flying-element" onClick={markSafe}>
              I'm Safe! ✓
            </button>

            <div className="timer-hint">
              <p>In real life, if you don't press "I'm Safe", your besties get alerted!</p>
            </div>
          </>
        )}

        {demoStage === 'success' && (
          <>
            <div className="success-animation">
              <SafetyShield size={180} className="animate-scale-up" />

              <h2 className="success-title">
                You're Safe! 🎉
              </h2>
              <p className="success-message">
                See how easy that was?
              </p>

              <div className="success-stats">
                <div className="stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-value">Check-In</div>
                  <div className="stat-label">Completed</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">💝</div>
                  <div className="stat-value">Besties</div>
                  <div className="stat-label">Notified</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">🛡️</div>
                  <div className="stat-value">Safe</div>
                  <div className="stat-label">Confirmed</div>
                </div>
              </div>

              <div className="success-note">
                That's all there is to it! Simple, quick, and effective.
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .interactive-demo {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .demo-content {
          max-width: 600px;
          width: 100%;
        }

        .demo-title {
          font-family: 'Fredoka One', cursive;
          font-size: 36px;
          color: #FF1493;
          text-align: center;
          margin-bottom: 10px;
        }

        .demo-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: 18px;
          color: #9370DB;
          text-align: center;
          margin-bottom: 30px;
        }

        .demo-phone {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 40px;
          padding: 20px;
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
          margin: 0 auto 25px;
          max-width: 400px;
        }

        .phone-screen {
          background: #f5f5f5;
          border-radius: 30px;
          padding: 25px;
        }

        .demo-app {
          background: white;
          border-radius: 20px;
          padding: 25px;
        }

        .demo-header h3 {
          font-family: 'Fredoka One', cursive;
          font-size: 20px;
          color: #FF1493;
          margin: 0 0 20px 0;
          text-align: center;
        }

        .demo-field {
          margin-bottom: 15px;
        }

        .demo-field label {
          font-family: 'Quicksand', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #666;
          display: block;
          margin-bottom: 6px;
        }

        .demo-value {
          font-family: 'Quicksand', sans-serif;
          font-size: 16px;
          color: #333;
          background: #f9f9f9;
          padding: 12px 15px;
          border-radius: 10px;
          border: 2px solid #f0f0f0;
        }

        .demo-start-btn {
          width: 100%;
          background: linear-gradient(135deg, #9370DB, #FF69B4);
          color: white;
          border: none;
          padding: 15px;
          border-radius: 15px;
          font-family: 'Fredoka One', cursive;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
          transition: all 300ms;
        }

        .demo-start-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(255, 105, 180, 0.4);
        }

        .demo-instruction {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'Quicksand', sans-serif;
          color: #9370DB;
          animation: bounce 1.5s ease-in-out infinite;
        }

        .instruction-icon {
          font-size: 24px;
        }

        .timer-display {
          position: relative;
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .timer-number {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .time-value {
          display: block;
          font-family: 'Fredoka One', cursive;
          font-size: 48px;
          color: #FF1493;
        }

        .time-unit {
          display: block;
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          color: #999;
        }

        .timer-info {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 25px;
        }

        .info-card {
          background: white;
          border-radius: 15px;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.15);
        }

        .info-icon {
          font-size: 32px;
        }

        .info-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .info-text strong {
          font-family: 'Fredoka One', cursive;
          font-size: 14px;
          color: #333;
        }

        .info-text span {
          font-family: 'Quicksand', sans-serif;
          font-size: 12px;
          color: #999;
        }

        .btn-safe {
          width: 100%;
          background: linear-gradient(135deg, #4CAF50, #8BC34A);
          color: white;
          border: none;
          padding: 20px;
          border-radius: 50px;
          font-family: 'Fredoka One', cursive;
          font-size: 22px;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
          transition: all 300ms;
          margin-bottom: 15px;
        }

        .btn-safe:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 12px 35px rgba(76, 175, 80, 0.5);
        }

        .timer-hint {
          background: linear-gradient(135deg, #FFF9E6, #FFE8CC);
          border: 2px solid #FFD93D;
          border-radius: 12px;
          padding: 12px 15px;
          text-align: center;
        }

        .timer-hint p {
          font-family: 'Quicksand', sans-serif;
          font-size: 13px;
          color: #666;
          margin: 0;
        }

        .success-animation {
          text-align: center;
        }

        .success-title {
          font-family: 'Fredoka One', cursive;
          font-size: 42px;
          color: #4CAF50;
          margin: 20px 0 10px;
        }

        .success-message {
          font-family: 'Quicksand', sans-serif;
          font-size: 20px;
          color: #666;
          margin-bottom: 30px;
        }

        .success-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 25px;
        }

        .stat-card {
          background: white;
          border-radius: 15px;
          padding: 20px 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 300ms;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-icon {
          font-size: 36px;
          margin-bottom: 8px;
        }

        .stat-value {
          font-family: 'Fredoka One', cursive;
          font-size: 14px;
          color: #FF1493;
          margin-bottom: 3px;
        }

        .stat-label {
          font-family: 'Quicksand', sans-serif;
          font-size: 11px;
          color: #999;
        }

        .success-note {
          background: linear-gradient(135deg, #E8F5E9, #C8E6C9);
          border: 2px solid #4CAF50;
          border-radius: 15px;
          padding: 15px;
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          color: #666;
          line-height: 1.6;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default InteractiveDemo;
