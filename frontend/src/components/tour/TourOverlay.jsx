import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Interactive Tour Overlay System
 * Shows users the ACTUAL app interface with highlights and tooltips
 */
const TourOverlay = ({ steps, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [highlightRect, setHighlightRect] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const navigate = useNavigate();
  const observerRef = useRef(null);

  const currentStepData = steps[currentStep];

  // Update highlight position when element changes or window resizes
  useEffect(() => {
    if (!currentStepData || !isVisible) return;

    const updateHighlight = () => {
      const element = document.querySelector(currentStepData.element);
      if (element) {
        const rect = element.getBoundingClientRect();
        setHighlightRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        });

        // Calculate tooltip position
        calculateTooltipPosition(rect);
      } else {
        // Element not found, wait a bit and try again
        setTimeout(updateHighlight, 100);
      }
    };

    updateHighlight();
    window.addEventListener('resize', updateHighlight);
    window.addEventListener('scroll', updateHighlight);

    // Observe DOM changes in case elements are dynamically added
    observerRef.current = new MutationObserver(updateHighlight);
    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });

    return () => {
      window.removeEventListener('resize', updateHighlight);
      window.removeEventListener('scroll', updateHighlight);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [currentStep, currentStepData, isVisible]);

  // Navigate to page if needed for this step
  useEffect(() => {
    if (currentStepData && currentStepData.path) {
      navigate(currentStepData.path);
      // Wait for navigation to complete
      setTimeout(() => {
        // Scroll element into view
        const element = document.querySelector(currentStepData.element);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [currentStep, currentStepData, navigate]);

  const calculateTooltipPosition = (elementRect) => {
    const isMobile = window.innerWidth < 768;
    const tooltipWidth = isMobile ? window.innerWidth - 40 : 400;
    const tooltipHeight = 200; // Approximate

    let top, left;

    if (isMobile) {
      // Mobile: Always position at bottom of screen
      top = window.innerHeight - 280;
      left = 20;
    } else {
      // Desktop: Position based on available space
      const spaceBelow = window.innerHeight - elementRect.bottom;
      const spaceAbove = elementRect.top;
      const spaceRight = window.innerWidth - elementRect.right;
      const spaceLeft = elementRect.left;

      if (spaceBelow > tooltipHeight + 20) {
        // Position below
        top = elementRect.bottom + 20;
        left = elementRect.left + (elementRect.width / 2) - (tooltipWidth / 2);
      } else if (spaceAbove > tooltipHeight + 20) {
        // Position above
        top = elementRect.top - tooltipHeight - 20;
        left = elementRect.left + (elementRect.width / 2) - (tooltipWidth / 2);
      } else if (spaceRight > tooltipWidth + 20) {
        // Position right
        top = elementRect.top + (elementRect.height / 2) - (tooltipHeight / 2);
        left = elementRect.right + 20;
      } else if (spaceLeft > tooltipWidth + 20) {
        // Position left
        top = elementRect.top + (elementRect.height / 2) - (tooltipHeight / 2);
        left = elementRect.left - tooltipWidth - 20;
      } else {
        // Fallback: center on screen
        top = window.innerHeight / 2 - tooltipHeight / 2;
        left = window.innerWidth / 2 - tooltipWidth / 2;
      }

      // Keep within viewport bounds
      left = Math.max(20, Math.min(left, window.innerWidth - tooltipWidth - 20));
      top = Math.max(20, Math.min(top, window.innerHeight - tooltipHeight - 20));
    }

    setTooltipPosition({ top, left });
  };

  const handleNext = () => {
    if (currentStepData.action) {
      // Execute action before moving to next step
      currentStepData.action();
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    if (onComplete) {
      onComplete();
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    if (onSkip) {
      onSkip();
    }
  };

  if (!isVisible || !currentStepData) return null;

  return (
    <>
      {/* Dark overlay with hole for highlighted element */}
      <div className="tour-overlay">
        <svg className="tour-overlay-svg">
          <defs>
            <mask id="tour-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {highlightRect && (
                <rect
                  x={highlightRect.left - 8}
                  y={highlightRect.top - 8}
                  width={highlightRect.width + 16}
                  height={highlightRect.height + 16}
                  rx="12"
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.75)"
            mask="url(#tour-mask)"
          />
        </svg>

        {/* Pulsing border around highlighted element */}
        {highlightRect && (
          <div
            className="tour-highlight-border"
            style={{
              top: highlightRect.top - 8,
              left: highlightRect.left - 8,
              width: highlightRect.width + 16,
              height: highlightRect.height + 16
            }}
          />
        )}

        {/* Tooltip */}
        <div
          className="tour-tooltip"
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left
          }}
        >
          {/* Step counter */}
          <div className="tour-step-counter">
            Step {currentStep + 1} of {steps.length}
          </div>

          {/* Emoji/Icon */}
          {currentStepData.emoji && (
            <div className="tour-emoji">{currentStepData.emoji}</div>
          )}

          {/* Title */}
          <h3 className="tour-title">{currentStepData.title}</h3>

          {/* Description */}
          <p className="tour-description">{currentStepData.description}</p>

          {/* Optional tip */}
          {currentStepData.tip && (
            <div className="tour-tip">
              <span className="tour-tip-icon">💡</span>
              <span className="tour-tip-text">{currentStepData.tip}</span>
            </div>
          )}

          {/* Actions */}
          <div className="tour-actions">
            <button className="tour-btn tour-btn-skip" onClick={handleSkip}>
              Skip Tour
            </button>

            <div className="tour-nav-buttons">
              {currentStep > 0 && (
                <button className="tour-btn tour-btn-back" onClick={handleBack}>
                  ← Back
                </button>
              )}

              <button className="tour-btn tour-btn-next" onClick={handleNext}>
                {currentStep < steps.length - 1 ? (
                  <>Next →</>
                ) : (
                  <>Finish! 🎉</>
                )}
              </button>
            </div>
          </div>

          {/* Progress dots */}
          <div className="tour-progress-dots">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`tour-progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .tour-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10000;
          pointer-events: none;
        }

        .tour-overlay-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: auto;
        }

        .tour-highlight-border {
          position: fixed;
          border: 3px solid #FF69B4;
          border-radius: 12px;
          pointer-events: none;
          animation: tour-pulse 2s ease-in-out infinite;
          box-shadow: 0 0 20px rgba(255, 105, 180, 0.6),
                      inset 0 0 20px rgba(255, 105, 180, 0.3);
        }

        @keyframes tour-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.02);
          }
        }

        .tour-tooltip {
          position: fixed;
          background: white;
          border-radius: 16px;
          padding: 24px;
          max-width: 400px;
          width: calc(100vw - 40px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          pointer-events: auto;
          z-index: 10001;
          animation: tour-tooltip-appear 0.3s ease-out;
        }

        @keyframes tour-tooltip-appear {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .tour-step-counter {
          font-family: 'Quicksand', sans-serif;
          font-size: 12px;
          color: #9370DB;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }

        .tour-emoji {
          font-size: 48px;
          text-align: center;
          margin-bottom: 12px;
          line-height: 1;
        }

        .tour-title {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(20px, 5vw, 24px);
          color: #FF1493;
          margin: 0 0 12px 0;
          line-height: 1.2;
        }

        .tour-description {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(14px, 3.5vw, 16px);
          color: #666;
          line-height: 1.6;
          margin: 0 0 16px 0;
        }

        .tour-tip {
          background: linear-gradient(135deg, #FFF9E6, #FFE8CC);
          border: 2px solid #FFD93D;
          border-radius: 12px;
          padding: 12px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 20px;
        }

        .tour-tip-icon {
          font-size: 20px;
          flex-shrink: 0;
          line-height: 1;
        }

        .tour-tip-text {
          font-family: 'Quicksand', sans-serif;
          font-size: 13px;
          color: #666;
          line-height: 1.5;
        }

        .tour-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .tour-nav-buttons {
          display: flex;
          gap: 12px;
        }

        .tour-btn {
          font-family: 'Quicksand', sans-serif;
          font-weight: 600;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 300ms;
          font-size: 15px;
          padding: 12px 24px;
          -webkit-tap-highlight-color: transparent;
        }

        .tour-btn-skip {
          background: transparent;
          color: #9370DB;
          text-decoration: underline;
          align-self: center;
          padding: 8px;
        }

        .tour-btn-skip:active {
          color: #FF69B4;
          transform: scale(0.98);
        }

        .tour-btn-back {
          background: #f0f0f0;
          color: #666;
          flex: 1;
        }

        .tour-btn-back:active {
          background: #e0e0e0;
          transform: scale(0.98);
        }

        .tour-btn-next {
          background: linear-gradient(135deg, #9370DB, #FF69B4);
          color: white;
          flex: 2;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
        }

        .tour-btn-next:active {
          transform: translateY(1px) scale(0.98);
          box-shadow: 0 2px 8px rgba(255, 105, 180, 0.3);
        }

        .tour-progress-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .tour-progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e0e0e0;
          cursor: pointer;
          transition: all 300ms;
        }

        .tour-progress-dot.active {
          background: linear-gradient(135deg, #9370DB, #FF69B4);
          width: 24px;
          border-radius: 4px;
        }

        .tour-progress-dot.completed {
          background: #4CAF50;
        }

        /* Desktop hover effects */
        @media (min-width: 768px) {
          .tour-btn-skip:hover {
            color: #FF69B4;
          }

          .tour-btn-back:hover {
            background: #e0e0e0;
            transform: translateY(-2px);
          }

          .tour-btn-next:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 105, 180, 0.5);
          }

          .tour-progress-dot:hover {
            transform: scale(1.3);
          }
        }

        /* Mobile adjustments */
        @media (max-width: 767px) {
          .tour-tooltip {
            bottom: 20px;
            left: 20px !important;
            top: auto !important;
            max-height: 60vh;
            overflow-y: auto;
          }
        }
      `}</style>
    </>
  );
};

export default TourOverlay;
