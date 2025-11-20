import React, { useState } from 'react';
import { FriendsCircle } from '../SVGGraphics';

const AddFirstBestie = ({ onNext, updateUserData, particleSystem, unlockAchievement, awardXP }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleAddBestie = () => {
    if (!phone.replace(/\D/g, '').length >= 10 || !name.trim()) return;

    // Massive celebration!
    if (particleSystem) {
      // Multiple bursts
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          particleSystem.burst(x, y, 40, ['heart', 'star', 'sparkle'][i % 3]);
        }, i * 150);
      }
      particleSystem.start();
    }

    setShowSuccess(true);
    updateUserData({ firstBestieAdded: true });
    unlockAchievement('first_bestie', 'Squad Goals!', 'Added your first bestie');
    awardXP(50);

    setTimeout(() => {
      onNext(null, 'explode');
    }, 3000);
  };

  const handleSkip = () => {
    onNext();
  };

  if (showSuccess) {
    return (
      <div className="add-bestie success-view">
        <div className="success-content">
          <div className="success-hearts">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="floating-heart-success"
                style={{
                  left: `${10 + i * 10}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${2 + Math.random()}s`
                }}
              >
                💕
              </div>
            ))}
          </div>

          <div className="success-icon animate-scale-up">
            <div className="success-circle">
              <span className="success-checkmark">✓</span>
            </div>
          </div>

          <h2 className="success-title">Amazing! 🎉</h2>
          <p className="success-message">
            {name} is now your first bestie!
          </p>

          <div className="bestie-added-card">
            <div className="bestie-avatar">{name[0]?.toUpperCase()}</div>
            <div className="bestie-details">
              <div className="bestie-name">{name}</div>
              <div className="bestie-phone">{phone}</div>
            </div>
            <div className="bestie-badge">
              <span className="badge-icon">⭐</span>
              <span className="badge-text">Bestie #1</span>
            </div>
          </div>

          <p className="success-next">
            Moving to the next step...
          </p>
        </div>

        <style jsx>{`
          .success-view {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .success-hearts {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
          }

          .floating-heart-success {
            position: absolute;
            bottom: -50px;
            font-size: 30px;
            animation: float-up-success linear infinite;
          }

          @keyframes float-up-success {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) rotate(360deg);
              opacity: 0;
            }
          }

          .success-content {
            text-align: center;
            max-width: 500px;
            z-index: 1;
          }

          .success-circle {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: linear-gradient(135deg, #4CAF50, #8BC34A);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 25px;
            box-shadow: 0 10px 40px rgba(76, 175, 80, 0.4);
          }

          .success-checkmark {
            font-size: 70px;
            color: white;
          }

          .success-title {
            font-family: 'Fredoka One', cursive;
            font-size: 48px;
            color: #4CAF50;
            margin-bottom: 15px;
          }

          .success-message {
            font-family: 'Quicksand', sans-serif;
            font-size: 20px;
            color: #666;
            margin-bottom: 30px;
          }

          .bestie-added-card {
            background: white;
            border-radius: 20px;
            padding: 25px;
            box-shadow: 0 10px 40px rgba(255, 105, 180, 0.3);
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 25px;
            animation: card-pop 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          @keyframes card-pop {
            0% {
              transform: scale(0);
            }
            100% {
              transform: scale(1);
            }
          }

          .bestie-avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #9370DB, #FF69B4);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Fredoka One', cursive;
            font-size: 28px;
            color: white;
            flex-shrink: 0;
          }

          .bestie-details {
            flex: 1;
            text-align: left;
          }

          .bestie-name {
            font-family: 'Fredoka One', cursive;
            font-size: 18px;
            color: #333;
            margin-bottom: 4px;
          }

          .bestie-phone {
            font-family: 'Quicksand', sans-serif;
            font-size: 14px;
            color: #999;
          }

          .bestie-badge {
            background: linear-gradient(135deg, #FFD93D, #FFA500);
            padding: 8px 16px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 6px;
            flex-shrink: 0;
          }

          .badge-icon {
            font-size: 18px;
          }

          .badge-text {
            font-family: 'Fredoka One', cursive;
            font-size: 12px;
            color: white;
          }

          .success-next {
            font-family: 'Quicksand', sans-serif;
            font-size: 14px;
            color: #9370DB;
            animation: pulse 1.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="add-bestie">
      <div className="bestie-content">
        <h2 className="bestie-title animate-slide-up">
          Add Your First Bestie 👯‍♀️
        </h2>
        <p className="bestie-subtitle animate-slide-up" style={{ animationDelay: '0.1s' }}>
          The most important step! Your safety network starts here
        </p>

        {/* Illustration */}
        <div className="bestie-illustration" style={{ animationDelay: '0.2s' }}>
          <FriendsCircle size={200} />
        </div>

        {/* Input Form */}
        <div className="bestie-form animate-scale-up" style={{ animationDelay: '0.3s' }}>
          <div className="form-header">
            <h3 className="form-title">Invite Your First Bestie</h3>
            <p className="form-subtitle">They'll get a text invitation to join your safety circle</p>
          </div>

          <div className="input-group">
            <label className="input-label">
              <span className="label-icon">👤</span>
              <span className="label-text">Their Name</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Sarah"
              maxLength={30}
            />
          </div>

          <div className="input-group">
            <label className="input-label">
              <span className="label-icon">📱</span>
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="tel"
              className="form-input"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="0412 345 678"
              maxLength={12}
            />
          </div>

          <button
            className={`btn-add-bestie ${(!name.trim() || phone.replace(/\D/g, '').length < 10) ? 'disabled' : ''}`}
            onClick={handleAddBestie}
            disabled={!name.trim() || phone.replace(/\D/g, '').length < 10}
          >
            Add {name.trim() ? name.split(' ')[0] : 'Bestie'} 💜
          </button>
        </div>

        {/* Why It Matters */}
        <div className="why-matters">
          <div className="why-header">
            <span className="why-icon">💡</span>
            <span className="why-title">Why this matters</span>
          </div>
          <div className="why-points">
            {[
              'You need at least 1 bestie to create check-ins',
              'They\'ll be notified if you miss a check-in',
              'You can add more besties later (up to 5 featured)'
            ].map((point, i) => (
              <div key={i} className="why-point">
                <span className="point-dot">•</span>
                <span className="point-text">{point}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="skip-text" onClick={handleSkip}>
          I'll do this later →
        </p>
      </div>

      <style jsx>{`
        .add-bestie {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
        }

        .bestie-content {
          max-width: 600px;
          width: 100%;
        }

        .bestie-title {
          font-family: 'Fredoka One', cursive;
          font-size: 36px;
          color: #FF1493;
          text-align: center;
          margin-bottom: 10px;
        }

        .bestie-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: 18px;
          color: #9370DB;
          text-align: center;
          margin-bottom: 25px;
          font-weight: 600;
        }

        .bestie-illustration {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .bestie-form {
          background: white;
          border-radius: 25px;
          padding: 35px;
          box-shadow: 0 10px 40px rgba(255, 105, 180, 0.2);
          margin-bottom: 25px;
        }

        .form-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .form-title {
          font-family: 'Fredoka One', cursive;
          font-size: 22px;
          color: #FF1493;
          margin: 0 0 8px 0;
        }

        .form-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          color: #999;
          margin: 0;
        }

        .input-group {
          margin-bottom: 25px;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .label-icon {
          font-size: 18px;
        }

        .label-text {
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #666;
        }

        .form-input {
          width: 100%;
          padding: 15px 20px;
          font-family: 'Quicksand', sans-serif;
          font-size: 16px;
          border: 2px solid #f0f0f0;
          border-radius: 15px;
          transition: all 300ms;
          background: #f9f9f9;
        }

        .form-input:focus {
          outline: none;
          border-color: #FF69B4;
          background: white;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.2);
        }

        .btn-add-bestie {
          width: 100%;
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
        }

        .btn-add-bestie:hover:not(.disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 105, 180, 0.5);
        }

        .btn-add-bestie.disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #ccc;
        }

        .why-matters {
          background: linear-gradient(135deg, #FFF9E6, #FFE8CC);
          border: 2px solid #FFD93D;
          border-radius: 15px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .why-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .why-icon {
          font-size: 24px;
        }

        .why-title {
          font-family: 'Fredoka One', cursive;
          font-size: 16px;
          color: #FF8C00;
        }

        .why-points {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .why-point {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }

        .point-dot {
          color: #FFD93D;
          font-size: 20px;
          line-height: 1.5;
        }

        .point-text {
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          color: #666;
          line-height: 1.5;
          flex: 1;
        }

        .skip-text {
          text-align: center;
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          color: #9370DB;
          cursor: pointer;
          margin: 0;
        }

        .skip-text:hover {
          color: #FF69B4;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default AddFirstBestie;
