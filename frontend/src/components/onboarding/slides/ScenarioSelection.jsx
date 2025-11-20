import React, { useState } from 'react';
import { DateScenario, WalkingScenario, PartyScenario } from '../SVGGraphics';

const scenarios = [
  {
    id: 'date',
    icon: DateScenario,
    title: 'First Dates',
    description: 'Meeting someone new? Let your besties know you\'re safe',
    color: '#FF69B4',
    emoji: '💕'
  },
  {
    id: 'walking',
    icon: WalkingScenario,
    title: 'Walking Alone',
    description: 'Walking home at night or through quiet areas',
    color: '#9370DB',
    emoji: '🚶‍♀️'
  },
  {
    id: 'party',
    icon: PartyScenario,
    title: 'Nights Out',
    description: 'Clubbing, parties, or social events',
    color: '#FFB6C1',
    emoji: '🎉'
  },
  {
    id: 'travel',
    icon: null,
    title: 'Solo Travel',
    description: 'Exploring new places on your own',
    color: '#DDA0DD',
    emoji: '✈️'
  },
  {
    id: 'rideshare',
    icon: null,
    title: 'Rideshares',
    description: 'Taking an Uber, Lyft, or taxi alone',
    color: '#FF1493',
    emoji: '🚗'
  },
  {
    id: 'other',
    icon: null,
    title: 'Other Situations',
    description: 'Any time you want peace of mind',
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
          When would you use Besties?
        </h2>
        <p className="scenario-subtitle animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Select all that apply (you can change this later!)
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
              ? 'Select at least one'
              : `Continue with ${selected.length} scenario${selected.length > 1 ? 's' : ''} 🚀`
            }
          </button>

          <p className="skip-hint" onClick={() => onNext()}>
            Skip for now →
          </p>
        </div>
      </div>

      <style jsx>{`
        .scenario-selection {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .scenario-content {
          max-width: 900px;
          width: 100%;
        }

        .scenario-title {
          font-family: 'Fredoka One', cursive;
          font-size: 36px;
          color: #FF1493;
          text-align: center;
          margin-bottom: 10px;
        }

        .scenario-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: 18px;
          color: #666;
          text-align: center;
          margin-bottom: 40px;
        }

        .scenarios-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .scenario-card {
          background: white;
          border: 3px solid #e0e0e0;
          border-radius: 20px;
          padding: 25px;
          cursor: pointer;
          transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .scenario-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(255, 105, 180, 0.25);
        }

        .scenario-card.selected {
          transform: scale(1.05);
          box-shadow: 0 15px 40px rgba(255, 105, 180, 0.35);
        }

        .scenario-check {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 30px;
          height: 30px;
          border: 2px solid #ddd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          transition: all 300ms;
        }

        .scenario-check.checked {
          background: linear-gradient(135deg, #9370DB, #FF69B4);
          border-color: transparent;
          transform: scale(1.2) rotate(360deg);
        }

        .scenario-check.checked span {
          color: white;
          font-weight: bold;
          font-size: 18px;
        }

        .scenario-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 15px;
        }

        .scenario-card-title {
          font-family: 'Fredoka One', cursive;
          font-size: 20px;
          margin-bottom: 8px;
          text-align: center;
        }

        .scenario-card-description {
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          color: #666;
          text-align: center;
          line-height: 1.5;
          margin: 0;
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
          margin-bottom: 15px;
        }

        .btn-continue:hover:not(.disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 105, 180, 0.5);
        }

        .btn-continue.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #ccc;
        }

        .skip-hint {
          font-family: 'Quicksand', sans-serif;
          color: #9370DB;
          cursor: pointer;
          font-size: 14px;
          margin: 0;
          transition: all 200ms;
        }

        .skip-hint:hover {
          color: #FF69B4;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default ScenarioSelection;
