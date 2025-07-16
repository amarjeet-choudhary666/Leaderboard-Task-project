import React, { useState, useEffect } from 'react';
import socket from '../lib/socket';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function ClaimButton({ selectedUser, onClaim }) {
  const [loading, setLoading] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(null);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const claimPoints = async () => {
    if (!selectedUser) return;
    setLoading(true);
    setError(null);
    setPointsAwarded(null);
    setShowSuccess(false);
    
    try {
      const res = await fetch(`http://localhost:3000/claim/${selectedUser}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.points) {
        setPointsAwarded(data.points);
        setShowSuccess(true);
        if (onClaim) onClaim();
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setError(data.message || 'Failed to claim points');
      }
    } catch (err) {
      setError('Network error - please try again',err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket.on('claimCreated', (claim) => {
      if (claim.userId === selectedUser && onClaim) {
        onClaim();
      }
    });

    return () => {
      socket.off('claimCreated');
    };
  }, [selectedUser, onClaim]);

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded-xl shadow-md font-poppins">
      <button
        onClick={claimPoints}
        disabled={loading || !selectedUser}
        className={`relative px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          ${loading ? 'bg-indigo-400' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}
          ${!selectedUser ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
        `}
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Claim Points
          </span>
        )}
      </button>

       {/* Success Message  */}
      {showSuccess && (
        <div className="animate-fade-in-up bg-green-50 border border-green-200 rounded-lg p-3 flex items-center text-green-700 max-w-md">
          <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
          <span className="font-medium">Success!</span>
          <span className="ml-1">You claimed <span className="font-bold">{pointsAwarded} points</span>!</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="animate-fade-in-up bg-red-50 border border-red-200 rounded-lg p-3 flex items-center text-red-700 max-w-md">
          <ExclamationCircleIcon className="h-5 w-5 mr-2 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Help Text */}
      {!selectedUser && (
        <p className="text-sm text-gray-500 text-center">
          Please select a user to claim points
        </p>
      )}
    </div>
  );
}