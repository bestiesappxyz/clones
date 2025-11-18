import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../styles/BadgesPage.css';

const BadgesPage = () => {
  const { currentUser, userData } = useAuth();
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  const allBadges = [
    { id: 'safety_starter', name: 'Safety Starter', description: 'Complete 5 check-ins', icon: '🛡️', color: '#4CAF50', requirement: 5, stat: 'completedCheckIns' },
    { id: 'safety_pro', name: 'Safety Pro', description: 'Complete 25 check-ins', icon: '⭐', color: '#2196F3', requirement: 25, stat: 'completedCheckIns' },
    { id: 'safety_master', name: 'Safety Master', description: 'Complete 50 check-ins', icon: '👑', color: '#9C27B0', requirement: 50, stat: 'completedCheckIns' },
    { id: 'friend_squad', name: 'Friend Squad', description: 'Add 3 besties', icon: '👥', color: '#FF9800', requirement: 3, stat: 'totalBesties' },
    { id: 'safety_circle', name: 'Safety Circle', description: 'Add 5 besties', icon: '🤝', color: '#E91E63', requirement: 5, stat: 'totalBesties' },
    { id: 'safety_network', name: 'Safety Network', description: 'Add 10 besties', icon: '🌐', color: '#00BCD4', requirement: 10, stat: 'totalBesties' },
    { id: 'night_owl', name: 'Night Owl', description: 'Check-in after midnight', icon: '🦉', color: '#673AB7', requirement: 1, stat: 'nightOwl' },
    { id: 'early_bird', name: 'Early Bird', description: 'Check-in before 6 AM', icon: '🐦', color: '#FFC107', requirement: 1, stat: 'earlyBird' },
    { id: 'streak_master', name: 'Streak Master', description: '7 days in a row', icon: '🔥', color: '#FF5722', requirement: 7, stat: 'streak' },
    { id: 'active_donor', name: 'Active Donor', description: 'SMS subscription', icon: '💜', color: '#E91E63', requirement: 1, stat: 'donation' },
    { id: 'location_lover', name: 'Location Lover', description: '5 favorite locations', icon: '📍', color: '#8BC34A', requirement: 5, stat: 'locations' },
    { id: 'template_master', name: 'Template Master', description: '3 templates created', icon: '📋', color: '#FF9800', requirement: 3, stat: 'templates' },
  ];

  useEffect(() => {
    loadBadges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const loadBadges = async () => {
    if (!currentUser) return;
    
    try {
      const badgeDoc = await getDoc(doc(db, 'badges', currentUser.uid));
      if (badgeDoc.exists()) {
        setEarnedBadges(badgeDoc.data().badges || []);
      }
    } catch (error) {
      console.error('Error loading badges:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgress = (badge) => {
    if (!userData || !userData.stats) return 0;

    let current = 0;
    switch (badge.stat) {
      case 'completedCheckIns':
        current = userData.stats.completedCheckIns || 0;
        break;
      case 'totalBesties':
        current = userData.stats.totalBesties || 0;
        break;
      case 'streak':
        current = userData.stats.currentStreak || 0;
        break;
      case 'donation':
        current = userData.donationStats?.isActive ? 1 : 0;
        break;
      case 'locations':
        current = userData.favoriteLocations?.length || 0;
        break;
      case 'templates':
        current = userData.templateCount || 0;
        break;
      case 'nightOwl':
      case 'earlyBird':
        current = userData.stats?.[badge.stat] ? 1 : 0;
        break;
      default:
        current = 0;
    }

    return Math.min(100, (current / badge.requirement) * 100);
  };

  const getProgressText = (badge) => {
    if (!userData || !userData.stats) return '0 / ' + badge.requirement;

    let current = 0;
    switch (badge.stat) {
      case 'completedCheckIns':
        current = userData.stats.completedCheckIns || 0;
        break;
      case 'totalBesties':
        current = userData.stats.totalBesties || 0;
        break;
      case 'streak':
        current = userData.stats.currentStreak || 0;
        break;
      case 'donation':
        return userData.donationStats?.isActive ? 'Active' : 'Subscribe';
      case 'locations':
        current = userData.favoriteLocations?.length || 0;
        break;
      case 'templates':
        current = userData.templateCount || 0;
        break;
      case 'nightOwl':
      case 'earlyBird':
        return userData.stats?.[badge.stat] ? 'Unlocked!' : 'Not yet';
      default:
        current = 0;
    }

    return `${current} / ${badge.requirement}`;
  };

  if (loading) {
    return (
      <div className="badges-page">
        <div className="loading">Loading your badges...</div>
      </div>
    );
  }

  const earned = allBadges.filter(b => earnedBadges.includes(b.id));
  const locked = allBadges.filter(b => !earnedBadges.includes(b.id));

  return (
    <div className="badges-page">
      <div className="badges-header">
        <h1>🏆 Your Badges</h1>
        <div className="badge-stats">
          <span className="earned-count">{earned.length}</span>
          <span className="total-count">/ {allBadges.length}</span>
        </div>
      </div>

      {earned.length > 0 && (
        <div className="badge-section">
          <h2>✨ Earned ({earned.length})</h2>
          <div className="badges-grid">
            {earned.map(badge => (
              <div 
                key={badge.id} 
                className="badge-card earned"
                style={{ 
                  borderColor: badge.color,
                  background: `linear-gradient(135deg, ${badge.color}15, ${badge.color}05)`
                }}
              >
                <div className="badge-icon" style={{ color: badge.color }}>
                  {badge.icon}
                </div>
                <div className="badge-info">
                  <h3 style={{ color: badge.color }}>{badge.name}</h3>
                  <p>{badge.description}</p>
                  <span className="earned-label" style={{ background: badge.color }}>
                    ✓ Earned
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {locked.length > 0 && (
        <div className="badge-section">
          <h2>🔒 Locked ({locked.length})</h2>
          <div className="badges-grid">
            {locked.map(badge => {
              const progress = getProgress(badge);
              const progressText = getProgressText(badge);

              return (
                <div key={badge.id} className="badge-card locked">
                  <div className="badge-icon">{badge.icon}</div>
                  <div className="badge-info">
                    <h3>{badge.name}</h3>
                    <p>{badge.description}</p>

                    {/* Progress bar */}
                    <div className="badge-progress-container">
                      <div className="badge-progress-bar">
                        <div
                          className="badge-progress-fill"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: badge.color
                          }}
                        />
                      </div>
                      <span className="badge-progress-text">{progressText}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgesPage;