import React, { useEffect, useState } from 'react';
import { SuccessCelebration } from '../SVGGraphics';

const FinalCelebration = ({ onComplete, particleSystem, userData, awardXP, unlockAchievement }) => {
  const [stage, setStage] = useState(0); // 0: building up, 1: celebration, 2: summary
  const [stats] = useState({
    scenariosSelected: userData.selectedScenarios?.length || 0,
    profileComplete: userData.displayName && userData.photoURL,
    bestieAdded: userData.firstBestieAdded,
    notificationsEnabled: userData.notificationsEnabled
  });

  useEffect(() => {
    // Final XP award and achievement
    if (stage === 0) {
      unlockAchievement('onboarding_complete', 'Onboarding Master', 'Completed the magical journey!');
      awardXP(100);

      // Continuous confetti for celebration
      if (particleSystem) {
        const interval = setInterval(() => {
          const types = ['heart', 'star', 'sparkle', 'circle'];
          const x = Math.random() * window.innerWidth;
          particleSystem.burst(x, 0, 10, types[Math.floor(Math.random() * types.length)]);
          particleSystem.start();
        }, 200);

        setTimeout(() => clearInterval(interval), 5000);
      }

      // Progress through stages
      setTimeout(() => setStage(1), 1000);
      setTimeout(() => setStage(2), 3000);
    }
  }, [stage, particleSystem, unlockAchievement, awardXP]);

  const completionPercentage = Math.round(
    ((stats.scenariosSelected > 0 ? 25 : 0) +
      (stats.profileComplete ? 25 : 0) +
      (stats.bestieAdded ? 30 : 0) +
      (stats.notificationsEnabled ? 20 : 0))
  );

  return (
    <div className="final-celebration">
      <div className="celebration-content">
        {/* Main Celebration */}
        <div className={`celebration-hero ${stage >= 1 ? 'show' : ''}`}>
          <SuccessCelebration size={250} className="animate-scale-up" />

          <h1 className="celebration-title animate-slide-up">
            🎉 You're All Set! 🎉
          </h1>

          <p className="celebration-message animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Welcome to the Besties family, {userData.displayName?.split(' ')[0] || 'friend'}!
          </p>
        </div>

        {/* Summary Stats */}
        {stage >= 2 && (
          <div className="completion-summary animate-scale-up">
            <div className="summary-header">
              <h3>Your Onboarding Journey</h3>
              <div className="completion-badge">
                <span className="completion-number">{completionPercentage}%</span>
                <span className="completion-label">Complete</span>
              </div>
            </div>

            <div className="summary-stats">
              <div className={`stat-item ${stats.scenariosSelected > 0 ? 'completed' : ''}`}>
                <div className="stat-icon">
                  {stats.scenariosSelected > 0 ? '✅' : '⭕'}
                </div>
                <div className="stat-text">
                  <div className="stat-title">Scenarios Selected</div>
                  <div className="stat-detail">
                    {stats.scenariosSelected > 0
                      ? `${stats.scenariosSelected} scenario${stats.scenariosSelected > 1 ? 's' : ''}`
                      : 'Skipped'}
                  </div>
                </div>
              </div>

              <div className={`stat-item ${stats.profileComplete ? 'completed' : ''}`}>
                <div className="stat-icon">
                  {stats.profileComplete ? '✅' : '⭕'}
                </div>
                <div className="stat-text">
                  <div className="stat-title">Profile Setup</div>
                  <div className="stat-detail">
                    {stats.profileComplete ? 'Complete with photo' : 'Partially complete'}
                  </div>
                </div>
              </div>

              <div className={`stat-item ${stats.bestieAdded ? 'completed' : ''}`}>
                <div className="stat-icon">
                  {stats.bestieAdded ? '✅' : '⭕'}
                </div>
                <div className="stat-text">
                  <div className="stat-title">First Bestie</div>
                  <div className="stat-detail">
                    {stats.bestieAdded ? 'Added successfully' : 'Not added yet'}
                  </div>
                </div>
              </div>

              <div className={`stat-item ${stats.notificationsEnabled ? 'completed' : ''}`}>
                <div className="stat-icon">
                  {stats.notificationsEnabled ? '✅' : '⭕'}
                </div>
                <div className="stat-text">
                  <div className="stat-title">Notifications</div>
                  <div className="stat-detail">
                    {stats.notificationsEnabled ? 'Enabled' : 'Not enabled'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        {stage >= 2 && (
          <div className="next-steps animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="next-steps-title">What's Next?</h3>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-icon">🎯</div>
                <div className="step-title">Create Your First Check-In</div>
                <div className="step-description">Try it out when you're going somewhere</div>
              </div>

              <div className="step-card">
                <div className="step-icon">👥</div>
                <div className="step-title">Add More Besties</div>
                <div className="step-description">Build your full safety circle (up to 5)</div>
              </div>

              <div className="step-card">
                <div className="step-icon">⚙️</div>
                <div className="step-title">Explore Settings</div>
                <div className="step-description">Customize your experience</div>
              </div>
            </div>
          </div>
        )}

        {/* Final Message */}
        {stage >= 2 && (
          <div className="final-message animate-scale-up" style={{ animationDelay: '0.5s' }}>
            <div className="message-icon">💜</div>
            <h3 className="message-title">You Got This!</h3>
            <p className="message-text">
              You're now part of a community that looks out for each other.
              Stay safe, support your besties, and remember: we've always got your back.
            </p>
          </div>
        )}

        {/* Launch Button */}
        {stage >= 2 && (
          <button
            className="btn-launch animate-scale-up"
            style={{ animationDelay: '0.7s' }}
            onClick={onComplete}
          >
            Let's Go! 🚀
          </button>
        )}

        {/* Floating hearts and stars */}
        <div className="floating-decorations">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="floating-emoji"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                fontSize: `${15 + Math.random() * 20}px`,
                opacity: 0.3
              }}
            >
              {['💕', '⭐', '✨', '🎉', '💜', '👑'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .final-celebration {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .floating-decorations {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .floating-emoji {
          position: absolute;
          bottom: -50px;
          animation: float-up-final linear infinite;
        }

        @keyframes float-up-final {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
          }
        }

        .celebration-content {
          max-width: 800px;
          width: 100%;
          z-index: 1;
        }

        .celebration-hero {
          text-align: center;
          margin-bottom: 40px;
          opacity: 0;
          transition: opacity 800ms;
        }

        .celebration-hero.show {
          opacity: 1;
        }

        .celebration-title {
          font-family: 'Fredoka One', cursive;
          font-size: 48px;
          color: #FF1493;
          margin: 25px 0 15px;
          text-shadow: 2px 2px 0 rgba(147, 112, 219, 0.3);
        }

        .celebration-message {
          font-family: 'Quicksand', sans-serif;
          font-size: 22px;
          color: #9370DB;
          font-weight: 600;
        }

        .completion-summary {
          background: white;
          border-radius: 25px;
          padding: 30px;
          box-shadow: 0 15px 50px rgba(255, 105, 180, 0.3);
          margin-bottom: 30px;
        }

        .summary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }

        .summary-header h3 {
          font-family: 'Fredoka One', cursive;
          font-size: 20px;
          color: #FF1493;
          margin: 0;
        }

        .completion-badge {
          background: linear-gradient(135deg, #4CAF50, #8BC34A);
          border-radius: 50px;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        }

        .completion-number {
          font-family: 'Fredoka One', cursive;
          font-size: 24px;
          color: white;
        }

        .completion-label {
          font-family: 'Quicksand', sans-serif;
          font-size: 12px;
          color: white;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .summary-stats {
          display: grid;
          gap: 15px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: #f9f9f9;
          border-radius: 12px;
          transition: all 300ms;
        }

        .stat-item.completed {
          background: linear-gradient(135deg, #E8F5E9, #C8E6C9);
        }

        .stat-icon {
          font-size: 28px;
          flex-shrink: 0;
        }

        .stat-text {
          flex: 1;
        }

        .stat-title {
          font-family: 'Fredoka One', cursive;
          font-size: 14px;
          color: #333;
          margin-bottom: 3px;
        }

        .stat-detail {
          font-family: 'Quicksand', sans-serif;
          font-size: 12px;
          color: #666;
        }

        .next-steps {
          background: linear-gradient(135deg, #FFF5F7, #F0E6FF);
          border-radius: 20px;
          padding: 25px;
          margin-bottom: 25px;
        }

        .next-steps-title {
          font-family: 'Fredoka One', cursive;
          font-size: 20px;
          color: #FF1493;
          margin: 0 0 20px 0;
          text-align: center;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .step-card {
          background: white;
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          transition: all 300ms;
        }

        .step-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(255, 105, 180, 0.25);
        }

        .step-icon {
          font-size: 36px;
          margin-bottom: 10px;
        }

        .step-title {
          font-family: 'Fredoka One', cursive;
          font-size: 14px;
          color: #FF1493;
          margin-bottom: 6px;
        }

        .step-description {
          font-family: 'Quicksand', sans-serif;
          font-size: 12px;
          color: #666;
          line-height: 1.4;
        }

        .final-message {
          background: linear-gradient(135deg, #9370DB, #FF69B4);
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          color: white;
          margin-bottom: 30px;
          box-shadow: 0 10px 40px rgba(147, 112, 219, 0.4);
        }

        .message-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }

        .message-title {
          font-family: 'Fredoka One', cursive;
          font-size: 28px;
          margin: 0 0 15px 0;
        }

        .message-text {
          font-family: 'Quicksand', sans-serif;
          font-size: 16px;
          line-height: 1.7;
          margin: 0;
          opacity: 0.95;
        }

        .btn-launch {
          width: 100%;
          max-width: 400px;
          display: block;
          margin: 0 auto;
          background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
          color: white;
          border: none;
          padding: 22px 50px;
          border-radius: 50px;
          font-size: 24px;
          font-weight: bold;
          font-family: 'Fredoka One', cursive;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(255, 215, 61, 0.5);
          transition: all 300ms;
          position: relative;
          overflow: hidden;
        }

        .btn-launch::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 600ms, height 600ms;
        }

        .btn-launch:hover::before {
          width: 400px;
          height: 400px;
        }

        .btn-launch:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 15px 45px rgba(255, 215, 61, 0.6);
        }

        .btn-launch:active {
          transform: translateY(-2px) scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default FinalCelebration;
