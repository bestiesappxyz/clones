import React, { useState, useRef } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const ProfileSetup = ({ onNext, updateUserData, userData, particleSystem, unlockAchievement }) => {
  const { currentUser } = useAuth();
  const [name, setName] = useState(userData.displayName || currentUser?.displayName || '');
  const [photo, setPhoto] = useState(userData.photoURL || currentUser?.photoURL || '');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingPhoto(true);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        setIsUploadingPhoto(false);

        // Celebration for uploading photo
        if (particleSystem) {
          particleSystem.burst(
            window.innerWidth / 2,
            window.innerHeight / 2,
            30,
            'star'
          );
          particleSystem.start();
        }

        unlockAchievement('lookin_good', 'Looking Good!', 'Added a profile photo');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    updateUserData({
      displayName: name,
      photoURL: photo
    });

    if (particleSystem) {
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
    <div className="profile-setup">
      <div className="profile-content">
        <h2 className="profile-title animate-slide-up">
          Let's Set Up Your Profile 👑
        </h2>
        <p className="profile-subtitle animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Help your besties recognize you
        </p>

        <div className="profile-card animate-scale-up" style={{ animationDelay: '0.2s' }}>
          {/* Photo Section */}
          <div className="photo-section">
            <div className="photo-container">
              {photo ? (
                <img
                  src={photo}
                  alt="Profile"
                  className="profile-photo"
                />
              ) : (
                <div className="photo-placeholder">
                  <span className="placeholder-icon">📸</span>
                  <span className="placeholder-text">Add Photo</span>
                </div>
              )}

              {/* Camera Button Overlay */}
              <button
                className="photo-button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingPhoto}
              >
                {isUploadingPhoto ? '⏳' : '📷'}
              </button>

              {/* Sparkle decoration */}
              <div className="photo-sparkle sparkle-1">✨</div>
              <div className="photo-sparkle sparkle-2">✨</div>
              <div className="photo-sparkle sparkle-3">✨</div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
          </div>

          {/* Name Input */}
          <div className="name-section">
            <label className="input-label">
              <span className="label-icon">✏️</span>
              <span className="label-text">Your Name</span>
            </label>

            <div className="input-wrapper">
              <input
                type="text"
                className="name-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                maxLength={50}
              />
              <div className="input-underline" />
            </div>

            <div className="input-hint">
              This is how your besties will see you
            </div>
          </div>

          {/* Preview Card */}
          <div className="preview-section">
            <div className="preview-label">Preview</div>
            <div className="preview-card">
              <div className="preview-photo">
                {photo ? (
                  <img src={photo} alt="Preview" />
                ) : (
                  <div className="preview-placeholder">
                    {name ? name[0]?.toUpperCase() : '?'}
                  </div>
                )}
              </div>
              <div className="preview-info">
                <div className="preview-name">{name || 'Your Name'}</div>
                <div className="preview-status">
                  <span className="status-dot" />
                  Active now
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="fun-facts">
          {[
            { icon: '🎨', text: 'Personalize your profile anytime' },
            { icon: '🔒', text: 'Only your besties can see your info' },
            { icon: '⚡', text: 'Quick setup, huge peace of mind' }
          ].map((fact, i) => (
            <div
              key={i}
              className="fun-fact animate-slide-up"
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <span className="fact-icon">{fact.icon}</span>
              <span className="fact-text">{fact.text}</span>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <button
          className={`btn-continue flying-element ${!name.trim() ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={!name.trim()}
        >
          {!name.trim() ? 'Enter your name to continue' : `Looking great, ${name.split(' ')[0]}! ✨`}
        </button>

        <p className="skip-text" onClick={() => onNext()}>
          Skip for now →
        </p>
      </div>

      <style jsx>{`
        .profile-setup {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
        }

        .profile-content {
          max-width: 600px;
          width: 100%;
        }

        .profile-title {
          font-family: 'Fredoka One', cursive;
          font-size: 36px;
          color: #FF1493;
          text-align: center;
          margin-bottom: 10px;
        }

        .profile-subtitle {
          font-family: 'Quicksand', sans-serif;
          font-size: 18px;
          color: #9370DB;
          text-align: center;
          margin-bottom: 30px;
        }

        .profile-card {
          background: white;
          border-radius: 25px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(255, 105, 180, 0.2);
          margin-bottom: 25px;
        }

        .photo-section {
          display: flex;
          justify-content: center;
          margin-bottom: 35px;
        }

        .photo-container {
          position: relative;
          width: 150px;
          height: 150px;
        }

        .profile-photo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid #FF69B4;
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
        }

        .photo-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 5px dashed #FFB6C1;
          background: linear-gradient(135deg, #FFF5F7, #FFE8F0);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 300ms;
        }

        .photo-placeholder:hover {
          border-color: #FF69B4;
          transform: scale(1.05);
        }

        .placeholder-icon {
          font-size: 40px;
        }

        .placeholder-text {
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #FF69B4;
        }

        .photo-button {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9370DB, #FF69B4);
          border: 3px solid white;
          font-size: 22px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
          transition: all 300ms;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .photo-button:hover:not(:disabled) {
          transform: scale(1.1) rotate(10deg);
        }

        .photo-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .photo-sparkle {
          position: absolute;
          font-size: 20px;
          animation: sparkle 2s ease-in-out infinite;
          pointer-events: none;
        }

        .sparkle-1 {
          top: 0;
          right: 0;
          animation-delay: 0s;
        }

        .sparkle-2 {
          top: 50%;
          left: -10px;
          animation-delay: 0.5s;
        }

        .sparkle-3 {
          bottom: 0;
          right: -10px;
          animation-delay: 1s;
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0.5) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }

        .name-section {
          margin-bottom: 30px;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .label-icon {
          font-size: 20px;
        }

        .label-text {
          font-family: 'Fredoka One', cursive;
          font-size: 16px;
          color: #FF1493;
        }

        .input-wrapper {
          position: relative;
        }

        .name-input {
          width: 100%;
          padding: 15px 20px;
          font-family: 'Quicksand', sans-serif;
          font-size: 18px;
          border: 2px solid #f0f0f0;
          border-radius: 15px;
          transition: all 300ms;
          background: #f9f9f9;
        }

        .name-input:focus {
          outline: none;
          border-color: #FF69B4;
          background: white;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.2);
        }

        .input-hint {
          font-family: 'Quicksand', sans-serif;
          font-size: 12px;
          color: #999;
          margin-top: 8px;
          padding-left: 20px;
        }

        .preview-section {
          background: linear-gradient(135deg, #FFF5F7, #F0E6FF);
          border-radius: 15px;
          padding: 20px;
        }

        .preview-label {
          font-family: 'Fredoka One', cursive;
          font-size: 12px;
          color: #9370DB;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }

        .preview-card {
          background: white;
          border-radius: 12px;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .preview-photo {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }

        .preview-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .preview-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #9370DB, #FF69B4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fredoka One', cursive;
          font-size: 24px;
          color: white;
        }

        .preview-info {
          flex: 1;
        }

        .preview-name {
          font-family: 'Fredoka One', cursive;
          font-size: 16px;
          color: #333;
          margin-bottom: 4px;
        }

        .preview-status {
          font-family: 'Quicksand', sans-serif;
          font-size: 12px;
          color: #4CAF50;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4CAF50;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .fun-facts {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 25px;
        }

        .fun-fact {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(255, 105, 180, 0.1);
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
          margin: 0 auto 15px;
          width: 100%;
          max-width: 400px;
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

export default ProfileSetup;
