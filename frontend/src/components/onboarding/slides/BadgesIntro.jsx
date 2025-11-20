import React, { useState } from 'react';

const badges = [
  {
    id: 'first_checkin',
    icon: '🎯',
    name: 'First Step',
    description: 'Complete your first check-in',
    color: '#FF69B4',
    unlocked: false
  },
  {
    id: 'early_bird',
    icon: '🌅',
    name: 'Early Bird',
    description: 'Check in before 8 AM',
    color: '#FFD93D',
    unlocked: false
  },
  {
    id: 'night_owl',
    icon: '🦉',
    name: 'Night Owl',
    description: 'Check in after 10 PM',
    color: '#9370DB',
    unlocked: false
  },
  {
    id: 'squad_goals',
    icon: '👯‍♀️',
    name: 'Squad Goals',
    description: 'Add 5 besties to your circle',
    color: '#FF1493',
    unlocked: false
  },
  {
    id: 'safe_streak',
    icon: '🔥',
    name: 'Safety Streak',
    description: '7 days of safe check-ins',
    color: '#FF6B35',
    unlocked: false
  },
  {
    id: 'helpful_bestie',
    icon: '💝',
    name: 'Helpful Bestie',
    description: 'Respond to 10 bestie alerts',
    color: '#4CAF50',
    unlocked: false
  }
];

