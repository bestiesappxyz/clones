import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { currentUser, userData, loading } = useAuth();

  // Debug logging to diagnose admin access issues
  useEffect(() => {
    console.group('🔒 AdminRoute Debug');
    console.log('loading:', loading);
    console.log('currentUser:', currentUser);
    console.log('currentUser.uid:', currentUser?.uid);
    console.log('userData:', userData);
    console.log('userData?.isAdmin:', userData?.isAdmin);
    console.log('Will redirect:', !userData?.isAdmin);
    console.groupEnd();
  }, [loading, currentUser, userData]);

  if (loading) {
    console.log('⏳ AdminRoute: Still loading...');
    return (
      <div className="min-h-screen bg-pattern flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  // Check if user is admin
  if (!userData?.isAdmin) {
    console.error('❌ AdminRoute: Access denied. userData?.isAdmin =', userData?.isAdmin);
    return <Navigate to="/" replace />;
  }

  console.log('✅ AdminRoute: Access granted');
  return children;
};

export default AdminRoute;
