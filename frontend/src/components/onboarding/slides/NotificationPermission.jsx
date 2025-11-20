import React, { useState } from 'react';
import { PhoneNotification } from '../SVGGraphics';

const NotificationPermission = ({ onNext, updateUserData, particleSystem, awardXP, unlockAchievement }) => {
  const [permissionState, setPermissionState] = useState('prompt'); // 'prompt', 'requesting', 'granted', 'denied'

  const requestPermission = async () => {
    setPermissionState('requesting');

    try {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          setPermissionState('granted');
          updateUserData({ notificationsEnabled: true });

          // Reward the user!
          unlockAchievement('notifications_on', 'All Set!', 'Notifications enabled');
          awardXP(25);

          // Celebration
          if (particleSystem) {
            for (let i = 0; i < 5; i++) {
              setTimeout(() => {
                particleSystem.burst(
                  window.innerWidth / 2,
                  window.innerHeight / 2,
                  30,
                  ['heart', 'star', 'sparkle'][i % 3]
                );
                particleSystem.start();
              }, i * 200);
            }
          }

          // Show test notification
          setTimeout(() => {
            new Notification('Welcome to Besties! 💕', {
              body: 'You\'ll get helpful reminders like this one',
              icon: '/logo192.png',
              badge: '/logo192.png'
            });
          }, 1000);

        } else {
          setPermissionState('denied');
        }
      } else {
        setPermissionState('denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      setPermissionState('denied');
    }
  };

  const handleContinue = () => {
    if (particleSystem) {
      particleSystem.burst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        40,
        'star'
      );
      particleSystem.start();
    }

    onNext(null, 'slide');
  };

  return (
    <div className="notification-permission">
      <div className="notification-content">
        {permissionState === 'prompt' || permissionState === 'requesting' ? (
          <>
            <h2 className="notification-title animate-slide-up">
              We'll keep you in the loop 🔔
            </h2>
            <p className="notification-subtitle animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Gentle reminders when you need them most
            </p>

            <div className="notification-hero">
              <PhoneNotification size={150} />
            </div>

            <div className="notification-reasons">
              {[
                {
                  icon: '⏰',
                  title: 'Helpful Nudges',
                  description: 'Friendly reminders before your check-in time'
                },
                {
                  icon: '🔔',
                  title: 'Be There for Friends',
                  description: 'Know when someone in your circle needs you'
                },
                {
                  icon: '✨',
                  title: 'Stay Connected',
                  description: 'Quick updates without opening the app'
                }
              ].map((reason, i) => (
                <div
                  key={i}
                  className="reason-card animate-slide-up"
                  style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                >
                  <div className="reason-icon">{reason.icon}</div>
                  <div className="reason-content">
                    <h4 className="reason-title">{reason.title}</h4>
                    <p className="reason-description">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="notification-note">
              <div className="note-icon">💡</div>
              <p className="note-text">
                <strong>Good to know:</strong> Notifications help Besties work best for you.
                You're in control — customize them anytime in settings!
              </p>
            </div>

            <button
              className="btn-enable flying-element"
              onClick={requestPermission}
              disabled={permissionState === 'requesting'}
            >
              {permissionState === 'requesting' ? (
                <>
                  <span className="spinner" />
                  Setting up...
                </>
              ) : (
                <>
                  Turn on notifications
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>

            <p className="skip-text" onClick={handleContinue}>
              I'll do this later →
            </p>
          </>
        ) : permissionState === 'granted' ? (
          <>
            <div className="success-animation">
              <div className="success-checkmark">✓</div>
              <h2 className="success-title">You're all set! 🎉</h2>
              <p className="success-description">
                We'll send you helpful reminders just like this one
              </p>

              <div className="notification-preview">
                <div className="preview-phone">
                  <div className="preview-notification">
                    <div className="preview-app-icon">💕</div>
                    <div className="preview-content">
                      <div className="preview-app-name">Besties</div>
                      <div className="preview-title">Check-in Reminder</div>
                      <div className="preview-message">5 minutes until your check-in time!</div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn-continue" onClick={handleContinue}>
                Let's keep going
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="denied-state">
              <div className="denied-icon">😅</div>
              <h2 className="denied-title">That's okay!</h2>
              <p className="denied-description">
                You can always turn on notifications later in your settings
              </p>

              <div className="denied-steps">
                <h4>How to enable them later:</h4>
                <ol>
                  <li>Open your browser or device settings</li>
                  <li>Find Besties in your notifications</li>
                  <li>Turn notifications on</li>
                </ol>
              </div>

              <button className="btn-continue" onClick={handleContinue}>
                Continue for now
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .notification-permission {
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

        .notification-content {
          max-width: 700px;
          width: 100%;
          margin: 0 auto;
        }

        .notification-title {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(26px, 7vw, 36px);
          color: #FF1493;
          text-align: center;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .notification-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(16px, 4vw, 19px);
          color: #9370DB;
          text-align: center;
          margin-bottom: 24px;
          font-weight: 600;
          line-height: 1.4;
          padding: 0 10px;
        }

        .notification-hero {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .notification-reasons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .reason-card {
          background: white;
          border-radius: 14px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.12);
          transition: all 300ms;
          -webkit-tap-highlight-color: transparent;
        }

        .reason-card:active {
          transform: scale(0.98);
        }

        .reason-icon {
          font-size: 34px;
          flex-shrink: 0;
          line-height: 1;
        }

        .reason-content {
          flex: 1;
          min-width: 0;
        }

        .reason-title {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(16px, 4vw, 18px);
          color: #FF1493;
          margin: 0 0 4px 0;
          line-height: 1.2;
        }

        .reason-description {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(13px, 3vw, 14px);
          color: #666;
          margin: 0;
          line-height: 1.5;
        }

        .notification-note {
          background: linear-gradient(135deg, #FFF9E6, #FFE8CC);
          border: 2px solid #FFD93D;
          border-radius: 14px;
          padding: 14px;
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }

        .note-icon {
          font-size: 24px;
          flex-shrink: 0;
          line-height: 1;
        }

        .note-text {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(12px, 3vw, 13px);
          color: #666;
          margin: 0;
          line-height: 1.6;
        }

        .note-text strong {
          color: #333;
        }

        .btn-enable {
          background: linear-gradient(135deg, #9370DB 0%, #FF69B4 100%);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 50px;
          font-size: clamp(15px, 4vw, 17px);
          font-weight: bold;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
          transition: all 300ms;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 0 auto 12px;
          width: 100%;
          max-width: 320px;
          min-height: 52px;
          -webkit-tap-highlight-color: transparent;
        }

        .btn-enable:active:not(:disabled) {
          transform: translateY(2px) scale(0.98);
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
        }

        .btn-enable:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-arrow {
          font-size: 18px;
          transition: transform 300ms;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .skip-text {
          text-align: center;
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          color: #9370DB;
          cursor: pointer;
          margin: 0;
          padding: 8px;
          -webkit-tap-highlight-color: transparent;
        }

        .skip-text:active {
          color: #FF69B4;
          transform: scale(0.98);
        }

        /* Success State */
        .success-animation {
          text-align: center;
          padding: 0 10px;
        }

        .success-checkmark {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4CAF50, #8BC34A);
          color: white;
          font-size: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
          animation: checkmark-pop 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: 0 8px 30px rgba(76, 175, 80, 0.35);
          line-height: 1;
        }

        @keyframes checkmark-pop {
          0% {
            transform: scale(0) rotate(-180deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }

        .success-title {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(32px, 8vw, 42px);
          color: #4CAF50;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .success-description {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(15px, 4vw, 17px);
          color: #666;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .notification-preview {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 18px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .preview-phone {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 14px;
          padding: 14px;
        }

        .preview-notification {
          background: white;
          border-radius: 12px;
          padding: 14px;
          display: flex;
          gap: 10px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
          animation: slide-down 600ms ease-out;
        }

        @keyframes slide-down {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .preview-app-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #9370DB, #FF69B4);
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
          line-height: 1;
        }

        .preview-content {
          flex: 1;
          min-width: 0;
        }

        .preview-app-name {
          font-family: 'Quicksand', sans-serif;
          font-size: 10px;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
          line-height: 1;
        }

        .preview-title {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(13px, 3vw, 14px);
          color: #333;
          margin-bottom: 3px;
          line-height: 1.2;
        }

        .preview-message {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(12px, 3vw, 13px);
          color: #666;
          line-height: 1.4;
        }

        /* Denied State */
        .denied-state {
          text-align: center;
          padding: 0 10px;
        }

        .denied-icon {
          font-size: clamp(60px, 15vw, 80px);
          margin-bottom: 16px;
          line-height: 1;
        }

        .denied-title {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(28px, 7vw, 36px);
          color: #FF69B4;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .denied-description {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(15px, 4vw, 17px);
          color: #666;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .denied-steps {
          background: white;
          border-radius: 14px;
          padding: 18px;
          text-align: left;
          margin-bottom: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .denied-steps h4 {
          font-family: 'Fredoka One', cursive;
          font-size: clamp(15px, 3.5vw, 16px);
          color: #9370DB;
          margin: 0 0 12px 0;
          line-height: 1.2;
        }

        .denied-steps ol {
          font-family: 'Quicksand', sans-serif;
          font-size: clamp(13px, 3vw, 14px);
          color: #666;
          margin: 0;
          padding-left: 20px;
          line-height: 1.8;
        }

        .btn-continue {
          background: linear-gradient(135deg, #9370DB 0%, #FF69B4 100%);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 50px;
          font-size: clamp(15px, 4vw, 17px);
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
          max-width: 300px;
          min-height: 52px;
          -webkit-tap-highlight-color: transparent;
        }

        .btn-continue:active {
          transform: translateY(2px) scale(0.98);
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
        }

        /* Tablet and up */
        @media (min-width: 600px) {
          .notification-reasons {
            gap: 15px;
          }

          .reason-card {
            padding: 18px;
            gap: 16px;
          }

          .reason-icon {
            font-size: 38px;
          }

          .notification-note {
            padding: 16px;
            gap: 14px;
          }

          .note-icon {
            font-size: 28px;
          }

          .notification-preview {
            padding: 26px;
          }

          .preview-app-icon {
            width: 40px;
            height: 40px;
            font-size: 24px;
          }

          .success-checkmark {
            width: 120px;
            height: 120px;
            font-size: 70px;
          }
        }

        /* Desktop */
        @media (min-width: 900px) {
          .reason-card {
            padding: 20px;
            gap: 20px;
          }

          .reason-card:hover {
            transform: translateX(8px);
            box-shadow: 0 8px 25px rgba(255, 105, 180, 0.25);
          }

          .reason-icon {
            font-size: 40px;
          }

          .notification-note {
            padding: 15px;
            gap: 15px;
          }

          .note-icon {
            font-size: 30px;
          }

          .btn-enable {
            width: auto;
            min-width: 280px;
          }

          .btn-enable:hover:not(:disabled) {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 12px 35px rgba(255, 105, 180, 0.5);
          }

          .btn-enable:hover .btn-arrow {
            transform: translateX(4px);
          }

          .btn-continue {
            width: auto;
          }

          .btn-continue:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 12px 35px rgba(255, 105, 180, 0.5);
          }

          .btn-continue:hover .btn-arrow {
            transform: translateX(4px);
          }

          .skip-text:hover {
            color: #FF69B4;
            text-decoration: underline;
          }

          .notification-preview {
            padding: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationPermission;
