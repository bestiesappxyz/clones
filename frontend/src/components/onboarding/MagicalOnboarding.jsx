import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ParticleSystem, transitionEffects } from '../../utils/magicalAnimations';
import { XPBar } from './SVGGraphics';

// Import individual slides
import {
  WelcomeSplash,
  ScenarioSelection,
  HowItWorks,
  SafetyNetwork,
  NotificationPermission,
  ProfileSetup,
  AddFirstBestie,
  InteractiveDemo,
  BadgesIntro,
  FinalCelebration
} from './slides';

/**
 * Magical Onboarding Experience
 * A fully interactive, animated journey through the app
 */
const MagicalOnboarding = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // State management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userData, setUserData] = useState({
    displayName: '',
    photoURL: '',
    selectedScenarios: [],
    notificationsEnabled: false,
    firstBestieAdded: false
  });
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Refs
  const canvasRef = useRef(null);
  const particleSystemRef = useRef(null);
  const containerRef = useRef(null);

  // Define all slides
  const slides = [
    { component: WelcomeSplash, name: 'welcome', xpReward: 10 },
    { component: ScenarioSelection, name: 'scenarios', xpReward: 20 },
    { component: HowItWorks, name: 'how-it-works', xpReward: 15 },
    { component: SafetyNetwork, name: 'safety-network', xpReward: 15 },
    { component: NotificationPermission, name: 'notifications', xpReward: 25 },
    { component: ProfileSetup, name: 'profile', xpReward: 30 },
    { component: AddFirstBestie, name: 'first-bestie', xpReward: 50 },
    { component: InteractiveDemo, name: 'demo', xpReward: 40 },
    { component: BadgesIntro, name: 'badges', xpReward: 20 },
    { component: FinalCelebration, name: 'celebration', xpReward: 100 }
  ];

  // Initialize particle system
  useEffect(() => {
    if (canvasRef.current && !particleSystemRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particleSystemRef.current = new ParticleSystem(canvas, {
        particleCount: 50,
        colors: ['#FF69B4', '#9370DB', '#FFB6C1', '#DDA0DD', '#FF1493'],
        maxSize: 12,
        minSize: 4,
        speed: 3,
        gravity: 0.1
      });

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Calculate progress
  const progress = (currentSlide + 1) / slides.length;
  const xpProgress = (xp % 100) / 100;

  // Award XP and check for level up
  const awardXP = useCallback((amount) => {
    const newXP = xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;

    setXp(newXP);

    if (newLevel > level) {
      setLevel(newLevel);
      // Celebration for level up!
      if (particleSystemRef.current) {
        particleSystemRef.current.burst(
          window.innerWidth / 2,
          100,
          80,
          'star'
        );
        particleSystemRef.current.start();
      }

      // Play sound (if you have audio)
      playSound('levelup');
    }
  }, [xp, level]);

  // Unlock achievement
  const unlockAchievement = useCallback((achievementId, name, description) => {
    if (!achievements.includes(achievementId)) {
      setAchievements([...achievements, achievementId]);

      // Show achievement notification
      showAchievementToast(name, description);

      // Particle burst
      if (particleSystemRef.current) {
        particleSystemRef.current.burst(
          window.innerWidth / 2,
          window.innerHeight / 2,
          50,
          'sparkle'
        );
        particleSystemRef.current.start();
      }

      // Award bonus XP
      awardXP(15);
    }
  }, [achievements, awardXP]);

  // Play sound effect (placeholder)
  const playSound = (soundName) => {
    // Implement sound playing here
    // For now, just a placeholder
    console.log(`Playing sound: ${soundName}`);
  };

  // Show achievement toast
  const showAchievementToast = (name, description) => {
    // Create a custom toast notification
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <div class="achievement-content">
        <div class="achievement-icon">🏆</div>
        <div>
          <div class="achievement-title">Achievement Unlocked!</div>
          <div class="achievement-name">${name}</div>
          <div class="achievement-description">${description}</div>
        </div>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // Navigate to next slide with animation
  const nextSlide = async (flyingElement = null, transitionType = 'slide') => {
    if (isTransitioning || currentSlide >= slides.length - 1) return;

    setIsTransitioning(true);

    // Award XP for completing this slide
    const slideXP = slides[currentSlide].xpReward;
    awardXP(slideXP);

    // Check for milestone achievements
    if (currentSlide === 0) {
      unlockAchievement('first_step', 'First Step', 'Started your safety journey!');
    } else if (currentSlide === 4) {
      unlockAchievement('halfway', 'Halfway There', 'You\'re doing great!');
    } else if (currentSlide === 6 && userData.firstBestieAdded) {
      unlockAchievement('connected', 'Connected', 'Added your first bestie!');
    }

    const currentElement = containerRef.current?.querySelector(`[data-slide="${currentSlide}"]`);
    const nextElement = containerRef.current?.querySelector(`[data-slide="${currentSlide + 1}"]`);

    if (currentElement && nextElement && particleSystemRef.current) {
      // Different transition effects
      switch (transitionType) {
        case 'fly':
          if (flyingElement) {
            await transitionEffects.slideWithFlyingElement(
              currentElement,
              nextElement,
              flyingElement,
              'right'
            );
          } else {
            await transitionEffects.slideWithFlyingElement(
              currentElement,
              nextElement,
              currentElement.querySelector('.flying-element') || currentElement,
              'right'
            );
          }
          break;

        case 'flip':
          await transitionEffects.flip3D(currentElement, nextElement, 'y');
          break;

        case 'explode':
          await transitionEffects.explode(currentElement, nextElement, particleSystemRef.current);
          break;

        default:
          // Standard slide
          currentElement.style.transition = 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms';
          nextElement.style.transition = 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms';

          currentElement.style.transform = 'translateX(-100%)';
          currentElement.style.opacity = '0';

          nextElement.style.display = 'flex';
          nextElement.style.transform = 'translateX(0)';
          nextElement.style.opacity = '1';

          await new Promise(resolve => setTimeout(resolve, 600));
      }
    }

    setCurrentSlide(currentSlide + 1);
    setIsTransitioning(false);

    // Play transition sound
    playSound('transition');
  };

  // Go to previous slide
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Update user data
  const updateUserData = (updates) => {
    setUserData({ ...userData, ...updates });
  };

  // Complete onboarding
  const completeOnboarding = async () => {
    try {
      // Save onboarding data to Firestore
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        onboardingCompleted: true,
        displayName: userData.displayName || currentUser.displayName,
        photoURL: userData.photoURL || currentUser.photoURL,
        selectedScenarios: userData.selectedScenarios,
        onboardingXP: xp,
        onboardingLevel: level,
        achievements: achievements,
        onboardingCompletedAt: new Date()
      });

      // Final celebration!
      if (particleSystemRef.current) {
        // Massive confetti explosion
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            particleSystemRef.current.burst(
              Math.random() * window.innerWidth,
              Math.random() * window.innerHeight / 2,
              30,
              ['heart', 'star', 'sparkle', 'circle'][Math.floor(Math.random() * 4)]
            );
          }, i * 200);
        }
        particleSystemRef.current.start();
      }

      // Award final achievement
      unlockAchievement('onboarding_master', 'Onboarding Master', 'Completed the magical journey!');

      // Navigate to home after celebration
      setTimeout(() => {
        navigate('/');
      }, 5000);

    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  return (
    <div className="magical-onboarding">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="particle-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9998
        }}
      />

      {/* Progress Tracker */}
      <div className="onboarding-progress-header">
        <div className="progress-bar-container">
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${progress * 100}%`,
                transition: 'width 600ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          </div>
          <div className="progress-text">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>

        {/* XP Bar */}
        <div className="xp-bar-container">
          <XPBar progress={xpProgress} level={level} />
        </div>
      </div>

      {/* Slides Container */}
      <div ref={containerRef} className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={slide.name}
            data-slide={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              display: index === currentSlide ? 'flex' : 'none',
              opacity: index === currentSlide ? 1 : 0,
              transform: index === currentSlide ? 'translateX(0)' : 'translateX(100%)'
            }}
          >
            <slide.component
              onNext={nextSlide}
              onPrev={prevSlide}
              userData={userData}
              updateUserData={updateUserData}
              particleSystem={particleSystemRef.current}
              awardXP={awardXP}
              unlockAchievement={unlockAchievement}
              onComplete={index === slides.length - 1 ? completeOnboarding : null}
              isActive={index === currentSlide}
            />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="navigation-dots">
        {slides.map((slide, index) => (
          <div
            key={slide.name}
            className={`dot ${index === currentSlide ? 'active' : ''} ${index < currentSlide ? 'completed' : ''}`}
            onClick={() => {
              if (index < currentSlide) {
                setCurrentSlide(index);
              }
            }}
          >
            {index < currentSlide && <span className="checkmark">✓</span>}
          </div>
        ))}
      </div>

      {/* Back Button (hidden on first slide) */}
      {currentSlide > 0 && (
        <button
          className="onboarding-back-btn"
          onClick={prevSlide}
          disabled={isTransitioning}
        >
          ← Back
        </button>
      )}

      <style jsx>{`
        .magical-onboarding {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: linear-gradient(135deg, #FFF5F7 0%, #FFE8F0 50%, #F0E6FF 100%);
          position: relative;
        }

        .onboarding-progress-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 20px;
          box-shadow: 0 2px 20px rgba(255, 105, 180, 0.1);
        }

        .progress-bar-container {
          max-width: 600px;
          margin: 0 auto 15px;
          position: relative;
        }

        .progress-bar-bg {
          height: 8px;
          background: #f0f0f0;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #9370DB 0%, #FF69B4 50%, #FFD93D 100%);
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(255, 105, 180, 0.4);
          position: relative;
        }

        .progress-bar-fill::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .progress-text {
          text-align: center;
          margin-top: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #666;
          font-family: 'Quicksand', sans-serif;
        }

        .xp-bar-container {
          display: flex;
          justify-content: center;
        }

        .slides-container {
          width: 100%;
          height: 100%;
          position: relative;
          padding-top: 140px;
        }

        .slide {
          position: absolute;
          top: 140px;
          left: 0;
          right: 0;
          bottom: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 20px;
        }

        .navigation-dots {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 1000;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ddd;
          cursor: pointer;
          transition: all 300ms;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dot.active {
          width: 32px;
          border-radius: 8px;
          background: linear-gradient(90deg, #9370DB, #FF69B4);
          box-shadow: 0 2px 8px rgba(255, 105, 180, 0.4);
        }

        .dot.completed {
          background: #4CAF50;
          cursor: pointer;
        }

        .dot.completed:hover {
          transform: scale(1.2);
        }

        .checkmark {
          color: white;
          font-size: 8px;
          font-weight: bold;
        }

        .onboarding-back-btn {
          position: fixed;
          bottom: 30px;
          left: 30px;
          background: white;
          border: 2px solid #9370DB;
          color: #9370DB;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          transition: all 300ms;
          z-index: 1000;
        }

        .onboarding-back-btn:hover {
          background: #9370DB;
          color: white;
          transform: translateX(-5px);
        }

        .onboarding-back-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Achievement Toast */
        .achievement-toast {
          position: fixed;
          top: -200px;
          right: 30px;
          background: linear-gradient(135deg, #FFD93D 0%, #FFA500 100%);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          z-index: 10000;
          transition: all 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
          min-width: 300px;
        }

        .achievement-toast.show {
          top: 30px;
        }

        .achievement-content {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .achievement-icon {
          font-size: 40px;
          animation: bounce 1s infinite;
        }

        .achievement-title {
          font-size: 12px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .achievement-name {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin: 4px 0;
        }

        .achievement-description {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.7);
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default MagicalOnboarding;
