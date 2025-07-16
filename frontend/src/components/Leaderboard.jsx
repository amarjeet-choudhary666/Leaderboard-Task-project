import React, { useEffect, useState } from 'react';
import socket from '../lib/socket';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/leaderboard');
      const data = await res.json();
      if (data) setLeaderboard(data);
    } catch (error) {
      console.error('Failed to fetch leaderboard', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();

    socket.on('leaderboardUpdated', (updatedLeaderboard) => {
      setLeaderboard(updatedLeaderboard);
    });

    return () => {
      socket.off('leaderboardUpdated');
    };
  }, []);

  // Get top 3 users
  const topThree = leaderboard.slice(0, 3);
  const remainingUsers = leaderboard.slice(3);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">🏆 Leaderboard</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          {/* Podium for top 3 */}
          {leaderboard.length > 0 && (
            <div className="mb-8">
              <div className="flex items-end justify-center gap-4 h-48">
                {/* Second place */}
                {topThree[1] && (
                  <div className="flex flex-col items-center w-1/4">
                    <div className="relative h-32 bg-silver-500 bg-gradient-to-b from-gray-300 to-gray-200 rounded-t-lg w-full flex items-end justify-center">
                      <span className="absolute -top-8 text-2xl font-bold text-gray-700">2</span>
                      <div className="mb-2 text-center">
                        <p className="font-bold text-gray-800">{topThree[1].name}</p>
                        <p className="text-indigo-600 font-semibold">{topThree[1].totalPoints} pts</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* First place */}
                {topThree[0] && (
                  <div className="flex flex-col items-center w-1/3">
                    <div className="relative h-40 bg-gradient-to-b from-yellow-400 to-yellow-300 rounded-t-lg w-full flex items-end justify-center">
                      <span className="absolute -top-8 text-2xl font-bold text-yellow-600">1</span>
                      <div className="mb-2 text-center">
                        <p className="font-bold text-gray-800">{topThree[0].name}</p>
                        <p className="text-indigo-600 font-semibold">{topThree[0].totalPoints} pts</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Third place */}
                {topThree[2] && (
                  <div className="flex flex-col items-center w-1/4">
                    <div className="relative h-24 bg-gradient-to-b from-amber-600 to-amber-500 rounded-t-lg w-full flex items-end justify-center">
                      <span className="absolute -top-8 text-2xl font-bold text-amber-700">3</span>
                      <div className="mb-2 text-center">
                        <p className="font-bold text-gray-800">{topThree[2].name}</p>
                        <p className="text-indigo-600 font-semibold">{topThree[2].totalPoints} pts</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="mb-6 flex justify-between px-4">
            <p className="text-gray-500">
              <span className="font-semibold">Total Users:</span> {leaderboard.length}
            </p>
            <p className="text-gray-500">
              <span className="font-semibold">Total Points:</span> {leaderboard.reduce((acc, curr) => acc + curr.totalPoints, 0)}
            </p>
          </div>

          {/* Rest of the leaderboard */}
          <table className="min-w-full bg-white rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <th className="p-3 text-left text-sm font-semibold">Rank</th>
                <th className="p-3 text-left text-sm font-semibold">User</th>
                <th className="p-3 text-left text-sm font-semibold">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No data available
                  </td>
                </tr>
              ) : (
                remainingUsers.map(({ userId, name, totalPoints, rank }) => (
                  <tr
                    key={userId}
                    className="hover:bg-gray-50 border-b border-gray-200 transition-all"
                  >
                    <td className="p-3 text-sm text-gray-700 font-medium">{rank}</td>
                    <td className="p-3 text-sm text-gray-700">{name}</td>
                    <td className="p-3 text-sm text-indigo-600 font-semibold">{totalPoints}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}