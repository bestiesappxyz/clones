import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Header from '../components/Header';

const AlertViewPage = () => {
  const { alertId } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertId]);

  const loadAlert = async () => {
    try {
      // Try to load as check-in first
      let alertDoc = await getDoc(doc(db, 'checkins', alertId));
      let alertType = 'checkin';

      // If not found, try emergency SOS
      if (!alertDoc.exists()) {
        alertDoc = await getDoc(doc(db, 'emergency_sos', alertId));
        alertType = 'sos';
      }

      if (!alertDoc.exists()) {
        setLoading(false);
        return;
      }

      const alertData = { id: alertDoc.id, ...alertDoc.data(), type: alertType };
      setAlert(alertData);

      // Load user data
      const userDoc = await getDoc(doc(db, 'users', alertData.userId));
      if (userDoc.exists()) {
        setUser(userDoc.data());
      }
    } catch (error) {
      console.error('Error loading alert:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pattern flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!alert) {
    return (
      <div className="min-h-screen bg-pattern">
        <Header />
        <div className="max-w-2xl mx-auto p-4 text-center mt-20">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-display text-text-primary mb-2">Alert Not Found</h1>
          <p className="text-text-secondary mb-6">This alert may have been resolved or removed.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const isCheckIn = alert.type === 'checkin';
  const isSOS = alert.type === 'sos';

  return (
    <div className="min-h-screen bg-pattern">
      <Header />

      <div className="max-w-2xl mx-auto p-4 pb-20">
        {/* Alert Header */}
        <div className={`card p-6 mb-6 ${isSOS ? 'bg-red-50 border-2 border-red-500' : 'bg-yellow-50 border-2 border-yellow-500'}`}>
          <div className="text-center">
            <div className="text-6xl mb-4">{isSOS ? '🆘' : '🚨'}</div>
            <h1 className="text-3xl font-display text-text-primary mb-2">
              {isSOS ? 'EMERGENCY ALERT' : 'SAFETY ALERT'}
            </h1>
            <p className="text-lg text-text-secondary">
              {user?.displayName || 'A friend'} {isSOS ? 'triggered an emergency SOS' : "hasn't checked in"}
            </p>
          </div>
        </div>

        {/* Alert Details */}
        <div className="card p-6 mb-6">
          <h2 className="text-xl font-display text-text-primary mb-4">Details</h2>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-text-secondary mb-1">Person</div>
              <div className="font-semibold text-text-primary flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white">
                  {user?.displayName?.[0] || '?'}
                </div>
                {user?.displayName || 'Unknown'}
              </div>
            </div>

            <div>
              <div className="text-sm text-text-secondary mb-1">Location</div>
              <div className="font-semibold text-text-primary">
                {alert.location || 'Unknown'}
              </div>
            </div>

            {isCheckIn && alert.meetingWith && (
              <div>
                <div className="text-sm text-text-secondary mb-1">Meeting With</div>
                <div className="font-semibold text-text-primary">{alert.meetingWith}</div>
              </div>
            )}

            {isCheckIn && alert.notes && (
              <div>
                <div className="text-sm text-text-secondary mb-1">Notes</div>
                <div className="font-semibold text-text-primary">{alert.notes}</div>
              </div>
            )}

            {alert.photoURL && (
              <div>
                <div className="text-sm text-text-secondary mb-1">Photo</div>
                <img
                  src={alert.photoURL}
                  alt="Check-in"
                  className="w-full rounded-xl max-h-64 object-cover"
                />
              </div>
            )}

            <div>
              <div className="text-sm text-text-secondary mb-1">Time</div>
              <div className="font-semibold text-text-primary">
                {alert.createdAt?.toDate().toLocaleString()}
              </div>
            </div>

            {isCheckIn && alert.alertTime && (
              <div>
                <div className="text-sm text-text-secondary mb-1">Expected Check-In By</div>
                <div className="font-semibold text-text-primary">
                  {alert.alertTime.toDate().toLocaleTimeString()}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Instructions */}
        <div className="card p-6 bg-primary/10">
          <h3 className="font-display text-lg text-text-primary mb-3">
            What to do:
          </h3>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex gap-2">
              <span>1.</span>
              <span>Try calling or messaging {user?.displayName}</span>
            </li>
            <li className="flex gap-2">
              <span>2.</span>
              <span>Check if they're at the location listed above</span>
            </li>
            <li className="flex gap-2">
              <span>3.</span>
              <span>If you can't reach them, consider contacting local authorities</span>
            </li>
            {isSOS && (
              <li className="flex gap-2 font-semibold text-red-600">
                <span>⚠️</span>
                <span>This is an EMERGENCY - act immediately!</span>
              </li>
            )}
          </ul>
        </div>

        {/* Contact Info */}
        {user?.phoneNumber && (
          <div className="mt-4">
            <a
              href={`tel:${user.phoneNumber}`}
              className="w-full btn btn-primary text-lg py-4 block text-center"
            >
              📞 Call {user.displayName}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertViewPage;
