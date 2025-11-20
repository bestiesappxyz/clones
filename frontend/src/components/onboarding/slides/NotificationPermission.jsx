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
              Stay in the Loop 🔔
            </h2>
            <p className="notification-subtitle animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Notifications keep you safe
            </p>

            <div className="notification-hero">
              <PhoneNotification size={150} />
            </div>

            <div className="notification-reasons">
              {[
                {
                  icon: '⏰',
                  title: 'Timely Reminders',
                  description: 'Get notified before your check-in time'
                },
                {
                  icon: '🔔',
                  title: 'Safety Alerts',
                  description: 'Know when your besties need you'
                },
                {
                  icon: '✨',
                  title: 'Quick Updates',
                  description: 'Stay informed without opening the app'
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
                <strong>Pro tip:</strong> Notifications are crucial for the safety features to work properly.
                You can always customize them in settings!
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
                  Requesting...
                </>
              ) : (
                'Enable Notifications 🚀'
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
              <h2 className="success-title">Perfect! 🎉</h2>
              <p className="success-description">
                You're all set to receive notifications
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
                Continue 🎊
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="denied-state">
              <div className="denied-icon">😅</div>
              <h2 className="denied-title">No worries!</h2>
              <p className="denied-description">
                You can enable notifications anytime from your device settings
              </p>

              <div className="denied-steps">
                <h4>To enable later:</h4>
                <ol>
                  <li>Go to your browser/device settings</li>
                  <li>Find Besties in the notifications list</li>
                  <li>Turn notifications ON</li>
                </ol>
              </div>

              <button className="btn-continue" onClick={handleContinue}>
                Continue Anyway →
              </button>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .notification-permission {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .notification-content {
          max-width: 700px;
          width: 100%;
        }

        .notification-title {
          font-family: 'Fredoka One', cursive;
          font-size: 36px;
          color: #FF1493;
          text-align: center;
          margin-bottom: 10px;
        }

        .notification-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: 20px;
          color: #9370DB;
          text-align: center;
          margin-bottom: 30px;
          font-weight: 600;
        }

        .notification-hero {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .notification-reasons {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 25px;
        }

        .reason-card {
          background: white;
          border-radius: 15px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.15);
          transition: all 300ms;
        }

        .reason-card:hover {
          transform: translateX(10px);
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.25);
        }

        .reason-icon {
          font-size: 40px;
          flex-shrink: 0;
        }

        .reason-content {
          flex: 1;
        }

        .reason-title {
          font-family: 'Fredoka One', cursive;
          font-size: 18px;
          color: #FF1493;
          margin: 0 0 5px 0;
        }

        .reason-description {
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          color: #666;
          margin: 0;
        }

        .notification-note {
          background: linear-gradient(135deg, #FFF9E6, #FFE8CC);
          border: 2px solid #FFD93D;
          border-radius: 15px;
          padding: 15px;
          display: flex;
          gap: 15px;
          margin-bottom: 25px;
        }

        .note-icon {
          font-size: 30px;
          flex-shrink: 0;
        }

        .note-text {
          font-family: 'Quicksand', sans-serif;
          font-size: 13px;
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
          padding: 18px 40px;
          border-radius: 50px;
          font-size: 18px;
          font-weight: bold;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
          transition: all 300ms;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 0 auto 15px;
          min-width: 260px;
        }

        .btn-enable:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 105, 180, 0.5);
        }

        .btn-enable:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
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
          transition: all 200ms;
          margin: 0;
        }

        .skip-text:hover {
          color: #FF69B4;
          text-decoration: underline;
        }

        /* Success State */
        .success-animation {
          text-align: center;
        }

        .success-checkmark {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4CAF50, #8BC34A);
          color: white;
          font-size: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          animation: checkmark-pop 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: 0 10px 40px rgba(76, 175, 80, 0.4);
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
          font-size: 42px;
          color: #4CAF50;
          margin-bottom: 10px;
        }

        .success-description {
          font-family: 'Quicksand', sans-serif;
          font-size: 18px;
          color: #666;
          margin-bottom: 30px;
        }

        .notification-preview {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 30px;
        }

        .preview-phone {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 15px;
        }

        .preview-notification {
          background: white;
          border-radius: 12px;
          padding: 15px;
          display: flex;
          gap: 12px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
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
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #9370DB, #FF69B4);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
        }

        .preview-content {
          flex: 1;
        }

        .preview-app-name {
          font-family: 'Quicksand', sans-serif;
          font-size: 11px;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }

        .preview-title {
          font-family: 'Fredoka One', cursive;
          font-size: 14px;
          color: #333;
          margin-bottom: 3px;
        }

        .preview-message {
          font-family: 'Quicksand', sans-serif;
          font-size: 13px;
          color: #666;
        }

        /* Denied State */
        .denied-state {
          text-align: center;
        }

        .denied-icon {
          font-size: 80px;
          margin-bottom: 20px;
        }

        .denied-title {
          font-family: 'Fredoka One', cursive;
          font-size: 36px;
          color: #FF69B4;
          margin-bottom: 10px;
        }

        .denied-description {
          font-family: 'Quicksand', sans-serif;
          font-size: 18px;
          color: #666;
          margin-bottom: 30px;
        }

        .denied-steps {
          background: white;
          border-radius: 15px;
          padding: 20px;
          text-align: left;
          margin-bottom: 25px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .denied-steps h4 {
          font-family: 'Fredoka One', cursive;
          font-size: 16px;
          color: #9370DB;
          margin: 0 0 15px 0;
        }

        .denied-steps ol {
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          color: #666;
          margin: 0;
          padding-left: 20px;
          line-height: 1.8;
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

export default NotificationPermission;
