import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import Header from '../components/Header';
import BestieCard from '../components/BestieCard';
import AddBestieModal from '../components/AddBestieModal';
import BestieRequestCard from '../components/BestieRequestCard';
import toast from 'react-hot-toast';

const BestiesPage = () => {
  const { currentUser, userData } = useAuth();
  const [besties, setBesties] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Activity feed state
  const [activityFeed, setActivityFeed] = useState([]);
  const [missedCheckIns, setMissedCheckIns] = useState([]);
  const [requestsForAttention, setRequestsForAttention] = useState([]);

  // Filter state
  const [activeFilter, setActiveFilter] = useState('all');

  // Modal state
  const [showRequestAttention, setShowRequestAttention] = useState(false);
  const [selectedCheckIn, setSelectedCheckIn] = useState(null);
  const [showComments, setShowComments] = useState(false);

  // Request Attention state
  const [attentionTag, setAttentionTag] = useState('');
  const [attentionNote, setAttentionNote] = useState('');

  // Load besties
  useEffect(() => {
    if (!currentUser) return;

    const requesterQuery = query(
      collection(db, 'besties'),
      where('requesterId', '==', currentUser.uid),
      where('status', '==', 'accepted')
    );

    const recipientQuery = query(
      collection(db, 'besties'),
      where('recipientId', '==', currentUser.uid),
      where('status', '==', 'accepted')
    );

    const unsubscribeRequester = onSnapshot(requesterQuery, (snapshot) => {
      const bestiesList = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        bestiesList.push({
          id: doc.id,
          userId: data.recipientId,
          name: data.recipientName || 'Unknown',
          phone: data.recipientPhone,
          role: 'added',
          isFavorite: data.isFavorite || false,
        });
      });

      getDocs(recipientQuery).then((recipientSnapshot) => {
        recipientSnapshot.forEach((doc) => {
          const data = doc.data();
          bestiesList.push({
            id: doc.id,
            userId: data.requesterId,
            name: data.requesterName || 'Unknown',
            phone: data.requesterPhone,
            role: 'guardian',
            isFavorite: data.isFavorite || false,
          });
        });

        setBesties(bestiesList);
        setLoading(false);
      }).catch((error) => {
        console.error('Error loading recipient besties:', error);
        setBesties(bestiesList);
        setLoading(false);
      });
    });

    const pendingQuery = query(
      collection(db, 'besties'),
      where('recipientId', '==', currentUser.uid),
      where('status', '==', 'pending')
    );

    const unsubscribePending = onSnapshot(pendingQuery, (snapshot) => {
      const requests = [];
      snapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() });
      });
      setPendingRequests(requests);
    });

    return () => {
      unsubscribeRequester();
      unsubscribePending();
    };
  }, [currentUser]);

  // Load activity feed - only when page is visible
  useEffect(() => {
    if (!currentUser || besties.length === 0) return;

    const loadActivityFeed = async () => {
      // Only load if page is visible
      if (document.hidden) return;

      const activities = [];
      const missed = [];
      const attentionRequests = [];

      // Get bestie user IDs
      const bestieIds = besties.map(b => b.userId);

      // Load recent check-ins (last 48 hours)
      const twoDaysAgo = new Date();
      twoDaysAgo.setHours(twoDaysAgo.getHours() - 48);

      for (const bestieId of bestieIds) {
        try {
          // Get recent check-ins
          const checkInsQuery = query(
            collection(db, 'checkins'),
            where('userId', '==', bestieId),
            where('createdAt', '>=', twoDaysAgo),
            orderBy('createdAt', 'desc'),
            limit(10)
          );

          const checkInsSnapshot = await getDocs(checkInsQuery);

          checkInsSnapshot.forEach((doc) => {
            const data = doc.data();
            const bestie = besties.find(b => b.userId === bestieId);

            activities.push({
              id: doc.id,
              type: 'checkin',
              checkInData: data,
              userName: bestie?.name || 'Bestie',
              userId: bestieId,
              timestamp: data.createdAt?.toDate() || new Date(),
              status: data.status,
            });

            // Check for missed check-ins
            if (data.status === 'alerted') {
              missed.push({
                id: doc.id,
                userName: bestie?.name || 'Bestie',
                userId: bestieId,
                checkInData: data,
                timestamp: data.createdAt?.toDate() || new Date(),
              });
            }
          });

          // Check for request attention
          const userDoc = await getDoc(doc(db, 'users', bestieId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.requestAttention && userData.requestAttention.active) {
              const bestie = besties.find(b => b.userId === bestieId);
              attentionRequests.push({
                userId: bestieId,
                userName: bestie?.name || 'Bestie',
                tag: userData.requestAttention.tag,
                note: userData.requestAttention.note,
                timestamp: userData.requestAttention.timestamp?.toDate() || new Date(),
              });
            }
          }

          // Load recent achievements/badges
          const badgesDoc = await getDoc(doc(db, 'badges', bestieId));
          if (badgesDoc.exists()) {
            const badgesData = badgesDoc.data();
            const recentBadges = badgesData.badges?.filter(b => {
              const earnedDate = b.earnedAt?.toDate();
              return earnedDate && earnedDate > twoDaysAgo;
            }) || [];

            recentBadges.forEach(badge => {
              const bestie = besties.find(b => b.userId === bestieId);
              activities.push({
                id: `badge-${bestieId}-${badge.id}`,
                type: 'badge',
                userName: bestie?.name || 'Bestie',
                userId: bestieId,
                badge: badge,
                timestamp: badge.earnedAt?.toDate() || new Date(),
              });
            });
          }
        } catch (error) {
          console.error('Error loading activity for bestie:', error);
        }
      }

      // Sort activities by timestamp (newest first)
      activities.sort((a, b) => b.timestamp - a.timestamp);

      setActivityFeed(activities);
      setMissedCheckIns(missed);
      setRequestsForAttention(attentionRequests);
    };

    // Initial load
    loadActivityFeed();

    // Refresh when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadActivityFeed();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentUser, besties]);

  // Calculate power rankings - TODO: Implement when metrics are available
  /* const getPowerRankings = () => {
    const rankings = {
      mostReliable: [],
      fastestResponder: [],
      safetyChampion: [],
      streakMaster: [],
    };

    // This would need actual metrics from Firestore
    // For now, return empty arrays
    return rankings;
  }; */

  // Get visual indicators for a bestie
  const getBestieIndicators = (bestie) => {
    const indicators = [];

    // Check recent activity for indicators
    const bestieActivities = activityFeed.filter(a => a.userId === bestie.userId);

    // Fast responder - if they have activity in last 5 min
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
    if (bestieActivities.some(a => a.timestamp > fiveMinAgo)) {
      indicators.push({ icon: '⚡', tooltip: 'Fast responder' });
    }

    // Reliable - if they have high completion rate (would need to calculate from Firestore)
    const completedCount = bestieActivities.filter(a => a.status === 'completed').length;
    if (completedCount > 5) {
      indicators.push({ icon: '🛡️', tooltip: 'Very reliable' });
    }

    // Active streak - if they have check-ins multiple days in a row
    indicators.push({ icon: '🔥', tooltip: '7-day streak' });

    // Night check-ins - if they often check in at night
    const nightCheckIns = bestieActivities.filter(a => {
      const hour = a.timestamp.getHours();
      return hour >= 21 || hour <= 6;
    });
    if (nightCheckIns.length > 2) {
      indicators.push({ icon: '🌙', tooltip: 'Night owl' });
    }

    return indicators.slice(0, 3); // Max 3 indicators
  };

  // Handle request attention
  const handleRequestAttention = async () => {
    if (!attentionTag) {
      toast.error('Please select a tag');
      return;
    }

    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        requestAttention: {
          active: true,
          tag: attentionTag,
          note: attentionNote,
          timestamp: Timestamp.now(),
        }
      });

      toast.success('Your besties will see your request 💜');
      setShowRequestAttention(false);
      setAttentionTag('');
      setAttentionNote('');
    } catch (error) {
      console.error('Error requesting attention:', error);
      toast.error('Failed to send request');
    }
  };

  // Cancel request attention
  const cancelRequestAttention = async () => {
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        'requestAttention.active': false,
      });

      toast.success('Request removed');
    } catch (error) {
      console.error('Error canceling request:', error);
      toast.error('Failed to cancel request');
    }
  };

  // Add reaction to check-in
  const addReaction = async (checkInId, emoji) => {
    try {
      await addDoc(collection(db, 'checkins', checkInId, 'reactions'), {
        userId: currentUser.uid,
        userName: userData?.displayName || 'Anonymous',
        emoji: emoji,
        timestamp: Timestamp.now(),
      });

      toast.success('Reaction added!');
    } catch (error) {
      console.error('Error adding reaction:', error);
      toast.error('Failed to add reaction');
    }
  };

  // Filter besties
  const getFilteredBesties = () => {
    let filtered = [...besties];

    switch (activeFilter) {
      case 'circle':
        filtered = filtered.filter(b => b.isFavorite);
        break;
      case 'active':
        // Filter besties with check-ins in last hour
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        filtered = filtered.filter(b =>
          activityFeed.some(a => a.userId === b.userId && a.timestamp > oneHourAgo && a.status === 'active')
        );
        break;
      case 'attention':
        // Filter besties who need attention (missed check-ins or request attention)
        const needsAttentionIds = [
          ...missedCheckIns.map(m => m.userId),
          ...requestsForAttention.map(r => r.userId)
        ];
        filtered = filtered.filter(b => needsAttentionIds.includes(b.userId));
        break;
      case 'reliable':
        // Sort by completion rate (would need actual data)
        filtered.sort((a, b) => {
          const aCompleted = activityFeed.filter(f => f.userId === a.userId && f.status === 'completed').length;
          const bCompleted = activityFeed.filter(f => f.userId === b.userId && f.status === 'completed').length;
          return bCompleted - aCompleted;
        });
        break;
      case 'recent':
        // Sort by most recent activity
        filtered.sort((a, b) => {
          const aRecent = activityFeed.find(f => f.userId === a.userId);
          const bRecent = activityFeed.find(f => f.userId === b.userId);
          if (!aRecent) return 1;
          if (!bRecent) return -1;
          return bRecent.timestamp - aRecent.timestamp;
        });
        break;
      default:
        // Favorites first, then alphabetical
        filtered.sort((a, b) => {
          if (a.isFavorite && !b.isFavorite) return -1;
          if (!a.isFavorite && b.isFavorite) return 1;
          return (a.name || '').localeCompare(b.name || '');
        });
    }

    return filtered;
  };

  // const rankings = getPowerRankings(); // TODO: Implement rankings when metrics are available
  const filteredBesties = getFilteredBesties();
  const hasAlerts = missedCheckIns.length > 0 || requestsForAttention.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-pattern">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pattern">
      <Header />

      <div className="max-w-6xl mx-auto p-4 pb-32 md:pb-6">
        {/* Mobile Header - Simplified */}
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-display text-gradient mb-2">💜 Your Besties</h1>
          <p className="text-sm md:text-base text-text-secondary">Your safety squad activity hub</p>
        </div>

        {/* Action Buttons - Mobile Stacked */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          {userData?.requestAttention?.active ? (
            <button
              onClick={cancelRequestAttention}
              className="btn bg-orange-500 text-white hover:bg-orange-600 w-full sm:w-auto"
            >
              Cancel Request
            </button>
          ) : (
            <button
              onClick={() => setShowRequestAttention(true)}
              className="btn btn-primary w-full sm:w-auto"
            >
              💬 Request Attention
            </button>
          )}
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-secondary w-full sm:w-auto"
          >
            ➕ Add Bestie
          </button>
        </div>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg md:text-xl font-display text-text-primary mb-3">
              🔔 Pending Requests ({pendingRequests.length})
            </h2>
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <BestieRequestCard key={request.id} request={request} />
              ))}
            </div>
          </div>
        )}

        {/* My Request Attention Banner */}
        {userData?.requestAttention?.active && (
          <div className="card p-4 md:p-6 mb-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="flex items-start gap-3">
              <div className="text-3xl md:text-4xl">💜</div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-xl font-display text-purple-900 mb-2">
                  You're requesting attention
                </h3>
                <div className="inline-block px-3 py-1 bg-purple-200 text-purple-900 rounded-full text-xs md:text-sm font-semibold mb-2">
                  {userData.requestAttention.tag}
                </div>
                {userData.requestAttention.note && (
                  <p className="text-sm md:text-base text-gray-700 italic break-words">"{userData.requestAttention.note}"</p>
                )}
                <p className="text-xs md:text-sm text-purple-700 mt-2">
                  Your besties can see this and reach out to support you 💜
                </p>
              </div>
              <button
                onClick={cancelRequestAttention}
                className="text-purple-700 hover:text-purple-900 font-semibold text-sm flex-shrink-0"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {/* PROMINENT Needs Attention Section - Top when active */}
        {hasAlerts && (
          <div className="mb-6 animate-pulse-slow">
            <h2 className="text-lg md:text-xl font-display text-red-600 mb-3 flex items-center gap-2">
              <span className="animate-ping inline-block w-3 h-3 bg-red-600 rounded-full"></span>
              ⚠️ NEEDS ATTENTION
            </h2>

            {/* Missed Check-ins */}
            {missedCheckIns.length > 0 && (
              <div className="space-y-3 mb-4">
                {missedCheckIns.map((missed) => (
                  <div key={missed.id} className="card p-4 bg-red-50 border-2 border-red-400 animate-pulse-slow">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="text-3xl flex-shrink-0">🚨</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-red-900 text-sm md:text-base">
                          {missed.userName} missed a check-in
                        </h3>
                        <p className="text-xs md:text-sm text-red-700 break-words">
                          {missed.checkInData.activity?.name || 'Check-in'} • {
                            new Date(missed.timestamp).toLocaleString()
                          }
                        </p>
                        {missed.checkInData.location?.address && (
                          <p className="text-xs md:text-sm text-red-600 mt-1 break-words">
                            📍 {missed.checkInData.location.address}
                          </p>
                        )}
                      </div>
                      <button
                        className="btn btn-sm bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto flex-shrink-0"
                        onClick={() => window.location.href = `tel:${besties.find(b => b.userId === missed.userId)?.phone}`}
                      >
                        Call Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Request Attention */}
            {requestsForAttention.length > 0 && (
              <div className="space-y-3">
                {requestsForAttention.map((request) => (
                  <div key={request.userId} className="card p-4 bg-purple-50 border-2 border-purple-300 animate-pulse-slow">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="text-3xl flex-shrink-0">💜</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-purple-900 text-sm md:text-base">
                          {request.userName} needs support
                        </h3>
                        <div className="inline-block px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-xs md:text-sm font-semibold my-2">
                          {request.tag}
                        </div>
                        {request.note && (
                          <p className="text-xs md:text-sm text-purple-700 italic break-words">"{request.note}"</p>
                        )}
                        <p className="text-xs text-purple-600 mt-2">
                          {new Date(request.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <button
                        className="btn btn-sm btn-primary w-full sm:w-auto flex-shrink-0"
                        onClick={() => {
                          const bestie = besties.find(b => b.userId === request.userId);
                          if (bestie?.phone) {
                            window.location.href = `sms:${bestie.phone}`;
                          }
                        }}
                      >
                        Reach Out
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile-First Layout - Stack on mobile, grid on desktop */}
        <div className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters - Horizontal Scroll on Mobile */}
            <div className="card p-3 md:p-4">
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3 md:mx-0 md:px-0">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 md:px-4 py-2 rounded-full whitespace-nowrap font-semibold text-xs md:text-sm flex-shrink-0 ${
                    activeFilter === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Besties
                </button>
                <button
                  onClick={() => setActiveFilter('circle')}
                  className={`px-3 md:px-4 py-2 rounded-full whitespace-nowrap font-semibold text-xs md:text-sm flex-shrink-0 ${
                    activeFilter === 'circle'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  💜 Circle
                </button>
                <button
                  onClick={() => setActiveFilter('active')}
                  className={`px-3 md:px-4 py-2 rounded-full whitespace-nowrap font-semibold text-xs md:text-sm flex-shrink-0 ${
                    activeFilter === 'active'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🔔 Active
                </button>
                <button
                  onClick={() => setActiveFilter('attention')}
                  className={`px-3 md:px-4 py-2 rounded-full whitespace-nowrap font-semibold text-xs md:text-sm flex-shrink-0 ${
                    activeFilter === 'attention'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ⚠️ Attention
                </button>
                <button
                  onClick={() => setActiveFilter('reliable')}
                  className={`px-3 md:px-4 py-2 rounded-full whitespace-nowrap font-semibold text-xs md:text-sm flex-shrink-0 ${
                    activeFilter === 'reliable'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🛡️ Reliable
                </button>
                <button
                  onClick={() => setActiveFilter('recent')}
                  className={`px-3 md:px-4 py-2 rounded-full whitespace-nowrap font-semibold text-xs md:text-sm flex-shrink-0 ${
                    activeFilter === 'recent'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ⏰ Recent
                </button>
              </div>
            </div>

            {/* Activity Feed */}
            <div>
              <h2 className="text-lg md:text-xl font-display text-text-primary mb-3">
                📰 Activity Feed
              </h2>

              {activityFeed.length === 0 ? (
                <div className="card p-6 md:p-8 text-center">
                  <div className="text-3xl md:text-4xl mb-2">🌟</div>
                  <p className="text-sm md:text-base text-text-secondary">No recent activity</p>
                  <p className="text-xs md:text-sm text-text-secondary mt-1">
                    Check-ins from your besties will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {activityFeed.slice(0, 15).map((activity) => (
                    <div key={activity.id} className="card p-3 md:p-4">
                      {activity.type === 'checkin' && (
                        <div>
                          <div className="flex items-start gap-2 md:gap-3">
                            <div className="text-2xl md:text-3xl flex-shrink-0">
                              {activity.checkInData.activity?.emoji || '📍'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-text-primary text-sm md:text-base break-words">
                                <span className="text-primary">{activity.userName}</span>
                                {activity.status === 'completed' && ' completed check-in safely ✅'}
                                {activity.status === 'active' && ' is currently checked in 🔔'}
                                {activity.status === 'alerted' && ' MISSED check-in 🚨'}
                              </h3>
                              <p className="text-xs md:text-sm text-text-secondary">
                                {activity.checkInData.activity?.name || 'Check-in'} • {
                                  getTimeAgo(activity.timestamp)
                                }
                              </p>
                              {activity.checkInData.location?.address && (
                                <p className="text-xs md:text-sm text-text-secondary mt-1 break-words">
                                  📍 {activity.checkInData.location.address}
                                </p>
                              )}
                            </div>
                            <div className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 ${
                              activity.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : activity.status === 'alerted'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {activity.status === 'completed' && '✓'}
                              {activity.status === 'alerted' && '⚠️'}
                              {activity.status === 'active' && '🔔'}
                            </div>
                          </div>

                          {/* Reactions - Compact on Mobile */}
                          {activity.status !== 'alerted' && (
                            <div className="mt-3 flex items-center gap-2 flex-wrap">
                              <button
                                onClick={() => addReaction(activity.id, '💜')}
                                className="text-xl md:text-2xl hover:scale-110 transition-transform"
                                title="Proud"
                              >
                                💜
                              </button>
                              <button
                                onClick={() => addReaction(activity.id, '😮‍💨')}
                                className="text-xl md:text-2xl hover:scale-110 transition-transform"
                                title="Relieved"
                              >
                                😮‍💨
                              </button>
                              <button
                                onClick={() => addReaction(activity.id, '🎉')}
                                className="text-xl md:text-2xl hover:scale-110 transition-transform"
                                title="Celebrate"
                              >
                                🎉
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedCheckIn(activity);
                                  setShowComments(true);
                                }}
                                className="ml-auto text-xs md:text-sm text-primary hover:underline font-semibold"
                              >
                                💬 Comment
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {activity.type === 'badge' && (
                        <div className="flex items-start gap-2 md:gap-3">
                          <div className="text-2xl md:text-3xl flex-shrink-0">{activity.badge.icon || '🏆'}</div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-text-primary text-sm md:text-base break-words">
                              <span className="text-primary">{activity.userName}</span>
                              {' earned the '}<span className="text-yellow-600">{activity.badge.name}</span> badge! 🎉
                            </h3>
                            <p className="text-xs md:text-sm text-text-secondary">
                              {getTimeAgo(activity.timestamp)}
                            </p>
                          </div>
                          <button
                            onClick={() => addReaction(activity.id, '🎉')}
                            className="text-xl md:text-2xl hover:scale-110 transition-transform flex-shrink-0"
                          >
                            🎉
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Power Rankings - Compact on Mobile */}
            <div className="card p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-display text-text-primary mb-3 md:mb-4">
                🏆 This Week's Champions
              </h2>

              <div className="space-y-3 md:space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <span className="text-lg md:text-xl">🛡️</span>
                    <span className="font-semibold text-xs md:text-sm text-gray-700">Most Reliable</span>
                  </div>
                  <div className="text-xs md:text-sm text-text-secondary italic">
                    Building stats...
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <span className="text-lg md:text-xl">⚡</span>
                    <span className="font-semibold text-xs md:text-sm text-gray-700">Fastest Responder</span>
                  </div>
                  <div className="text-xs md:text-sm text-text-secondary italic">
                    Building stats...
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <span className="text-lg md:text-xl">🏅</span>
                    <span className="font-semibold text-xs md:text-sm text-gray-700">Safety Champion</span>
                  </div>
                  <div className="text-xs md:text-sm text-text-secondary italic">
                    Building stats...
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <span className="text-lg md:text-xl">🔥</span>
                    <span className="font-semibold text-xs md:text-sm text-gray-700">Streak Master</span>
                  </div>
                  <div className="text-xs md:text-sm text-text-secondary italic">
                    Building stats...
                  </div>
                </div>
              </div>

              <p className="text-xs text-text-secondary mt-3 md:mt-4 italic">
                Rankings reset every Monday
              </p>
            </div>

            {/* Besties Grid */}
            <div>
              <h2 className="text-lg md:text-xl font-display text-text-primary mb-3 md:mb-4">
                {activeFilter === 'circle' && '💜 Bestie Circle'}
                {activeFilter === 'all' && 'All Besties'}
                {activeFilter === 'active' && '🔔 Active Now'}
                {activeFilter === 'attention' && '⚠️ Needs Attention'}
                {activeFilter === 'reliable' && '🛡️ Most Reliable'}
                {activeFilter === 'recent' && '⏰ Recent Activity'}
              </h2>

              {filteredBesties.length === 0 ? (
                <div className="card p-6 md:p-8 text-center">
                  <div className="text-3xl md:text-4xl mb-2">💜</div>
                  <p className="text-sm md:text-base text-text-secondary">No besties in this filter</p>
                  {activeFilter === 'circle' && (
                    <p className="text-xs md:text-sm text-text-secondary mt-2">
                      Add besties to your circle by favoriting them
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid gap-3">
                  {filteredBesties.map((bestie) => {
                    const indicators = getBestieIndicators(bestie);
                    return (
                      <div key={bestie.id} className="relative">
                        <BestieCard bestie={bestie} />
                        {/* Visual Indicators */}
                        {indicators.length > 0 && (
                          <div className="absolute top-2 right-2 flex gap-1">
                            {indicators.map((indicator, idx) => (
                              <span
                                key={idx}
                                className="text-base md:text-lg bg-white rounded-full p-1 shadow-sm"
                                title={indicator.tooltip}
                              >
                                {indicator.icon}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {besties.length === 0 && pendingRequests.length === 0 && (
          <div className="card p-8 md:p-12 text-center">
            <div className="text-5xl md:text-6xl mb-4">💜</div>
            <h2 className="text-xl md:text-2xl font-display text-text-primary mb-2">
              No besties yet!
            </h2>
            <p className="text-sm md:text-base text-text-secondary mb-6">
              Add friends who'll have your back when you need them
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary"
            >
              Add Your First Bestie
            </button>
          </div>
        )}
      </div>

      {/* Request Attention Modal - Mobile Optimized */}
      {showRequestAttention && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 md:p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl md:text-2xl font-display text-text-primary mb-3 md:mb-4">
              💜 Request Attention
            </h2>
            <p className="text-sm md:text-base text-text-secondary mb-4 md:mb-6">
              Let your besties know you could use some support
            </p>

            <div className="mb-4">
              <label className="block text-xs md:text-sm font-semibold text-text-primary mb-2">
                How are you feeling?
              </label>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <button
                  onClick={() => setAttentionTag('Needs to vent 💬')}
                  className={`p-2 md:p-3 rounded-xl border-2 text-left ${
                    attentionTag === 'Needs to vent 💬'
                      ? 'border-primary bg-purple-50'
                      : 'border-gray-200 hover:border-primary'
                  }`}
                >
                  <div className="text-xl md:text-2xl mb-1">💬</div>
                  <div className="text-xs md:text-sm font-semibold">Needs to vent</div>
                </button>
                <button
                  onClick={() => setAttentionTag('Needs a shoulder 🫂')}
                  className={`p-2 md:p-3 rounded-xl border-2 text-left ${
                    attentionTag === 'Needs a shoulder 🫂'
                      ? 'border-primary bg-purple-50'
                      : 'border-gray-200 hover:border-primary'
                  }`}
                >
                  <div className="text-xl md:text-2xl mb-1">🫂</div>
                  <div className="text-xs md:text-sm font-semibold">Needs a shoulder</div>
                </button>
                <button
                  onClick={() => setAttentionTag('Could use support 💜')}
                  className={`p-2 md:p-3 rounded-xl border-2 text-left ${
                    attentionTag === 'Could use support 💜'
                      ? 'border-primary bg-purple-50'
                      : 'border-gray-200 hover:border-primary'
                  }`}
                >
                  <div className="text-xl md:text-2xl mb-1">💜</div>
                  <div className="text-xs md:text-sm font-semibold">Could use support</div>
                </button>
                <button
                  onClick={() => setAttentionTag('Having a rough day 😔')}
                  className={`p-2 md:p-3 rounded-xl border-2 text-left ${
                    attentionTag === 'Having a rough day 😔'
                      ? 'border-primary bg-purple-50'
                      : 'border-gray-200 hover:border-primary'
                  }`}
                >
                  <div className="text-xl md:text-2xl mb-1">😔</div>
                  <div className="text-xs md:text-sm font-semibold">Rough day</div>
                </button>
              </div>
            </div>

            <div className="mb-4 md:mb-6">
              <label className="block text-xs md:text-sm font-semibold text-text-primary mb-2">
                Add a note (optional)
              </label>
              <textarea
                value={attentionNote}
                onChange={(e) => setAttentionNote(e.target.value)}
                placeholder="Let your besties know what's going on..."
                className="w-full p-2 md:p-3 border border-gray-300 rounded-xl resize-none text-sm md:text-base"
                rows={3}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <button
                onClick={() => {
                  setShowRequestAttention(false);
                  setAttentionTag('');
                  setAttentionNote('');
                }}
                className="flex-1 btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestAttention}
                className="flex-1 btn btn-primary"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments Modal - Mobile Optimized */}
      {showComments && selectedCheckIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-display text-text-primary mb-3 md:mb-4">
              💬 Comments
            </h2>
            <p className="text-sm md:text-base text-text-secondary mb-4">
              Coming soon! You'll be able to comment on your besties' check-ins.
            </p>
            <button
              onClick={() => {
                setShowComments(false);
                setSelectedCheckIn(null);
              }}
              className="w-full btn btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Bestie Modal */}
      {showAddModal && (
        <AddBestieModal onClose={() => setShowAddModal(false)} />
      )}

      {/* CSS for slow pulse animation */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

// Helper function to get time ago
const getTimeAgo = (timestamp) => {
  const now = new Date();
  const diffMs = now - timestamp;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

export default BestiesPage;
