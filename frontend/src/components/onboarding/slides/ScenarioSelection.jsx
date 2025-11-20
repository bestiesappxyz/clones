import React, { useState } from 'react';
import { DateScenario, WalkingScenario, PartyScenario } from '../SVGGraphics';

const scenarios = [
  {
    id: 'date',
    icon: DateScenario,
    title: 'First Dates',
    description: 'Meeting someone new — stay connected while you get to know them',
    color: '#FF69B4',
    emoji: '💕'
  },
  {
    id: 'walking',
    icon: WalkingScenario,
    title: 'Walking Home',
    description: 'Late nights, quiet streets — your besties walk with you',
    color: '#9370DB',
    emoji: '🚶‍♀️'
  },
  {
    id: 'party',
    icon: PartyScenario,
    title: 'Nights Out',
    description: 'Dance, laugh, have fun — with backup just a tap away',
    color: '#FFB6C1',
    emoji: '🎉'
  },
  {
    id: 'travel',
    icon: null,
    title: 'Solo Adventures',
    description: 'Explore the world fearlessly with your circle by your side',
    color: '#DDA0DD',
    emoji: '✈️'
  },
  {
    id: 'rideshare',
    icon: null,
    title: 'Getting Home',
    description: 'Ubers, taxis, late night rides — share your journey',
    color: '#FF1493',
    emoji: '🚗'
  },
  {
    id: 'other',
    icon: null,
    title: 'Everyday Moments',
    description: 'Whenever you want that extra peace of mind',
    color: '#9370DB',
    emoji: '🛡️'
  }
];

const ScenarioSelection = ({ onNext, updateUserData, particleSystem, isActive }) => {
  const [selected, setSelected] = useState([]);

  const toggleScenario = (scenarioId) => {
    if (selected.includes(scenarioId)) {
      setSelected(selected.filter(id => id !== scenarioId));
    } else {
      setSelected([...selected, scenarioId]);

      // Particle burst for selection
      if (particleSystem) {
        const card = document.querySelector(`[data-scenario="${scenarioId}"]`);
        if (card) {
          const rect = card.getBoundingClientRect();
          particleSystem.burst(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            20,
            'star'
          );
          particleSystem.start();
        }
      }
    }
  };

  const handleContinue = () => {
    updateUserData({ selectedScenarios: selected });

    if (particleSystem) {
      // Celebration for making selections
      particleSystem.burst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        50,
        'heart'
      );
      particleSystem.start();
    }

    onNext(null, 'flip');
  };

  return (
    <div className="scenario-selection">
      <div className="scenario-content">
        <h2 className="scenario-title animate-slide-up">
          When do you want us by your side?
        </h2>
        <p className="scenario-subtitle animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Choose the moments that matter to you — you can always add more later 💜
        </p>

        <div className="scenarios-grid">
          {scenarios.map((scenario, index) => {
            const isSelected = selected.includes(scenario.id);
            const Icon = scenario.icon;

            return (
              <div
                key={scenario.id}
                data-scenario={scenario.id}
                className={`scenario-card animate-scale-up ${isSelected ? 'selected' : ''}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  borderColor: isSelected ? scenario.color : '#e0e0e0'
                }}
                onClick={() => toggleScenario(scenario.id)}
              >
                {/* Checkmark */}
                <div className={`scenario-check ${isSelected ? 'checked' : ''}`}>
                  {isSelected && <span>✓</span>}
                </div>

                {/* Icon/Illustration */}
                <div className="scenario-icon">
                  {Icon ? (
                    <Icon size={100} />
                  ) : (
                    <div className="scenario-emoji" style={{ fontSize: '60px' }}>
                      {scenario.emoji}
                    </div>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="scenario-card-title" style={{ color: scenario.color }}>
                  {scenario.title}
                </h3>
                <p className="scenario-card-description">
                  {scenario.description}
                </p>

                {/* Selection Ripple */}
                {isSelected && (
                  <div
                    className="selection-ripple"
                    style={{ borderColor: scenario.color }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="scenario-footer">
          <button
            className={`btn-continue ${selected.length === 0 ? 'disabled' : ''}`}
            onClick={handleContinue}
            disabled={selected.length === 0}
          >
            {selected.length === 0
              ? 'Pick what resonates with you'
              : selected.length === 1
              ? 'Perfect, let\'s continue!'
              : `Love it! ${selected.length} scenarios selected`
            }
            {selected.length > 0 && <span className="btn-arrow">→</span>}
          </button>

          <p className="skip-hint" onClick={() => onNext()}>
            I'll choose later →
          </p>
        </div>
      </div>

      <style jsx>{`
        .scenario-selection {
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 20px;
          padding-top: 60px;
          padding-bottom: 40px;
          overflow-y: auto;
        }

        .scenario-content {
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
        }

        .scenario-title {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(24px, 7vw, 36px);
          color: #FF1493;
          text-align: center;
          margin-bottom: 8px;
          line-height: 1.2;
          padding: 0 10px;
        }

        .scenario-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(14px, 3.5vw, 16px);
          color: #666;
          text-align: center;
          margin-bottom: 28px;
          line-height: 1.6;
          padding: 0 10px;
        }

        .scenarios-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          margin-bottom: 28px;
        }

        .scenario-card {
          background: white;
          border: 3px solid #e0e0e0;
          border-radius: 16px;
          padding: 20px;
          cursor: pointer;
          transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          min-height: 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          -webkit-tap-highlight-color: transparent;
        }

        .scenario-card:active {
          transform: scale(0.98);
        }

        .scenario-card.selected {
          border-width: 3px;
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
        }

        .scenario-check {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 28px;
          height: 28px;
          border: 2px solid #ddd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          transition: all 300ms;
          z-index: 2;
        }

        .scenario-check.checked {
          background: linear-gradient(135deg, #9370DB, #FF69B4);
          border-color: transparent;
          transform: scale(1.15) rotate(360deg);
        }

        .scenario-check.checked span {
          color: white;
          font-weight: bold;
          font-size: 16px;
        }

        .scenario-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 12px;
          flex-shrink: 0;
        }

        .scenario-emoji {
          font-size: 48px;
          line-height: 1;
        }

        .scenario-card-title {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(17px, 4vw, 20px);
          margin-bottom: 6px;
          text-align: center;
          line-height: 1.2;
        }

        .scenario-card-description {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(13px, 3vw, 14px);
          color: #666;
          text-align: center;
          line-height: 1.5;
          margin: 0;
          padding: 0 8px;
        }

        .selection-ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 50px;
          height: 50px;
          border: 3px solid;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: ripple 1.5s ease-out infinite;
          pointer-events: none;
        }

        @keyframes ripple {
          0% {
            width: 50px;
            height: 50px;
            opacity: 1;
          }
          100% {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }

        .scenario-footer {
          text-align: center;
          margin-top: 8px;
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
          margin-bottom: 12px;
          -webkit-tap-highlight-color: transparent;
          min-height: 52px;
          width: 100%;
          max-width: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-continue:active:not(.disabled) {
          transform: translateY(2px) scale(0.98);
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
        }

        .btn-continue.disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: linear-gradient(135deg, #ccc 0%, #aaa 100%);
        }

        .btn-arrow {
          font-size: 18px;
          transition: transform 300ms;
        }

        .skip-hint {
          font-family: 'Quicksand', sans-serif;
          color: #9370DB;
          cursor: pointer;
          font-size: 14px;
          margin: 0;
          padding: 8px;
          transition: all 200ms;
          -webkit-tap-highlight-color: transparent;
        }

        .skip-hint:active {
          color: #FF69B4;
          transform: scale(0.98);
        }

        /* Tablet and up */
        @media (min-width: 600px) {
          .scenarios-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .scenario-card {
            min-height: 160px;
          }

          .scenario-emoji {
            font-size: 56px;
          }
        }

        /* Desktop */
        @media (min-width: 900px) {
          .scenarios-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }

          .scenario-card {
            padding: 25px;
          }

          .scenario-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(255, 105, 180, 0.25);
          }

          .scenario-card.selected:hover {
            transform: translateY(-4px) scale(1.02);
          }

          .btn-continue {
            width: auto;
            min-width: 280px;
          }

          .btn-continue:hover:not(.disabled) {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 12px 35px rgba(255, 105, 180, 0.5);
          }

          .btn-continue:hover .btn-arrow {
            transform: translateX(4px);
          }

          .skip-hint:hover {
            color: #FF69B4;
            text-decoration: underline;
          }
        }
      `}</style>
    </div>
  );
};

export default ScenarioSelection;