const BadgesIntro = ({ onNext, particleSystem }) => {
  const [selectedBadge, setSelectedBadge] = useState(null);

  const handleBadgeClick = (badge) => {
    setSelectedBadge(badge);

    if (particleSystem) {
      particleSystem.burst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        20,
        'star'
      );
      particleSystem.start();
    }
  };

  const handleContinue = () => {
    if (particleSystem) {
      badges.forEach((_, i) => {
        setTimeout(() => {
          particleSystem.burst(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight / 2,
            15,
            'star'
          );
        }, i * 100);
      });
      particleSystem.start();
    }

    onNext(null, 'slide');
  };

  return (
    <div className="badges-intro">
      <div className="badges-content">
        <h2 className="badges-title animate-slide-up">
          Earn Badges & Have Fun! 🏆
        </h2>
        <p className="badges-subtitle animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Safety can be rewarding and fun
        </p>

        {/* Badge Grid */}
        <div className="badges-grid">
          {badges.map((badge, index) => (
            <div
              key={badge.id}
              className={`badge-card ${selectedBadge?.id === badge.id ? 'selected' : ''} ${
                badge.unlocked ? 'unlocked' : 'locked'
              } animate-scale-up`}
              style={{
                animationDelay: `${0.2 + index * 0.1}s`,
                borderColor: selectedBadge?.id === badge.id ? badge.color : 'transparent'
              }}
              onClick={() => handleBadgeClick(badge)}
            >
              {/* Badge Icon */}
              <div
                className="badge-icon-container"
                style={{
                  background: badge.unlocked
                    ? `linear-gradient(135deg, ${badge.color}, ${badge.color}dd)`
                    : '#e0e0e0'
                }}
              >
                <div className={`badge-icon ${!badge.unlocked ? 'grayscale' : ''}`}>
                  {badge.icon}
                </div>

                {!badge.unlocked && <div className="badge-lock">🔒</div>}

                {selectedBadge?.id === badge.id && (
                  <div className="badge-glow" style={{ borderColor: badge.color }} />
                )}
              </div>

              {/* Badge Info */}
              <div className="badge-name" style={{ color: badge.unlocked ? badge.color : '#999' }}>
                {badge.name}
              </div>
              <div className="badge-description">{badge.description}</div>

              {/* Selection indicator */}
              {selectedBadge?.id === badge.id && (
                <div className="selection-ring" style={{ borderColor: badge.color }} />
              )}
            </div>
          ))}
        </div>

        {/* Selected Badge Detail */}
        {selectedBadge && (
          <div className="badge-detail animate-slide-up" style={{ borderColor: selectedBadge.color }}>
            <div
              className="detail-icon"
              style={{
                background: `linear-gradient(135deg, ${selectedBadge.color}, ${selectedBadge.color}dd)`
              }}
            >
              {selectedBadge.icon}
            </div>
            <div className="detail-info">
              <h3 className="detail-name" style={{ color: selectedBadge.color }}>
                {selectedBadge.name}
              </h3>
              <p className="detail-description">{selectedBadge.description}</p>
              <div className="detail-progress">
                <span className="progress-label">Progress:</span>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: '0%',
                      background: `linear-gradient(90deg, ${selectedBadge.color}, ${selectedBadge.color}dd)`
                    }}
                  />
                </div>
                <span className="progress-text">Not started yet</span>
              </div>
            </div>
          </div>
        )}

        {/* Fun Facts */}
        <div className="badges-facts">
          <div className="fact-item">
            <span className="fact-icon">⭐</span>
            <span className="fact-text">Collect badges as you use the app</span>
          </div>
          <div className="fact-item">
            <span className="fact-icon">🎁</span>
            <span className="fact-text">Some badges unlock special features</span>
          </div>
          <div className="fact-item">
            <span className="fact-icon">🏅</span>
            <span className="fact-text">Show off your achievements to besties</span>
          </div>
        </div>

        {/* Continue Button */}
        <button className="btn-continue flying-element" onClick={handleContinue}>
          Awesome! What's Next? 🚀
        </button>
      </div>

      <style jsx>{`
        .badges-intro {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
        }

        .badges-content {
          max-width: 900px;
          width: 100%;
        }

        .badges-title {
          font-family: 'Fredoka One', cursive;
          font-size: 36px;
          color: #FF1493;
          text-align: center;
          margin-bottom: 10px;
        }

        .badges-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: 18px;
          color: #9370DB;
          text-align: center;
          margin-bottom: 35px;
        }

        .badges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .badge-card {
          background: white;
          border-radius: 20px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
          border: 3px solid transparent;
          position: relative;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.1);
        }

        .badge-card:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 12px 30px rgba(255, 105, 180, 0.25);
        }

        .badge-card.selected {
          transform: scale(1.1);
          box-shadow: 0 15px 40px rgba(255, 105, 180, 0.35);
          z-index: 1;
        }

        .badge-icon-container {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 400ms;
        }

        .badge-card:hover .badge-icon-container {
          transform: rotate(10deg) scale(1.1);
        }

        .badge-icon {
          font-size: 40px;
          transition: all 300ms;
        }

        .badge-icon.grayscale {
          filter: grayscale(100%);
          opacity: 0.5;
        }

        .badge-lock {
          position: absolute;
          bottom: -5px;
          right: -5px;
          font-size: 20px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .badge-glow {
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          border: 3px solid;
          border-radius: 50%;
          animation: glow-pulse 1.5s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        .badge-name {
          font-family: 'Fredoka One', cursive;
          font-size: 14px;
          margin-bottom: 6px;
        }

        .badge-description {
          font-family: 'Quicksand', sans-serif;
          font-size: 11px;
          color: #999;
          line-height: 1.4;
        }

        .selection-ring {
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border: 3px solid;
          border-radius: 20px;
          animation: ring-pulse 1s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes ring-pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        .badge-detail {
          background: white;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 10px 40px rgba(255, 105, 180, 0.2);
          margin-bottom: 25px;
          display: flex;
          gap: 20px;
          border: 3px solid;
        }

        .detail-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 42px;
          flex-shrink: 0;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .detail-info {
          flex: 1;
        }

        .detail-name {
          font-family: 'Fredoka One', cursive;
          font-size: 22px;
          margin: 0 0 8px 0;
        }

        .detail-description {
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          color: #666;
          margin: 0 0 15px 0;
        }

        .detail-progress {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .progress-label {
          font-family: 'Quicksand', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #999;
        }

        .progress-bar {
          height: 8px;
          background: #f0f0f0;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 10px;
          transition: width 600ms ease-in-out;
        }

        .progress-text {
          font-family: 'Quicksand', sans-serif;
          font-size: 11px;
          color: #999;
        }

        .badges-facts {
          background: linear-gradient(135deg, #FFF5F7, #F0E6FF);
          border-radius: 15px;
          padding: 20px;
          margin-bottom: 25px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .fact-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .fact-icon {
          font-size: 24px;
        }

        .fact-text {
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          color: #666;
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

export default BadgesIntro;
